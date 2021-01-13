import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { styled } from "@material-ui/styles";
//import { IStyledArguments } from "../../../types/styled-arguments";
import { IStyledArguments } from "../../types/styled-arguments";

const HeaderBar = styled((props) => <AppBar position="fixed" {...props} />)(
  ({ theme }: IStyledArguments) => ({
    background: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(0, 2)
  })
);

export default HeaderBar;
