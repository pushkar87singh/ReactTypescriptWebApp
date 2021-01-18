import React from "react";
import MuiButton, { ButtonProps } from "@material-ui/core/Button";
import { PropTypes, CircularProgress, makeStyles } from "@material-ui/core";
import theme from "../../theme";

interface IButtonProps extends ButtonProps {
  /**
   * Type of button
   *
   * @default "contained"
   */
  variant: "contained" | "text" | "outlined";
  /**
   * Button size
   *
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Button color
   *
   * @default "secondary"
   */
  color?: PropTypes.Color;
  /**
   * Whether the button should occupy its parent full width
   *
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether the button is on a loading state
   *
   * @default false
   */
  loading?: boolean;
}

const useProgressStyles = makeStyles({
  svg: () => ({
    color: theme.palette.common.white
  })
});

const useButtonStyles = (color: string) =>
  makeStyles({
    root: {},
    contained: {
      "&$disabled": {
        background: color
      }
    },
    disabled: {}
  });

const getDisabledButtonColor = (props: {
  loading?: boolean;
  color?: PropTypes.Color;
}) => {
  if (props.loading) {
    switch (props.color) {
      case "primary":
        return theme.palette.primary.main;
      case "secondary":
        return theme.palette.secondary.main;
      default:
        return theme.palette.action.disabled;
    }
  }
  return "inherit";
};

const Button = ({
  variant,
  loading,
  color,
  children,
  disabled,
  ...props
}: IButtonProps) => {
  const classes = useProgressStyles({ color });
  const buttonClasses = useButtonStyles(
    getDisabledButtonColor({ loading, color })
  )(props);

  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled || loading}
      classes={buttonClasses}
      {...props}
    >
      {loading ? (
        <CircularProgress classes={classes} size={18} thickness={4} />
      ) : (
        children
      )}
    </MuiButton>
  );
};

Button.defaultProps = {
  variant: "contained",
  color: "secondary",
  size: "medium",
  fullWidth: false,
  loading: false
};

export default Button;
