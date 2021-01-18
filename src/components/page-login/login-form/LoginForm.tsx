import React from "react";
import { Formik, FormikActions, FormikProps, Field } from "formik";
import { styled } from "@material-ui/styles";
import { IStyledArguments } from "../../../types/styled-arguments";
import TextInput from "../../text-input";
import PasswordInput from "../../password-input";
import Link from "../../link";
import InputErrorMessage from "../../input-error-message";
import {
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
  InjectedIntl
} from "react-intl";
import messages from "./LoginForm.intl";
import {
  VerticalForm,
  Title,
  ActionButton
} from "../../unauthenticated-layout-elements";
import Grid from "@material-ui/core/Grid";

const ForgotPassword = styled(Grid)((props: IStyledArguments) => ({
  textAlign: "left",
  fontWeight: 500,
  marginTop: props.theme.spacing(1),
  marginLeft: 12
}));
const ForgotPasswordLink = styled(Link)((props: IStyledArguments) => ({
  fontWeight: 500,
  color: `${props.theme.palette.secondary.dark}`
}));

const SendEmailRegistartion = styled(Grid)((props: IStyledArguments) => ({
  textAlign: "right",
  fontWeight: 500,
  marginTop: props.theme.spacing(1),
  marginRight: 12
}));
const SendEmailRegistartionLink = styled(Link)((props: IStyledArguments) => ({
  fontWeight: 500,
  color: `${props.theme.palette.secondary.dark}`
}));

const required = (intl: InjectedIntl) => (value: string) => {
  let errorMessage;
  if (!value) {
    errorMessage = intl.formatMessage(messages.requiredFieldError);
  }
  return errorMessage;
};
export interface ILoginFormValues {
  username: string;
  password: string;
}

interface ILoginForm extends InjectedIntlProps {
  onSubmit: (arg: ILoginFormValues) => void;
  hasLoginError: boolean;
}

const LoginForm = ({ onSubmit, intl, hasLoginError }: ILoginForm) => (
  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={(
      values: ILoginFormValues,
      actions: FormikActions<ILoginFormValues>
    ) => {
      onSubmit(values);
      actions.setSubmitting(false);
    }}
    render={({ errors, touched }: FormikProps<ILoginFormValues>) => (
      <>
        <Title>
          <FormattedMessage {...messages.signIn} />
        </Title>
        <VerticalForm data-testid="login-form">
          <Field
            validate={required(intl)}
            name="username"
            error={hasLoginError || (errors.username && touched.username)}
            component={TextInput}
            inputProps={{
              "data-testid": "username",
              autoComplete: "username",
              autoFocus: true
            }}
            label={intl.formatMessage(messages.emailAddressLabel)}
          />
          <InputErrorMessage name="username" />
          <Field
            validate={required(intl)}
            name="password"
            error={hasLoginError || (errors.password && touched.password)}
            component={PasswordInput}
            inputProps={{
              "data-testid": "password",
              autoComplete: "new-password"
            }}
            label={intl.formatMessage(messages.passwordLabel)}
          />
          <InputErrorMessage name="password" />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ForgotPassword>
                <ForgotPasswordLink
                  to="/forgot-password"
                  data-testid="forgot-password"
                >
                  <FormattedMessage {...messages.forgotPassword} />
                </ForgotPasswordLink>
              </ForgotPassword>
            </Grid>

            <Grid item xs={6}>
              <SendEmailRegistartion>
                <SendEmailRegistartionLink
                  to="/registration-mail"
                  data-testid="registration-mail"
                >
                  <FormattedMessage {...messages.registration} />
                </SendEmailRegistartionLink>
              </SendEmailRegistartion>
            </Grid>
          </Grid>
          <div>
            <ActionButton data-testid="login-button">
              <FormattedMessage {...messages.signInButton} />
            </ActionButton>
          </div>
        </VerticalForm>
      </>
    )}
  />
);

export default injectIntl(LoginForm);
