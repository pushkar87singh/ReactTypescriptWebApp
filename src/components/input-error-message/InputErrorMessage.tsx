import React from "react";
import { FormHelperText } from "@material-ui/core";
import { ErrorMessage, ErrorMessageProps } from "formik";

const InputErrorMessage = ({ name, ...props }: ErrorMessageProps) => {
  return (
    <ErrorMessage name={name} {...props}>
      {(message) => (
        <FormHelperText data-testid="error" variant="outlined" error>
          {message}
        </FormHelperText>
      )}
    </ErrorMessage>
  );
};

export default InputErrorMessage;
