import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { RouteComponentProps, Redirect } from "@reach/router";
import LoginForm from "./login-form";
import { ILoginFormValues } from "./login-form/LoginForm";
import { actions } from "../auth-context-provider";
import useAuthContext from "../../hooks/useAuthContext";
import Snackbar from "../snackbar";
import { useMutation } from "@apollo/react-hooks";
import messages from "./login-form/LoginForm.intl";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { UnauthenticatedLayout } from "../unauthenticated-layout-elements";
import { FocusRole } from "../../types";

export const LOGIN_MUTATION = gql`
  mutation Login(
    $username: String!
    $password: String!
    $reCaptchaToken: String!
  ) {
    login(
      username: $username
      password: $password
      reCaptchaToken: $reCaptchaToken
    )
  }
`;

// adding "grecaptcha" property to Window
declare global {
  interface Window {
    grecaptcha: any;
  }
}
// const grecaptcha = window.grecaptcha;

const PageLogin = injectIntl(
  (props: RouteComponentProps & InjectedIntlProps) => {
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [state, dispatch] = useAuthContext();

    /* istanbul ignore next */
    const handleErrorMessageClose = () => {
      setOpenErrorMessage(false);
    };

    const preLoginErrMsg =
      props.location &&
      props.location.state &&
      (props.location.state as any).errorMsg;
    const [openPreLoginErrMsg, setOpenPreLoginErrMsg] = useState(
      !!preLoginErrMsg
    );
    const handlePreLoginErrMsgClose = () => setOpenPreLoginErrMsg(false);

    let hasLoginError = false;
    const [login, { error, data }] = useMutation(LOGIN_MUTATION);

    useEffect(() => {
      const body = document.getElementsByTagName("body");
      body[0].classList.add("showCaptcha");

      return () => {
        body[0].classList.remove("showCaptcha");
      };
    }, []);

    useEffect(() => {
      if (error) {
        console.log(error);
        setOpenErrorMessage(true);
      }
    }, [error]);

    hasLoginError = !!error;

    useEffect(() => {
      if (!state.token && data && data.login) {
        dispatch(actions.setToken(data.login));
      }
    }, [state.token, data, dispatch]);

    if (state.isLoggedIn) {
      const isLeader =
        state.user &&
        state.user.roles &&
        state.user.roles.includes(FocusRole.LEADER);
      const isTitleId = state.user && state.user.titleId;
      if (isLeader && !isTitleId) {
        return <Redirect to="/login/post" noThrow />;
      } else if (isLeader && isTitleId) {
        return <Redirect to="/leader" noThrow />;
      }
      return <Redirect to="/" noThrow />;
    }

    return (
      <>
        {/* Snackbar for error on clicking Login */}
        <Snackbar
          open={openErrorMessage}
          message={props.intl.formatMessage(messages.loginError)}
          variant="error"
          onClose={handleErrorMessageClose}
        />
        {/* Snackbar for pre login error */}
        <Snackbar
          open={openPreLoginErrMsg}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          message={preLoginErrMsg}
          variant="error"
          onClose={handlePreLoginErrMsgClose}
        />
        <UnauthenticatedLayout>
          <LoginForm
            onSubmit={
              ({ username, password }: ILoginFormValues) =>
                // grecaptcha.ready(function () {
                //   grecaptcha.execute('6Lf3svYUAAAAACa8qNmoDSBUnp5HzWsEQ69ylend', { action: 'loginpage' }).then(function (reCaptchaToken: string) {
                login({
                  variables: {
                    username,
                    password,
                    reCaptchaToken: ""
                  }
                }).catch(() => null)
              //   });
              // })
            }
            hasLoginError={hasLoginError}
          />
        </UnauthenticatedLayout>
      </>
    );
  }
);

export default PageLogin;
