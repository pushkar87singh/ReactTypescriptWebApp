import React from "react";
import { Match, Link } from "@reach/router";
import {
  ListItemText as MuiListItemText,
  ListItem,
  ListItemIcon as MuiListItemIcon
} from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/styles";
import theme from "../../../theme";
import { ListItemIconProps } from "@material-ui/core/ListItemIcon";
import { ListItemTextProps } from "@material-ui/core/ListItemText";
import { Theme, Tooltip } from "@material-ui/core";
import { injectIntl } from "react-intl";
import messages from "../Navigation.intl";

/* Styles */
const activeItemColor = "#3b7b9b";

interface IListItemText extends ListItemTextProps {
  open: boolean;
  listItemTextClasses: {};
}

const ListItemText = styled(
  ({ open, listItemTextClasses, ...props }: IListItemText) => (
    <MuiListItemText classes={listItemTextClasses} {...props} />
  )
)<Theme, IListItemText>(({ open }) => ({
  opacity: open ? 1 : 0,
  [theme.breakpoints.up("xl")]: {
    opacity: 1
  }
}));

const useListItemTextStyles = makeStyles({
  root: {
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short
    })
  },
  primary: {
    marginLeft: theme.spacing(2),
    color: theme.palette.extra.lightBlue,
    fontFamily: theme.typography.alternateFontFamily,
    fontWeight: 600,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1.25
  },
  active: {
    color: theme.palette.common.white
  }
});

const useListItemStyles = makeStyles({
  button: {
    borderRadius: 22,
    padding: theme.spacing(0.75, 1),
    marginBottom: theme.spacing(0.75),
    "&:focus, &:active": {
      background: activeItemColor
    }
  },
  root: {
    "&$selected, &$selected:hover, &$selected:focus": {
      background: activeItemColor
    }
  },
  selected: {
    background: activeItemColor
  }
});

const TooltipWrapper = styled("span")(() => ({
  display: "flex"
}));

interface IActiveElement {
  active: boolean;
}

const ListItemIcon = styled(
  ({ active, ...props }: ListItemIconProps & IActiveElement) => (
    <MuiListItemIcon {...props} />
  )
)<Theme, IActiveElement>(({ theme: { palette }, active }) => ({
  color: active ? palette.common.white : palette.extra.lightBlue,
  minWidth: 32
}));

interface IAnchor {
  external?: boolean;
  to: string;
  selected: boolean;
  classes: any;
  disabled?: boolean;
}

const Anchor = injectIntl<IAnchor>(
  ({ external, to, disabled, intl, ...props }) => {
    const opts: any = {};

    if (external) {
      opts.component = "a";
      opts.href = to;
      opts.target = "_blank";
    } else {
      opts.component = Link;
      opts.to = to;
      opts.onClick = (e: any) => e.stopPropagation();
    }

    return (
      <Tooltip
        placement="right"
        title={disabled ? intl.formatMessage(messages.disabled) : ""}
      >
        <TooltipWrapper>
          <ListItem disabled={disabled} button {...opts} {...props} />
        </TooltipWrapper>
      </Tooltip>
    );
  }
);

const FlexBlock = styled("div")({ display: "flex" });

interface IListItemAnchor {
  to: string;
  matches?: string;
  children: string;
  open: boolean;
  icon: React.ReactElement;
  external?: boolean;
  disabled?: boolean;
}

const NavigationAnchor: React.FC<IListItemAnchor> = ({
  to,
  matches,
  children,
  icon,
  open,
  external,
  disabled,
  ...props
}) => {
  const {
    active: activeClassName,
    ...listItemTextClasses
  } = useListItemTextStyles(props);
  const listItemClasses = useListItemStyles(props);

  return (
    <Match path={matches || `${to}/*`}>
      {({ match }) => {
        const active = !!(
          match &&
          (match.path === matches || match.uri === to)
        );

        return (
          <Anchor
            to={to}
            selected={active}
            classes={listItemClasses}
            external={external}
            disabled={disabled}
            {...props}
          >
            <FlexBlock>
              <ListItemIcon active={active}>{icon}</ListItemIcon>
            </FlexBlock>
            <ListItemText
              open={open}
              listItemTextClasses={{
                ...listItemTextClasses,
                primary: `${listItemTextClasses.primary} ${
                  active ? activeClassName : ""
                }`
              }}
            >
              {children}
            </ListItemText>
          </Anchor>
        );
      }}
    </Match>
  );
};

export default NavigationAnchor;
