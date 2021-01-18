import React from "react";
import {
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  withStyles,
  Theme
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { CardHeaderProps } from "@material-ui/core/CardHeader";

export const DarkCardHeader = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light
  },
  title: {
    color: theme.palette.common.white
  },
  subheader: {
    color: theme.palette.common.white
  }
}))(MuiCardHeader);

export const LightCardHeader = withStyles((theme) => ({
  action: {
    "& > button": {
      color: theme.palette.extra.lighterGrey
    }
  }
}))(MuiCardHeader);

const DarkCardContent = styled(MuiCardContent)<Theme>(({ theme }) => ({
  backgroundColor: theme.palette.grey[100]
}));

const LightCardContent = styled(MuiCardContent)<Theme>(({ theme }) => ({
  backgroundColor: theme.palette.grey[200]
}));

export const DarkCardFooter = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light
  }
}))(MuiCardActions);

export const LightCardFooter = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light
  }
}))(MuiCardActions);

interface ICardProps {
  title?: string | null;
  subtitle?: string | null;
  subtitleComponent?: JSX.Element | null;
  footerComponent?: JSX.Element | null;
  dark?: boolean;
  action?: CardHeaderProps["action"];
}

export const Card: React.FC<ICardProps> = ({
  title,
  subtitle,
  subtitleComponent,
  footerComponent,
  dark,
  action,
  children
}) => {
  dark = dark || false;
  const CardHeader = dark ? DarkCardHeader : LightCardHeader;
  const CardContent = dark ? DarkCardContent : LightCardContent;
  const CardFooter = dark ? DarkCardFooter : LightCardFooter;

  const showSubHeader = subtitle || subtitleComponent;
  const showHeader = title || showSubHeader;
  const showFooter = !!footerComponent;

  return (
    <MuiCard>
      {showHeader ? (
        <CardHeader
          title={title}
          subheader={
            showSubHeader ? (
              <>
                {subtitle}
                &nbsp;
                {subtitleComponent}
              </>
            ) : null
          }
          action={action}
        />
      ) : null}
      {children ? <CardContent>{children}</CardContent> : null}
      {showFooter ? <CardFooter>{footerComponent}</CardFooter> : null}
    </MuiCard>
  );
};
