import { useReducer, Reducer } from "react";
import { Permission } from ".";
import { IUser, FocusRole, ChosenView } from "../../types";
import { ApolloCache } from "apollo-cache";
import tokenStorageModule from "./tokenStorage";

export interface IAuthStores {
  tokenStorage: typeof tokenStorageModule;
  apolloCache: ApolloCache<any>;
}

export interface IAuthState {
  isReady: boolean | undefined;
  isLoggedIn: boolean;
  token: string | undefined;
  user: IUser | undefined;
  view: string | undefined;
}

const initialState: IAuthState = {
  isReady: false,
  isLoggedIn: false,
  token: undefined,
  user: undefined,
  view: undefined
};

export interface IAuthAction {
  type: "SET_USER" | "SET_TOKEN" | "LOGOUT" | "SET_READY" | "SET_VIEW";
  payload: {
    ready?: boolean;
    token?: string;
    user?: IUser;
    view?: ChosenView;
  };
}

export const actions = {
  setUser: (user: IUser): IAuthAction => ({
    type: "SET_USER",
    payload: { user }
  }),
  setToken: (token: string): IAuthAction => ({
    type: "SET_TOKEN",
    payload: { token }
  }),
  setView: (view: ChosenView): IAuthAction => ({
    type: "SET_VIEW",
    payload: { view }
  }),
  logout: (): IAuthAction => ({
    type: "LOGOUT",
    payload: {}
  }),
  setReady: (ready: boolean = true): IAuthAction => ({
    type: "SET_READY",
    payload: { ready }
  })
};

/*
 * Checks that permissions values from GraphQL side and Client side match correctly.
 */
const assertAllPermissions = (user: IUser | undefined) => {
  if (!user || !user.permissions) {
    return;
  }

  const userPermissions = user.permissions.reduce(
    (availablePermissions, el) => {
      return { ...availablePermissions, [el.key]: el.hasPermission };
    },
    {}
  );

  const enumValues = Object.values(Permission)
    .map((perm) => perm.toString())
    .sort();
  const graphQLValues = Object.keys(userPermissions).sort();

  let missingPermission;

  // Check if all retrieved permissions are listed as enum value
  missingPermission = graphQLValues.find((el) => !enumValues.includes(el));
  if (missingPermission) {
    envAwareErrorAlert(
      `Permission ${missingPermission} exists on GraphQL Schema but are not listed in Client side.`
    );
  }

  // Check if all enums exist in retrieved permissions
  missingPermission = enumValues.find((el) => !graphQLValues.includes(el));
  if (missingPermission) {
    envAwareErrorAlert(
      `Permission ${missingPermission} is listed on Client side but does not exist on GraphQL schema.`
    );
  }
};

const envAwareErrorAlert = (message: string) => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "production") {
    throw new Error(message);
  } else {
    // tslint:disable-next-line:no-console
    console.warn(message);
  }
};

export const reducer = (
  { tokenStorage, apolloCache }: IAuthStores,
  state: IAuthState,
  action: IAuthAction
) => {
  switch (action.type) {
    case "SET_TOKEN":
      apolloCache.reset();
      const { token } = action.payload;
      tokenStorage.setToken(`${token}`);
      return {
        ...state,
        isReady: false,
        token
      };
    case "SET_VIEW":
      const { view } = action.payload;
      return {
        ...state,
        view
      };
    case "SET_READY":
      const { ready } = action.payload;
      return {
        ...state,
        isReady: ready
      };
    case "SET_USER":
      const { user } = action.payload;
      assertAllPermissions(user);
      return {
        ...state,
        isReady: true,
        isLoggedIn: true,
        user,
        view:
          user &&
          user.roles &&
          (user.roles.length > 1 || !user.roles.includes(FocusRole.LEADER))
            ? ChosenView.ADMIN
            : ChosenView.LEADER
      };
    case "LOGOUT":
      apolloCache.reset();
      tokenStorage.clearToken();

      return {
        isLoggedIn: false,
        isReady: true,
        token: undefined,
        user: undefined,
        view: undefined
      };
  }
};
export default (stores: IAuthStores) =>
  useReducer<Reducer<IAuthState, IAuthAction>>(
    reducer.bind(null, stores),
    initialState
  );
