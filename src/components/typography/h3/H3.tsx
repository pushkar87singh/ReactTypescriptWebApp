import React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

const H3 = (props: TypographyProps) => (
  <Typography variant="h3" gutterBottom {...props} />
);

export default H3;
