import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { USER_QUERY } from "../auth-context-provider/AuthContextProvider";
import { IUserData } from "../../types";

export interface ILocaleContextValue
  extends Array<string | ((e: string) => void)> {
  0: string;
  1: (e: string) => void;
}

/* istanbul ignore next */
const LocaleContext = React.createContext<ILocaleContextValue>(["", () => ""]);

interface ILocaleContextProviderProps {
  children: React.ReactNode;
  locale: string;
}

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($userProfile: UpdateUserProfileInput!) {
    updateUserProfile(userProfile: $userProfile) {
      id
    }
  }
`;

export default ({ children, locale }: ILocaleContextProviderProps) => {
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);
  const { data } = useQuery<IUserData>(USER_QUERY);

  const saveLocale = async (newLocale: string) => {
    setCurrentLocale(newLocale);
    if (localStorage.getItem("locale") !== newLocale) {
      window.location.reload(true);
    }
    localStorage.setItem("locale", newLocale);

    if (data && data.currentUser) {
      const language = newLocale && newLocale.replace("-", "_");
      await updateUserProfile({
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
            language
          }
        }
      });
    }
  };

  return (
    <LocaleContext.Provider value={[currentLocale, saveLocale] as any}>
      {children}
    </LocaleContext.Provider>
  );
};

export { LocaleContext };
