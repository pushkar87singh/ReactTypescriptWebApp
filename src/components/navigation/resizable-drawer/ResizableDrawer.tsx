import { Drawer } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { IStyledArguments } from "../../../types/styled-arguments";
import { Theme } from "@material-ui/core";

interface IResizableDrawer extends IStyledArguments {
  open: boolean;
}

const ResizableDrawer = styled(Drawer)<Theme, IResizableDrawer>(
  ({ theme, open }) => {
    const openStyles = {
      width: theme.layout.navDrawerWidthOpen,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    };

    const closedStyles = {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.layout.navDrawerWidthClosed,
      [theme.breakpoints.up("xl")]: {
        width: theme.layout.navDrawerWidthOpen
      }
    };

    const containerAndChildStyles = {
      paddingTop: theme.layout.headerHeight,
      background: theme.palette.primary.light,
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      borderRight: "none",
      whiteSpace: "nowrap",
      flexShrink: 0,
      zIndex: theme.zIndex.drawer,
      ...(open ? openStyles : closedStyles)
    } as any;

    return {
      boxShadow: theme.shadows[8],
      ...containerAndChildStyles,
      "& > *": { ...containerAndChildStyles },
      [theme.breakpoints.up("xl")]: {
        position: "static",
        height: `calc(100vh - ${theme.layout.headerHeight}px)`,
        width: theme.layout.navDrawerWidthOpen
      }
    };
  }
);

export default ResizableDrawer;
