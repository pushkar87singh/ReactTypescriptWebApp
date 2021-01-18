import React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface IBodyProps {
  /**
   * Body Level (1 or 2)
   *
   * @default 1
   */
  level?: 1 | 2;
}

const Body = (props: IBodyProps & TypographyProps) => {
  const variant = props.level === 1 ? "body1" : "body2";

  return <Typography variant={variant} gutterBottom {...props} />;
};

Body.defaultProps = {
  level: 1
};

export default Body;
