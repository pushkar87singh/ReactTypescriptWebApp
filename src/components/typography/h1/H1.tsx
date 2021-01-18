import React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

const H1 = (props: TypographyProps) => (
  <Typography variant="h1" gutterBottom {...props} />
);

export default H1;
