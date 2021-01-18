import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "@reach/router";
import MuiLink, { LinkProps } from "@material-ui/core/Link";
import { styled } from "@material-ui/styles";

interface ICustomLinkProps {
  component?: string | React.Component;
  color?: string;
}

const StyledMuiLink = styled(MuiLink)({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none"
  }
});

const Link = (props: ICustomLinkProps & LinkProps & RouterLinkProps<any>) => (
  <StyledMuiLink
    color={props.color || "inherit"}
    component={RouterLink}
    {...props}
  />
);

export default Link;
