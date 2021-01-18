import React from "react";
import { styled } from "@material-ui/styles";
import { Paper, Grid } from "@material-ui/core";
import Content from "../content";
import LanguageSwitcherBar from "../language-switcher/LanguageSwitcherBar";
import { ReactComponentLike } from "prop-types";
import useLocaleContext from "../../hooks/useLocaleContext";
import { Form as FormikForm } from "formik";
import Typography from "../typography";
import Button from "../button";
import { Theme } from "@material-ui/core";

const StyledPaper = styled(Paper)<Theme>(({ theme }) => ({
  boxSizing: "border-box",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(5),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: 630,
  [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
    boxShadow: "none"
  }
}));

const StyledContent = styled(Content)<Theme>(({ theme }) => ({
  [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
    minHeight: "80vh"
  }
}));

export const UnauthenticatedLayout: ReactComponentLike = ({ children }) => {
  const [currentLocale, saveLocale] = useLocaleContext();
  return (
    <>
      <LanguageSwitcherBar locale={currentLocale} onChange={saveLocale} />
      <StyledContent>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} md={5}>
            <StyledPaper>{children}</StyledPaper>
          </Grid>
        </Grid>
      </StyledContent>
    </>
  );
};

export const VerticalForm = styled(FormikForm)(() => ({
  display: "flex",
  flexDirection: "column"
}));

export const Title = styled(({ children }) => (
  <Typography.H5 variant="h4">{children}</Typography.H5>
))<Theme>(({ theme }) => {
  const { md } = theme.breakpoints.values;

  return {
    marginBottom: 23,
    [`@media (max-width: ${md}px)`]: {
      marginBottom: 27
    }
  };
});

export const ActionButton = styled((props) => (
  <Button type="submit" size="large" {...props} />
))<Theme>(({ theme }) => {
  const { md } = theme.breakpoints.values;
  return {
    marginTop: 20,
    [`@media (max-width: ${md}px)`]: {
      marginTop: 36
    }
  };
});
