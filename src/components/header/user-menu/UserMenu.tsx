import React, { SyntheticEvent } from "react";
import AdminsIcon from "@material-ui/icons/PeopleOutline";
import AccountIcon from "@material-ui/icons/PersonOutline";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SubscriptionIcon from "@material-ui/icons/Restore";
import BusinessIcon from "@material-ui/icons/Business";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import { styled } from "@material-ui/styles";
import { MenuItem, Menu, Theme, makeStyles } from "@material-ui/core";
import { IStyledArguments } from "../../../types/styled-arguments";
//import { actions } from "../../auth-context-provider";
//import useAuthContext from "../../../hooks/useAuthContext";
import { FocusRole, ChosenView } from "../../../types";
//import SubscriptionManagersList from "./SubscriptionManagersList";
//import messages from "./UserMenu.intl";
//import { FormattedMessage } from "react-intl";
import UserAvatar from "../../user-avatar/UserAvatar";

import { Permission } from "../../auth-context-provider";
// import ProgrammeAdminsList from "./ProgrammeAdminsList";
// import MyProfileDetails from "./MyProfileDetails";
// import ManageSubscription from "./ManageSubscription";
//import SubscriptionDetails from "./subscription-details";
import { navigate } from "@reach/router";
import { routes } from "../../../utils";
import { useProcessAccess } from "../../../hooks/useProcessAccess";
import { Processes } from "../../../types/process-authorization";

const Avatar = styled(UserAvatar)(({ theme }: IStyledArguments) => ({
  margin: theme.spacing(0, 0, 0, 3.5),
  cursor: "pointer"
}));

const MenuItemText = styled("div")({
  minWidth: 170,
  marginRight: 10
});

const useMenuStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(3)
  }
}));

type ICurrentDrawerState =
  | null
  | "my-profile-details"
  | "subscription-managers"
  | "programme-admins"
  | "my-subscription"
  | "all-subscriptions"
  | "subscription-details";

const UserMenu = () => {
  const menuStyles = useMenuStyles({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentDrawer, setCurrentDrawer] = React.useState<ICurrentDrawerState>(
    null
  );
  const [{ user }, dispatch, utils] = useAuthContext();

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget as any);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const canViewSubscriptionManagers = utils.hasPermission(
    Permission.SUBSCRIPTION_MANAGERS_VIEW
  );

  const canAddProgrammeAdmins = utils.hasPermission(
    Permission.PROGRAMMES_MANAGE_ADMINS
  );

  const canManageSubscription = utils.hasPermission(
    Permission.SUBSCRIPTION_MANAGERS_ADD
  );

  const canViewAllSubscriptions = utils.hasPermission(
    Permission.ALL_SUBSCRIPTIONS_VIEW
  );

  // const canViewSubscriptionDetails = useProcessAccess(
  //   Processes.TMSubscription,
  //   user
  // );

  const isSuperUser =
    user &&
    user.roles &&
    (user.roles.includes(FocusRole.PS_CONSULTANT) ||
      user.roles.includes(FocusRole.SERVICE_MANAGER) ||
      user.roles.includes(FocusRole.SYSTEM_ADMIN));

  return !user ? (
    <></>
  ) : (
    //   <div>
    //     <Avatar
    //       user={user}
    //       data-testid="user-icon"
    //       role="button"
    //       aria-controls="user-menu"
    //       aria-haspopup="true"
    //       onClick={handleClick}
    //     />
    //     <Menu
    //       keepMounted
    //       classes={menuStyles}
    //       id="user-menu"
    //       data-testid="user-menu"
    //       anchorEl={anchorEl}
    //       open={Boolean(anchorEl)}
    //       onClose={handleClose}
    //     >
    //       <MenuItem
    //         onClick={() => {
    //           setCurrentDrawer("my-profile-details");
    //           handleClose();
    //         }}
    //         data-testid="user-menu-my-profile-details"
    //       >
    //         <MenuItemText>
    //           <FormattedMessage {...messages.myProfileDetails} />
    //         </MenuItemText>
    //         <AccountIcon />
    //       </MenuItem>
    //       {canViewSubscriptionDetails && user.subscriptionId && (
    //         <MenuItem
    //           onClick={() => {
    //             setCurrentDrawer("subscription-details");
    //             handleClose();
    //           }}
    //           data-testid="user-subscription-details"
    //         >
    //           <MenuItemText>
    //             <FormattedMessage {...messages.subscriptionDetails} />
    //           </MenuItemText>
    //           <BusinessIcon />
    //         </MenuItem>
    //       )}
    //       {!isSuperUser && canManageSubscription && (
    //         <MenuItem
    //           onClick={() => {
    //             setCurrentDrawer("my-subscription");
    //             handleClose();
    //           }}
    //           data-testid="user-menu-my-subscription"
    //         >
    //           <MenuItemText>
    //             <FormattedMessage {...messages.mySubscription} />
    //           </MenuItemText>
    //           <SubscriptionIcon />
    //         </MenuItem>
    //       )}
    //       {canViewAllSubscriptions && (
    //         <MenuItem
    //           onClick={() => {
    //             navigate(routes.admin.subscriptions);
    //             handleClose();
    //           }}
    //           data-testid="user-menu-all-subscriptions"
    //         >
    //           <MenuItemText>
    //             <FormattedMessage {...messages.allSubscriptions} />
    //           </MenuItemText>
    //           <SubscriptionIcon />
    //         </MenuItem>
    //       )}
    //       {canViewSubscriptionManagers && (
    //         <MenuItem
    //           onClick={() => {
    //             setCurrentDrawer("subscription-managers");
    //             handleClose();
    //           }}
    //           data-testid="user-menu-subscription-managers"
    //         >
    //           <MenuItemText>
    //             <FormattedMessage {...messages.subscriptionManagers} />
    //           </MenuItemText>
    //           <AdminsIcon />
    //         </MenuItem>
    //       )}
    //       {canAddProgrammeAdmins && (
    //         <MenuItem
    //           onClick={() => {
    //             setCurrentDrawer("programme-admins");
    //             handleClose();
    //           }}
    //           data-testid="user-menu-programme-admins"
    //         >
    //           <MenuItemText>
    //             <FormattedMessage {...messages.groupAdmins} />
    //           </MenuItemText>
    //           <AdminsIcon />
    //         </MenuItem>
    //       )}
    //       {user.roles && user.roles.includes(FocusRole.LEADER) && (
    //         <MenuItem
    //           onClick={() => {
    //             dispatch(actions.setView(ChosenView.LEADER));
    //             navigate("/");
    //           }}
    //           data-testid="user-menu-change-view"
    //         >
    //           <MenuItemText>
    //             <FormattedMessage {...messages.myDevelopment} />
    //           </MenuItemText>
    //           <AssignmentTurnedInIcon />
    //         </MenuItem>
    //       )}
    //       <MenuItem
    //         onClick={() => dispatch(actions.logout())}
    //         data-testid="user-menu-logout"
    //       >
    //         <MenuItemText>
    //           <FormattedMessage {...messages.logout} />
    //         </MenuItemText>
    //         <LogoutIcon />
    //       </MenuItem>
    //     </Menu>
    //     <MyProfileDetails
    //       open={currentDrawer === "my-profile-details"}
    //       onClose={() => setCurrentDrawer(null)}
    //     />
    //     {canViewSubscriptionDetails && (
    //       <SubscriptionDetails
    //         open={currentDrawer === "subscription-details"}
    //         onClose={() => setCurrentDrawer(null)}
    //       />
    //     )}
    //     {canViewSubscriptionManagers && (
    //       <SubscriptionManagersList
    //         open={currentDrawer === "subscription-managers"}
    //         onClose={() => setCurrentDrawer(null)}
    //       />
    //     )}
    //     {canAddProgrammeAdmins && (
    //       <ProgrammeAdminsList
    //         open={currentDrawer === "programme-admins"}
    //         onClose={() => setCurrentDrawer(null)}
    //       />
    //     )}
    //     {canManageSubscription && (
    //       <ManageSubscription
    //         open={currentDrawer === "my-subscription"}
    //         onClose={() => setCurrentDrawer(null)}
    //       />
    //     )}
    //   </div>
    <>
      <div>This is my Menu</div>
    </>
  );
};

export default UserMenu;
