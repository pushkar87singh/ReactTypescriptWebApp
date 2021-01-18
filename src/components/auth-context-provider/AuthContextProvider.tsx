import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import { IUserData } from "../../types";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useAuthContextReducer, {
  IAuthAction,
  IAuthState,
  actions
} from "./useAuthContextReducer";
import { ApolloCache } from "apollo-cache";
import tokenStorage from "./tokenStorage";
import { Permission } from ".";

interface IUtils {
  hasPermission: (e?: Permission) => boolean;
}

export interface IAuthReducerTuple
  extends Array<IAuthState | object | ((e: IAuthAction) => void)> {
  0: IAuthState;
  1: (e: IAuthAction) => void;
  2: IUtils;
}

export const AuthContext = React.createContext<IAuthReducerTuple>(
  ([] as unknown) as IAuthReducerTuple
);

export const USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      firstName
      lastName
      genderId
      titleId
      experienceAvailable
      performanceAvailable
      allAssessmentsDone
      allTCAssessmentsComplete
      behaviorAvailable
      yearOfBirth
      businessFunction
      location
      roles
      language
      email
      opqTestUrl
      subscriptionId
      permissions {
        key
        hasPermission
      }
      participantAccess {
        showResults
        showDevGuides
      }
      biodata {
        id
        localizedName
        type
        userTableColumn
        participantVisible
        value
        localizedListItems {
          id
          name
        }
      }
      reportNotification
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($userProfile: UpdateUserProfileInput!) {
    updateUserProfile(userProfile: $userProfile) {
      id
    }
  }
`;

interface IAuthContextProviderProps {
  apolloCache: ApolloCache<any>;
  currentLocale: string;
  children: React.ReactNode;
}

const userHasPermission = (state: IAuthState, permission: Permission) => {
  if (!state.user || !state.user.permissions) {
    return false;
  }

  const permissionObject = state.user.permissions.find(
    (el: any) => el.key === permission
  );

  /* istanbul ignore next */
  if (!permissionObject) {
    return false;
  }

  return permissionObject.hasPermission;
};

export default ({
  apolloCache,
  currentLocale,
  children
}: IAuthContextProviderProps) => {
  const [state, dispatch] = useAuthContextReducer({
    tokenStorage,
    apolloCache
  });
  const { token, isReady } = state;
  const { data, error } = useQuery<IUserData>(USER_QUERY, {
    skip: !token
  });

  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

  const utils = {
    hasPermission: (permission?: Permission) =>
      permission ? userHasPermission(state, permission) : false
  };

  useEffect(() => {
    if (!error) {
      return;
    }

    dispatch(actions.logout());
  }, [error, dispatch]);

  useEffect(() => {
    if (data && data.currentUser) {
      const currentLanguage = currentLocale && currentLocale.replace("-", "_");
      if (
        data.currentUser.language &&
        data.currentUser.language !== currentLocale
      ) {
        updateUserProfile({
          variables: {
            userProfile: {
              id: data && data.currentUser.id,
              firstName: data && data.currentUser.firstName,
              lastName: data && data.currentUser.lastName,
              titleId: data && data.currentUser.titleId,
              genderId: data && data.currentUser.genderId,
              businessFunction: data && data.currentUser.businessFunction,
              yearOfBirth: data && data.currentUser.yearOfBirth,
              location: data && data.currentUser.location,
              language: currentLanguage
            }
          }
        }).then(() => {
          const updatedCurrentUser = {
            ...data.currentUser,
            language: currentLanguage
          };
          dispatch(actions.setUser(updatedCurrentUser));
        });
      } else {
        dispatch(actions.setUser(data.currentUser));
      }
    }
  }, [token, data, currentLocale, updateUserProfile, dispatch]);

  useEffect(() => {
    const persistedToken = tokenStorage.getToken();

    if (!persistedToken) {
      dispatch(actions.setReady());
      return;
    }

    dispatch(actions.setToken(persistedToken));
  }, [dispatch]);

  return (
    <AuthContext.Provider value={[state, dispatch, utils] as any}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
