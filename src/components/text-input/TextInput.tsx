import React from "react";
import { FormikHandlers } from "formik";
import TextField, { OutlinedTextFieldProps } from "@material-ui/core/TextField";

interface ITextInput extends OutlinedTextFieldProps {
  field: {
    onChange: FormikHandlers["handleChange"];
    onBlur: FormikHandlers["handleBlur"];
    value: any;
    name: string;
  };
  onTextChange?: (val: string) => void;
}

const TextInput = ({
  field,
  inputProps,
  onTextChange,
  ...props
}: ITextInput) => {
  const { onChange, onBlur, ...inputFieldProps } = field;

  const handleChange = (event: React.ChangeEvent<any>) => {
    if (onChange) {
      onChange(event);
    }

    if (props.onChange) {
      props.onChange(event);
    }

    if (onTextChange) {
      onTextChange(event.target.value);
    }
  };

  return (
    <TextField
      {...props}
      {...inputFieldProps}
      onChange={handleChange}
      onBlur={onBlur || props.onBlur}
      inputProps={{ ...inputProps }}
    />
  );
};

TextInput.defaultProps = {
  variant: "outlined",
  margin: "normal",
  field: {}
};

export default TextInput;
