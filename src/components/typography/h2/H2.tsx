import React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

const H2 = (props: TypographyProps) => (
  <Typography variant="h2" gutterBottom {...props} />
);

export default H2;
