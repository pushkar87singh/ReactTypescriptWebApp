import React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

const Overline = (props: TypographyProps) => (
  <Typography variant="overline" gutterBottom {...props} />
);

export default Overline;
