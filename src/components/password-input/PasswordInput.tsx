import React, { useState } from "react";
import TextField, { OutlinedTextFieldProps } from "@material-ui/core/TextField";
import { InputAdornment, IconButton, Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FieldProps } from "formik";
import { injectIntl } from "react-intl";
import messages from "./PasswordInput.intl";

const PasswordInput = injectIntl<Partial<OutlinedTextFieldProps> & FieldProps>(
  ({
    intl,
    field,
    variant = "outlined",
    margin = "normal",
    inputProps,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { onChange, onBlur, ...inputFieldProps } = field;

    return (
      <TextField
        onChange={onChange}
        onBlur={onBlur}
        type={showPassword ? "text" : "password"}
        inputProps={{ ...inputProps, ...inputFieldProps }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                disableFocusListener
                disableTouchListener
                title={
                  showPassword
                    ? intl.formatMessage(messages.hidePassword)
                    : intl.formatMessage(messages.showPassword)
                }
              >
                <IconButton
                  aria-label={intl.formatMessage(
                    messages.togglePasswordVisibilityDescription
                  )}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
        variant={variant}
        margin={margin}
        {...props}
      />
    );
  }
);

export default PasswordInput;
