import React from "react";
import { styled } from "@material-ui/styles";
import { Grid, Theme } from "@material-ui/core";
import { ResponsiveLayoutContext } from "../responsive-layout/ResponsiveLayout";
import { GridProps } from "@material-ui/core/Grid";

const defaultProps = {
  container: true,
  alignItems: "center",
  justify: "center",
  direction: "column"
} as GridProps;

const createStyledGrid = styled(({ bg, fixedWidth, sticky, ...props }) => {
  return <Grid {...defaultProps} {...props} />;
});

const getStickyNumber = (sticky: boolean | number) =>
  sticky === true ? 0 : (sticky as number);

const OuterGrid = createStyledGrid<Theme, IContentProps>(
  ({ bg, theme, fixedWidth, sticky }) => ({
    width: "100%",
    overflow: fixedWidth ? "visible" : "hidden",
    position: sticky ? "sticky" : "relative",
    top: sticky ? getStickyNumber(sticky) : 0,
    zIndex: sticky ? theme.zIndex.appBar : "auto",
    background: bg === "grey" ? theme.palette.extra.grey : "inherit",
    [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
      background: "inherit"
    }
  })
);

const InnerGrid = createStyledGrid<Theme, IContentProps>(({ theme }) => ({
  width: theme.breakpoints.values.lg
}));

interface IContentProps extends GridProps {
  children: React.ReactNode;
  fixedWidth?: boolean;
  bg?: "grey";
  sticky?: boolean | number;
}

const Content = ({
  classes,
  bg,
  fixedWidth,
  sticky,
  ...props
}: IContentProps) => {
  return (
    <ResponsiveLayoutContext.Consumer>
      {(disabled) =>
        fixedWidth || (disabled && fixedWidth !== false) ? (
          <OuterGrid bg={bg} fixedWidth sticky={sticky}>
            <InnerGrid {...props}>{props.children}</InnerGrid>
          </OuterGrid>
        ) : (
          <OuterGrid bg={bg} sticky={sticky} {...props}>
            {props.children}
          </OuterGrid>
        )
      }
    </ResponsiveLayoutContext.Consumer>
  );
};

export const GridContainer = ({ ...props }: GridProps) => (
  <Grid container {...props} />
);

export const GridItem = (props: GridProps) => <Grid item {...props} />;

export default Content;
