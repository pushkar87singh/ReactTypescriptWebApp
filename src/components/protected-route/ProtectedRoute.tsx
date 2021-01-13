import React from "react";
//import useAuthContext from "../../hooks/useAuthContext";
import { Redirect, RouteComponentProps } from "@reach/router";
import Header from "../header";
import Navigation from "../navigation";
import { styled } from "@material-ui/styles";
import { IStyledArguments } from "../../types/styled-arguments";
import { Permission } from "../auth-context-provider";
import { useHasPermission } from "../../hooks/useHasPermission";
import { FocusRole } from "../../types";
import { routes } from "../../utils";
import { socket } from "../../apollo";

export interface IProtectedRouteProps extends RouteComponentProps {
  component: any;
  /**
   * Where the user should be redirected to if not authenticated or permitted
   *
   * @default "/login"
   */
  unauthorizedRedirectTo?: string;
  withPermission?: Permission;
  leader?: boolean;
  leaderComponent?: React.ElementType;
  path: string;
}

const HeaderSpacer = styled("div")(({ theme }: IStyledArguments) => ({
  height: theme.layout.headerHeight,
  width: "100%"
}));

const FlexContainer = styled("div")(({ theme }: IStyledArguments) => ({
  display: "flex",
  minHeight: `calc(100vh - ${theme.layout.headerHeight})`
}));

const ComponentWrapper = styled("div")(({ theme }: IStyledArguments) => ({
  width: "100%",
  marginLeft: theme.layout.navDrawerWidthClosed,
  [theme.breakpoints.up("xl")]: {
    marginLeft: 0
  }
}));

type Win = Window & typeof globalThis;
type ExtendedWindow = Win & {
  prevLocation: string;
};

const doNavLog = (path: string, win: ExtendedWindow) => {
  if (!win.prevLocation) {
    win.prevLocation = path;
  } else {
    socket.emit("navigate-log", [win.prevLocation, path]);

    win.prevLocation = path;
  }
};

export function ProtectedRoute<T = void>({
  component,
  unauthorizedRedirectTo = routes.login,
  withPermission,
  leader,
  leaderComponent,
  ...rest
}: IProtectedRouteProps & Partial<T>): JSX.Element {
  //const [{ isLoggedIn, user }] = useAuthContext();
  const { isLoggedIn, user } = {
    isLoggedIn: true,
    user: { id: "", firstName: "", lastName: "" }
  };
  /* Navigation Logging */
  if (rest.path) {
    doNavLog(rest.path, window as ExtendedWindow);
  }
  /* End Navigation Logging */

  let Component: React.ElementType = component;

  let isLeader: boolean = leader || false;

  let hasPermission = useHasPermission(withPermission);

  if (!withPermission && user && user.roles) {
    const hasLeaderRole = user.roles.includes(FocusRole.LEADER);

    if (!isLeader && hasLeaderRole && leaderComponent) {
      isLeader = true;
      hasPermission = true;
      Component = leaderComponent;
    } else if (isLeader) {
      hasPermission = hasLeaderRole;
    } else {
      hasPermission =
        user.roles.includes(FocusRole.GROUP_ADMIN) ||
        user.roles.includes(FocusRole.SUBSCRIPTION_MANAGER) ||
        user.roles.includes(FocusRole.PS_CONSULTANT) ||
        user.roles.includes(FocusRole.SERVICE_MANAGER) ||
        user.roles.includes(FocusRole.SYSTEM_ADMIN);
    }
  }

  if (!hasPermission) {
    return <Redirect to={unauthorizedRedirectTo} noThrow />;
  }

  return !isLoggedIn ? (
    <Redirect to={routes.login} noThrow />
  ) : isLeader ? (
    <Component {...rest} />
  ) : (
    <>
      <Header />
      <HeaderSpacer />
      <FlexContainer>
        <Navigation />
        <ComponentWrapper>
          <Component {...rest} />
        </ComponentWrapper>
      </FlexContainer>
    </>
  );
}
