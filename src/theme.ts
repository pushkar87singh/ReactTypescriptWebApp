import { createMuiTheme } from "@material-ui/core/styles";

interface IExtraColors {
  default: string;
  grey: string;
  mediumGrey: string;
  lightGrey: string;
  lighterGrey: string;
  lightBlue: string;
  lightBorder: string;
  lightBorderActive: string;
  borderColor: string;
  darkBorderColor: string;
  warning: IWarningColors;
  hipoScoresColors: IHipoScoresColors;
  backgroundGrey: string;
  subtleContrastText: string;
  insightAccent: string;
  spiderGraphBackground: string;
  darkPurple: string;
  midPurple: string;
  lightPurple: string;
  blueContrast: string;
}

interface IWarningColors {
  light: string;
  main: string;
  dark: string;
}

interface IHipoScoresColors {
  hipo1: string;
  hipo2: string;
  hipo3: string;
  hipo4: string;
  hipo5: string;
}

interface ILayout {
  maxContentWidth: number;
  navDrawerWidthClosed: number;
  navDrawerWidthOpen: number;
  headerHeight: number;
  tabsHeight: number;
  listHeaderBarHeight: number;
  footerHeight: number;
  menuDrawerWidth: number;
}

declare module "@material-ui/core/styles/createPalette" {
  /* Adding an extra property to the Palette interface, based on a 'primary' type */
  // tslint:disable-next-line
  interface Palette {
    extra: IExtraColors;
  }

  // tslint:disable-next-line
  interface PaletteOptions {
    extra: IExtraColors;
  }
}

declare module "@material-ui/core/styles/createTypography" {
  /* Adding an extra property to the Palette interface, based on a 'primary' type */
  // tslint:disable-next-line
  interface Typography {
    alternateFontFamily: string;
  }

  // tslint:disable-next-line
  interface TypographyOptions {
    alternateFontFamily: string;
  }
}

declare module "@material-ui/core/styles/createMuiTheme" {
  // tslint:disable-next-line
  interface Theme {
    layout: ILayout;
  }

  // tslint:disable-next-line
  interface ThemeOptions {
    layout: ILayout;
  }
}

/*------------------------------*/
/*        Color Variables       */
/*------------------------------*/
const primaryMain = "#003045";
const primaryLight = "#1d5873";
const secondaryMain = "#00b467";
const secondaryDark = "#00924f";
const insightAccent = "#30a0ea";
const errorMain = "#b00020";
const errorLight = "#f9dbdc";
const textSecondary = "rgba(0, 0, 0, 0.54)";
const contrastText = "#ffffff";
const subtleContrastText = "rgba(255, 255, 255, 0.69)";
const mediumGrey = "#757575";
const lightGrey = "#eef0f3";
const lighterGrey = "#f5f5f5";
const backgroundGrey = "#fafafa";
const lightBlue = "#94bed7";
const defaultBackground = "#fff";
const lightBorder = "rgba(255, 255, 255, 0.32)";
const lightBorderActive = "rgba(255, 255, 255, 0.82)";
const warningLight = "#ffd394";
const warningMain = "#ff9800";
const warningDark = "#f57c00";
const borderColor = "#e0e0e0";
const darkBorderColor = "#cacaca";
const spiderGraphBackground = "rgba(13, 69, 93, 0.5)";
const darkPurple = "#7a00a7";
const midPurple = "#b777ff";
const lightPurple = "#ed9cfd";
const blueContrast = "#4682b4";
const warning = {
  light: warningLight,
  main: warningMain,
  dark: warningDark
};
const hipoScoresColors = {
  hipo1: "#E8D4F8",
  hipo2: "#C3A9F5",
  hipo3: "#9785EB",
  hipo4: "#7655B8",
  hipo5: "#552586"
};

/*------------------------------*/
/*         Font Variables       */
/*------------------------------*/
const poppinsFontFamily = '"Poppins", "Helvetica", "Arial", sans-serif';
const robotoFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

const theme = createMuiTheme({
  layout: {
    navDrawerWidthOpen: 190,
    navDrawerWidthClosed: 72,
    maxContentWidth: 1280,
    headerHeight: 67,
    tabsHeight: 48,
    listHeaderBarHeight: 120,
    footerHeight: 80,
    menuDrawerWidth: 672
  },
  zIndex: {
    drawer: 1050
  },
  spacing: 8,
  palette: {
    extra: {
      default: "white",
      grey: lightGrey,
      mediumGrey,
      lightGrey,
      lighterGrey,
      lightBorder,
      lightBorderActive,
      borderColor,
      darkBorderColor,
      lightBlue,
      warning,
      backgroundGrey,
      subtleContrastText,
      hipoScoresColors,
      insightAccent,
      spiderGraphBackground,
      darkPurple,
      midPurple,
      lightPurple,
      blueContrast
    },
    primary: {
      main: primaryMain,
      light: primaryLight,
      contrastText
    },
    error: {
      main: errorMain,
      light: errorLight
    },
    secondary: {
      main: secondaryMain,
      dark: secondaryDark
    },
    text: {
      secondary: textSecondary
    },
    divider: "#c1c7d0",
    background: {
      default: defaultBackground
    }
  },
  typography: {
    fontFamily: robotoFontFamily,
    alternateFontFamily: poppinsFontFamily,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    allVariants: {
      color: primaryMain
    },
    body1: {
      fontSize: 16,
      letterSpacing: 0.5
    },
    body2: {
      fontSize: 14,
      letterSpacing: 0.25
    },
    h1: {
      fontFamily: poppinsFontFamily,
      fontWeight: 600,
      fontSize: 92,
      letterSpacing: -1.5
    },
    h2: {
      fontFamily: poppinsFontFamily,
      fontWeight: 600,
      fontSize: 57,
      letterSpacing: -0.5
    },
    h3: {
      fontFamily: poppinsFontFamily,
      fontWeight: 600,
      fontSize: 46
    },
    h4: {
      fontFamily: poppinsFontFamily,
      fontWeight: 600,
      fontSize: 32,
      letterSpacing: 0.25
    },
    h5: {
      fontFamily: poppinsFontFamily,
      fontWeight: 600,
      fontSize: 23
    },
    h6: {
      fontFamily: poppinsFontFamily,
      fontWeight: 600,
      fontSize: 19,
      letterSpacing: 0.25
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: 0.15
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: 14,
      letterSpacing: 0.1
    },
    button: {
      fontWeight: 600,
      fontSize: 13,
      textTransform: "uppercase",
      letterSpacing: 1.25
    },
    caption: {
      fontSize: 11,
      letterSpacing: 0.4,
      fontWeight: 600,
      color: textSecondary,
      fontFamily: poppinsFontFamily
    },
    overline: {
      textTransform: "uppercase",
      fontFamily: poppinsFontFamily,
      fontWeight: 200,
      fontSize: 12,
      letterSpacing: 2
    }
  },
  overrides: {
    MuiFormLabel: {
      root: {
        fontFamily: poppinsFontFamily,
        color: textSecondary
      }
    },
    MuiFormHelperText: {
      root: {
        fontFamily: poppinsFontFamily,
        margin: "0 12px 0",
        fontWeight: 500,
        fontSize: 11.4,
        "&$error": {
          margin: "0 12px 0"
        }
      },
      contained: {
        margin: "0 12px 0"
      }
    },
    MuiMenuItem: {
      root: {
        fontFamily: robotoFontFamily,
        fontSize: "16px",
        "&:hover": {
          "& svg": {
            color: primaryMain
          }
        },
        "& svg": {
          color: mediumGrey
        }
      }
    },
    MuiLinearProgress: {
      bar1Determinate: {
        background: secondaryDark
      }
    },
    MuiButton: {
      root: {
        padding: "12px 16px",
        fontSize: "13.4px",
        fontFamily: poppinsFontFamily,
        lineHeight: 1.2,
        borderRadius: 8,
        color: "primaryMain"
      },
      outlined: {
        padding: "11px 16px"
      },
      containedSecondary: {
        color: "white"
      },
      sizeSmall: {
        padding: "6px 16px 4px"
      },
      sizeLarge: {
        padding: "12px 18px"
      }
    },
    MuiSelect: {
      selectMenu: {
        paddingTop: 16,
        paddingBottom: 16
      }
    },
    MuiTab: {
      root: {
        fontFamily: poppinsFontFamily
      }
    },
    MuiChip: {
      root: {
        color: primaryMain,
        borderColor,
        borderRadius: 4,
        height: 27,
        fontFamily: poppinsFontFamily
      },
      label: {
        paddingRight: 8,
        paddingLeft: 8
      },
      avatar: {
        color: primaryMain,
        width: 27,
        height: 27,
        background: "transparent"
      }
    },
    MuiTextField: {
      root: {
        background: "white"
      }
    },
    MuiCard: {
      root: {
        borderRadius: "8px"
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 11
      }
    }
  }
});

export default theme;
