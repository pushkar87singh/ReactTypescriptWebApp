import React from "react";
import Avatar, { AvatarProps } from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

interface IUser {
  firstName: string;
  lastName: string;
}

interface IUserAvatarProps extends AvatarProps {
  user?: IUser;
}

const getInitials = (p: IUser) =>
  `${p.firstName[0] || ""}${p.lastName[0] || ""}`;

const UserAvatar = ({ user, ...props }: IUserAvatarProps) => (
  <Avatar {...props}>{user ? getInitials(user) : <PersonIcon />}</Avatar>
);

export default UserAvatar;
