import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { styled } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import theme from "../../theme";
import Button from "../button";

type variantType = "info" | "warning" | "error" | "success";

const variantColor = {
  success: theme.palette.secondary.dark,
  warning: theme.palette.extra.warning.main,
  info: theme.palette.primary.dark,
  error: theme.palette.error.main
};

interface IStyledSnackBarContent {
  message?: string | React.ReactNode;
  variant: variantType;
  action?: React.ReactNode;
}
const StyledSnackBarContent = styled(({ variant, ...props }) => (
  <SnackbarContent {...props} />
))<Theme, IStyledSnackBarContent>(({ variant }) => {
  return {
    width: 443,
    minHeight: 48,
    backgroundColor: variantColor[variant]
  };
});

interface ISnackBarProps {
  message?: string | React.ReactNode;
  onClose?: () => void;
  open: boolean;
  variant: variantType;
  anchorOrigin?: any;
  actionText?: string;
  action?: () => void;
}

const SnackBar = ({
  variant,
  message,
  open,
  onClose,
  anchorOrigin,
  actionText,
  action,
  ...props
}: ISnackBarProps & { action?: () => void }) => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      message={message}
      open={open}
      onClose={onClose}
      {...props}
    >
      <StyledSnackBarContent
        aria-describedby="client-snackbar"
        message={<span data-testid="snack-message">{message}</span>}
        variant={variant}
        data-testid="snackbar-content"
        action={
          actionText && (
            <Button
              variant="text"
              color="inherit"
              data-testid="snackbar-action"
              onClick={action}
            >
              {actionText}
            </Button>
          )
        }
      />
    </Snackbar>
  );
};

SnackBar.defaultProps = {
  variant: "info",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  autoHideDuration: 6000,
  open: false
};

export default SnackBar;
