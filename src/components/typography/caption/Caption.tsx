import React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

const Caption = (props: TypographyProps) => (
  <Typography variant="caption" gutterBottom {...props} />
);

export default Caption;
