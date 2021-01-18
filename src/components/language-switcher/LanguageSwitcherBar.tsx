import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { styled } from "@material-ui/styles";
import { IStyledArguments } from "../../types/styled-arguments";

interface ILanguageSwitcher {
  locale?: string;
  onChange: (arg: string) => void;
  showLanguageSwitcherBar?: any;
}

const Container = styled("div")(({ theme }: IStyledArguments) => ({
  display: "flex",
  maxWidth: theme.layout.maxContentWidth,
  margin: "0 auto",
  padding: theme.spacing(0, 3),
  justifyContent: "flex-end",
  marginBottom: theme.spacing(4)
}));

const LanguageSwitcherBar = ({
  showLanguageSwitcherBar = true,
  ...props
}: ILanguageSwitcher) => {
  if (!showLanguageSwitcherBar) {
    return null;
  }
  return (
    <Container>
      <LanguageSwitcher {...props} />
    </Container>
  );
};

export default LanguageSwitcherBar;
