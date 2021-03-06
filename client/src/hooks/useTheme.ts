import React from 'react'
import { singletonHook } from 'react-singleton-hook'
import { ThemeMode } from 'utils/types'
import { createGlobalStyle, css } from 'styled-components/macro'
import { createMuiTheme, Theme, fade } from '@material-ui/core'
import useUserLocalStorage from './useUserLocalStorage'
import useLocalStorage from './useLocalStorage'

type ButtonThemeColors = Partial<{
  color: string
  text: {
    hoverBackground: string
  }
  outlined: {
    hoverBackground: string
  }
  contained: {
    hoverBackground: string
  }
}>

export type ThemeColors = {
  background: string
  globalNavBackground: string
  contextualNavBackground: string
  pageBackground: string
  whiteBackground: string
  loaderBackground: string
  loaderBarBackground: string
  logoBackground: string
  borderColor: string
  fadedWhite: string
  fadedBlack: string
  textBlack: string
  defaultIconBlack: string
  cardBoxShadow: string
  cardBoxShadow_bottomHeavy: string
  paperBackground: string
  appBar: {
    background: string
  }
  markdown: {
    codeBackground: string
  }
  link: {
    color: string
  }
  error: {
    background: string
  }
  input: {
    background: string
    hoverOutlineColor: string
    dividerColor: string
    boxShadow: string
  }
  button: {
    background: {
      globalNav: ButtonThemeColors
      contextualNav: ButtonThemeColors
      page: ButtonThemeColors
      white: ButtonThemeColors
    }
    color: {
      text: {
        errorColor: string
        errorHoverBackground: string
        successColor: string
        successHoverBackground: string
      }
      contained: {
        errorBackground: string
        errorHoverBackground: string
        successBackground: string
        successHoverBackground: string
      }
    }
  }
  rows: {
    background: {
      white: {
        background: string
        evenBackground: string
        oddBackground: string
      }
    }
  }
  dropOverlay: {
    borderColor: string
    backgroundColor: string
  }
  tag: {
    primaryBackground: string
    primaryColor: string
    secondaryBackground: string
    secondaryColor: string
  }
  dialog: {
    titleBackground: string
    titleColor: string
  }
  postsPage: {
    toggleButtons: {
      inactiveColor: string
    }
  }
  post: {
    backgroundColor: string
    activeBorderColor: string
    editActionRowBackground: string
  }
  moreButton: {
    background: string
    hoverBackground: string
  }
  loveButton: {
    activeColor: string
  }
  commentsButton: {
    activeColor: string
  }
  bookmarkButton: {
    activeColor: string
  }
  friendAddedBadge: {
    backgroundColor: string
    color: string
  }
  breadcrumbs: {
    color: string
  }
  page: {
    background: string
    actionsBackground: string
  }
  addCommentForm: {
    background: string
    textFieldBackground: string
    textFieldActiveBackground: string
  }
  comment: {
    evenBackground: string
    oddBackground: string
    boxShadow: string
    postAuthorLinkColor: string
  }
  countdown: {
    titleColor: string
    fadedTextColor: string
    dateTextColor: string
  }
  themeSlaughter: {
    suggestionBackground: string
    remaingVotesBackground: string
  }
  palette: {
    primary: {
      dark?: string
      main: string
      light?: string
      contrastText?: string
    }
    secondary?: {
      main: string
      contrastText?: string
    }
  }
}

type Themes = {
  light: ThemeColors
  dark: ThemeColors
}

const borderColor = 'rgba(0, 0, 0, 0.22)'
const buttonOutlinedBackgroundColor = 'rgba(0, 0, 0, 0.1)'
const buttonContainedBackgroundColor = 'rgba(0, 0, 0, 0.1)'
const buttonContainedHoverBackgroundColor = 'rgba(0,0,0,0.32)'
const buttonLightBackgroundHoverColor = 'rgba(255,255,255,0.2)'
const buttonContainedColor = 'rgba(0, 0, 0, 0.87)'
const cardBoxShadow = '0 0 6px 0px rgba(0,0,0,0.04)'
const cardBoxShadow_bottomHeavy = '0px 1px 3px -1px rgb(0, 0, 0, 28%)'
const fadedWhite = 'rgba(255,255,255,0.9)'
const fadedBlack = 'rgba(0, 0, 0, 0.44)'
const textBlack = 'rgba(0, 0, 0, 0.87)'
const defaultIconBlack = 'rgba(0, 0, 0, 0.78)'

const commonTheme = {
  textBlack,
  fadedBlack,
  defaultIconBlack,
  cardBoxShadow,
  cardBoxShadow_bottomHeavy,
  dropOverlay: {
    borderColor: 'rgb(32, 208, 0)',
    backgroundColor: 'rgba(72, 208, 15, 0.12)',
  },
} as const

// https://coolors.co/13293d-006494-058ed9-3fa6de-6ab8e2-004567-eaebed-f9f9ff-fdffff
// With darks https://coolors.co/13293d-f87060-f74e3b-67d6c6-33c1ac-ee5533-ed431d-33af00-288f00
const styleVariables = {
  prussianBlue: 'rgb(19, 41, 61)',
  indigoDye: 'rgb(0, 69, 103)',
  sapphireBlue: 'rgb(0, 100, 148)',
  greenBlue: 'rgb(5, 142, 217)',
  carolinaBlue: 'rgb(63, 166, 222)',
  bittersweet: 'rgb(248, 112, 96)',
  bittersweetDark: 'rgb(247, 78, 59)',
  red: 'rgb(255, 59, 78)',
  redDark: 'rgb(210, 42, 58)',
  green: 'rgb(103, 214, 158)',
  greenDark: 'rgb(80, 177, 128)',
  greenShade: 'rgb(103, 214, 198)',
  greenShadeDark: 'rgb(51, 193, 172)',
  aliceBlue: 'rgb(229, 233, 239)',
  cultured: 'rgb(238, 242, 247)',
  ghostWhite: 'rgb(249, 249, 255)',
  white: 'rgb(253, 255, 255)',
  boxShadow: {
    light: 'rgba(255, 255, 255, 0.25)',
  },
} as const

const lightTheme: ThemeColors = {
  ...commonTheme,
  background: styleVariables.aliceBlue,
  globalNavBackground: styleVariables.sapphireBlue,
  contextualNavBackground: styleVariables.greenBlue,
  pageBackground: styleVariables.cultured,
  whiteBackground: styleVariables.white,
  loaderBackground: 'rgba(0, 0, 0, 0.166)',
  loaderBarBackground: 'rgba(0, 0, 0, 0.166)',
  logoBackground: styleVariables.indigoDye,
  fadedWhite,
  fadedBlack,
  borderColor,
  paperBackground: styleVariables.white,
  appBar: {
    background: styleVariables.sapphireBlue,
  },
  markdown: {
    codeBackground: 'rgba(64, 75, 86, 0.15)',
  },
  link: {
    color: styleVariables.greenBlue,
  },
  error: {
    background: styleVariables.bittersweet,
  },
  input: {
    background: styleVariables.cultured,
    hoverOutlineColor: styleVariables.greenBlue,
    dividerColor: styleVariables.white,
    boxShadow: cardBoxShadow_bottomHeavy,
  },
  button: {
    background: {
      globalNav: {
        color: styleVariables.cultured,
        text: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        outlined: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        contained: {
          hoverBackground: buttonContainedHoverBackgroundColor,
        },
      },
      contextualNav: {
        color: styleVariables.cultured,
        text: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        outlined: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        contained: {
          hoverBackground: buttonContainedHoverBackgroundColor,
        },
      },
      page: {},
      white: {},
    },
    color: {
      text: {
        errorColor: styleVariables.red,
        errorHoverBackground: 'rgb(255, 59, 78, 21%)',
        successColor: 'rgb(73, 191, 131)',
        successHoverBackground: 'rgb(73, 191, 131, 26%)',
      },
      contained: {
        errorBackground: styleVariables.red,
        errorHoverBackground: styleVariables.redDark,
        successBackground: styleVariables.green,
        successHoverBackground: styleVariables.greenDark,
      },
    },
  },
  rows: {
    background: {
      white: {
        background: styleVariables.cultured,
        evenBackground: 'rgb(232, 247, 255)',
        oddBackground: 'rgb(207, 238, 255)',
      },
    },
  },
  tag: {
    primaryBackground: styleVariables.greenBlue,
    primaryColor: styleVariables.white,
    secondaryBackground: styleVariables.bittersweet,
    secondaryColor: textBlack,
  },
  dialog: {
    titleBackground: styleVariables.greenBlue,
    titleColor: styleVariables.white,
  },
  postsPage: {
    toggleButtons: {
      inactiveColor: buttonContainedColor,
    },
  },
  post: {
    backgroundColor: styleVariables.white,
    activeBorderColor: styleVariables.greenBlue,
    editActionRowBackground: styleVariables.greenBlue,
  },
  loveButton: {
    activeColor: styleVariables.bittersweet,
  },
  commentsButton: {
    activeColor: styleVariables.greenBlue,
  },
  bookmarkButton: {
    activeColor: styleVariables.greenShade,
  },
  friendAddedBadge: {
    backgroundColor: styleVariables.bittersweet,
    color: styleVariables.white,
  },
  moreButton: {
    background: styleVariables.white,
    hoverBackground: styleVariables.cultured,
  },
  breadcrumbs: {
    color: textBlack,
  },
  page: {
    background: styleVariables.white,
    actionsBackground: styleVariables.white,
  },
  addCommentForm: {
    background: styleVariables.greenBlue,
    textFieldBackground: styleVariables.cultured,
    textFieldActiveBackground: styleVariables.white,
  },
  comment: {
    evenBackground: styleVariables.cultured,
    oddBackground: 'rgba(75,80,97,0.17)',
    boxShadow: cardBoxShadow,
    postAuthorLinkColor: styleVariables.greenBlue,
  },
  countdown: {
    titleColor: styleVariables.white,
    fadedTextColor: 'rgba(255,255,255,0.9)',
    dateTextColor: 'rgba(255,255,255,0.65)',
  },
  themeSlaughter: {
    suggestionBackground: styleVariables.cultured,
    remaingVotesBackground: styleVariables.greenBlue,
  },
  palette: {
    primary: {
      dark: styleVariables.sapphireBlue,
      main: styleVariables.greenBlue,
      light: styleVariables.carolinaBlue,
      contrastText: styleVariables.white,
    },
    secondary: {
      main: styleVariables.bittersweet,
      contrastText: styleVariables.white,
    },
  },
}

// https://coolors.co/1f2429-6f7984-a0a5ae-d0d0d8-eef2f7-00af54-f79122-ffcc11-ee5533-2288f7
// With darks https://coolors.co/13293d-f87060-f74e3b-67d6c6-33c1ac-ee5533-ed431d-33af00-288f00
const ldStyleVariables = {
  raisinBlack: 'rgb(31, 36, 41)',
  slateGray: 'rgb(111, 121, 132)',
  metalicSilver: 'rgb(160, 165, 174)', // secondary color to lightGray, not to be used often
  lightGray: 'rgb(208, 208, 216)',
  cultured: 'rgb(238, 242, 247)',
  darkOrange: 'rgb(247, 145, 34)',
  sunglow: 'rgb(255, 204, 17)',
  portlandOrange: 'rgb(238, 85, 51)',
  portlandOrangeDark: 'rgb(237, 67, 29)',
  red: 'rgb(228, 27, 27)',
  redDark: 'rgb(185, 23, 23)',
  blueDeFrance: 'rgb(34, 136, 247)',
  green: 'rgb(102, 204, 34)',
  greenDark: 'rgb(79, 165, 23)',
  blueGreen: 'rgb(0, 210, 152)',
  blueGreenDark: 'rgb(0, 184, 132)',
  white: 'rgb(253, 255, 255)',
  boxShadow: {
    light: 'rgba(255, 255, 255, 0.25)',
  },
} as const

const darkTheme: ThemeColors = {
  ...commonTheme,
  background: ldStyleVariables.slateGray,
  globalNavBackground: ldStyleVariables.portlandOrange,
  contextualNavBackground: ldStyleVariables.raisinBlack,
  pageBackground: ldStyleVariables.cultured,
  whiteBackground: ldStyleVariables.white,
  loaderBackground: ldStyleVariables.portlandOrange,
  loaderBarBackground: ldStyleVariables.darkOrange,
  logoBackground: '',
  fadedWhite,
  fadedBlack,
  borderColor,
  paperBackground: styleVariables.cultured,
  appBar: {
    background: ldStyleVariables.portlandOrange,
  },
  markdown: {
    codeBackground: 'rgba(64, 75, 86, 0.11)',
  },
  link: {
    color: ldStyleVariables.darkOrange,
  },
  error: {
    background: styleVariables.bittersweet,
  },
  input: {
    background: ldStyleVariables.white,
    hoverOutlineColor: ldStyleVariables.portlandOrange,
    dividerColor: ldStyleVariables.lightGray,
    boxShadow: cardBoxShadow_bottomHeavy,
  },
  button: {
    background: {
      globalNav: {
        color: ldStyleVariables.white,
        text: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        outlined: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        contained: {
          hoverBackground: buttonContainedHoverBackgroundColor,
        },
      },
      contextualNav: {
        color: ldStyleVariables.white,
        text: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        outlined: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        contained: {
          hoverBackground: buttonContainedHoverBackgroundColor,
        },
      },
      page: {
        color: ldStyleVariables.white,
        text: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        outlined: {
          hoverBackground: buttonLightBackgroundHoverColor,
        },
        contained: {
          hoverBackground: buttonContainedHoverBackgroundColor,
        },
      },
      white: {
        color: undefined,
        contained: {
          hoverBackground: buttonContainedHoverBackgroundColor,
        },
      },
    },
    color: {
      text: {
        errorColor: ldStyleVariables.red,
        errorHoverBackground: 'rgb(228, 27, 27, 18%)',
        successColor: 'rgb(85, 177, 24)',
        successHoverBackground: 'rgb(102, 204, 34, 23%)',
      },
      contained: {
        errorBackground: ldStyleVariables.red,
        errorHoverBackground: ldStyleVariables.redDark,
        successBackground: ldStyleVariables.green,
        successHoverBackground: ldStyleVariables.greenDark,
      },
    },
  },
  rows: {
    background: {
      white: {
        background: 'white',
        evenBackground: 'white',
        oddBackground: 'rgb(224, 232, 243)',
      },
    },
  },
  tag: {
    primaryBackground: ldStyleVariables.portlandOrange,
    primaryColor: ldStyleVariables.white,
    secondaryBackground: ldStyleVariables.darkOrange,
    secondaryColor: textBlack,
  },
  dialog: {
    titleBackground: ldStyleVariables.darkOrange,
    titleColor: ldStyleVariables.white,
  },
  postsPage: {
    toggleButtons: {
      inactiveColor: 'white ',
    },
  },
  post: {
    backgroundColor: ldStyleVariables.cultured,
    activeBorderColor: ldStyleVariables.portlandOrange,
    editActionRowBackground: ldStyleVariables.portlandOrange,
  },
  moreButton: {
    background: ldStyleVariables.cultured,
    hoverBackground: ldStyleVariables.lightGray,
  },
  loveButton: {
    activeColor: ldStyleVariables.portlandOrange,
  },
  commentsButton: {
    activeColor: ldStyleVariables.darkOrange,
  },
  bookmarkButton: {
    activeColor: ldStyleVariables.blueGreen,
  },
  friendAddedBadge: {
    backgroundColor: ldStyleVariables.portlandOrange,
    color: ldStyleVariables.white,
  },
  breadcrumbs: {
    color: styleVariables.white,
  },
  page: {
    background: ldStyleVariables.cultured,
    actionsBackground: ldStyleVariables.cultured,
  },
  addCommentForm: {
    background: ldStyleVariables.portlandOrange,
    textFieldBackground: ldStyleVariables.white,
    textFieldActiveBackground: ldStyleVariables.white,
  },
  comment: {
    evenBackground: ldStyleVariables.white,
    oddBackground: 'rgba(75,80,97,0.17)',
    boxShadow: cardBoxShadow,
    postAuthorLinkColor: ldStyleVariables.darkOrange,
  },
  countdown: {
    titleColor: 'rgba(255, 255, 255, 0.9)',
    fadedTextColor: 'rgba(255,255,255,0.85)',
    dateTextColor: 'rgba(255,255,255,0.5)',
  },
  themeSlaughter: {
    suggestionBackground: 'white',
    remaingVotesBackground: ldStyleVariables.blueDeFrance,
  },
  palette: {
    primary: {
      // dark: ldStyleVariables.raisinBlack,
      main: ldStyleVariables.slateGray,
      // light: ldStyleVariables.lightGray,
      contrastText: ldStyleVariables.white,
    },
    secondary: {
      main: ldStyleVariables.portlandOrange,
    },
  },
}

const themes: Themes = {
  light: lightTheme,
  dark: darkTheme,
} as const

const defaultTheme = createMuiTheme({
  shape: {
    borderRadius: 8,
  },
})

const muiThemeGenerator = ({ themeMode }: { themeMode: ThemeMode }) => {
  const selectedThemeColors = themes[themeMode]

  return createMuiTheme({
    ...defaultTheme,
    palette: {
      ...selectedThemeColors.palette,
      action: {
        hoverOpacity: 0.2,
      },
    },
    typography: {
      fontSize: 16,
      fontFamily: [
        // 'Ubuntu',
        // 'Roboto',
        // 'Mukta',
        'Oxygen',
        '"Baloo Paaji 2"',
      ].join(','),
      h1: {
        fontSize: '2.6rem',
      },
      h2: {
        fontSize: '2.1rem',
      },
      h3: {
        fontSize: '1.75rem',
      },
      h4: {
        fontSize: '1.5rem',
      },
      h5: {
        fontSize: '1.25rem',
      },
      h6: {
        fontSize: '1rem',
      },
      body1: {
        fontSize: '1rem',
      },
    },
    props: {
      MuiTextField: {
        variant: 'filled',
        InputProps: {
          disableUnderline: true,
        },
      },
      MuiInput: {
        disableUnderline: true,
      },
      MuiFilledInput: {
        disableUnderline: true,
      },
      MuiButton: {
        disableElevation: true,
      },
      MuiMenu: {
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
    },
    overrides: {
      MuiToolbar: {
        gutters: {
          paddingLeft: defaultTheme.spacing(1),
          paddingRight: defaultTheme.spacing(1),
          [defaultTheme.breakpoints.up('sm')]: {
            paddingLeft: defaultTheme.spacing(2),
            paddingRight: defaultTheme.spacing(2),
          },
        },
      },
      MuiMenu: {
        paper: {
          minWidth: 150,
        },
      },
      MuiButton: {
        root: {
          textTransform: 'none',
          transition: 'none',
          color: 'rgba(0, 0, 0, 0.78)',
          // '&:hover': {
          //   backgroundColor: 'rgba(0, 0, 0, 0.19)',
          // },
        },
        outlined: {
          backgroundColor: buttonOutlinedBackgroundColor,
        },
        contained: {
          backgroundColor: buttonContainedBackgroundColor,
          // '&:hover': {
          //   backgroundColor: 'rgba(0, 0, 0, 0.2)',
          // },
        },
        // iconSizeLarge: {
        //   '& > *:first-child': {
        //     fontSize: '1.625rem',
        //   },
        // },
        sizeSmall: {
          padding: '3px 0.75rem',
        },
        text: {
          padding: '6px 16px',
        },
      },
      // @ts-ignore
      MuiToggleButton: {
        root: {
          textTransform: 'none',
        },
      },
      MuiBreadcrumbs: {
        root: {
          color: selectedThemeColors.breadcrumbs.color,
        },
      },
      MuiDialogTitle: {
        root: {
          background: selectedThemeColors.dialog.titleBackground,
          color: selectedThemeColors.dialog.titleColor,
        },
      },
      MuiDialogContent: {
        root: {
          paddingTop: 16,
        },
      },
      MuiDrawer: {
        paper: {
          background: selectedThemeColors.paperBackground,
        },
      },
      MuiTab: {
        root: {
          textTransform: 'none',
        },
        textColorInherit: {
          opacity: 1,
        },
      },
      MuiTabs: {
        root: {
          boxShadow: '0 2px 3px 0px #0000001f',
          borderBottom: '1px solid #00000021',
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      },
      MuiIconButton: {
        root: {
          transition: 'none',
          color: 'rgba(0, 0, 0, 0.78)',
          borderRadius: defaultTheme.shape.borderRadius,
          padding: 6,
        },
        // sizeSmall: {
        //   padding: 2,
        // },
      },
      MuiListItem: {
        button: {
          transition: 'none',
          '&:hover': {
            backgroundColor: buttonOutlinedBackgroundColor,
          },
        },
      },
      MuiLinearProgress: {
        root: {
          height: 112,
          borderRadius: defaultTheme.shape.borderRadius,
        },
        colorPrimary: {
          backgroundColor: selectedThemeColors.loaderBackground,
        },
        barColorPrimary: {
          backgroundColor: selectedThemeColors.loaderBarBackground,
        },
      },
      MuiTextField: {
        root: {
          '& input': {
            padding: '27px 12px 8px',
          },
        },
      },
      MuiInputBase: {
        root: {
          boxShadow: selectedThemeColors.input.boxShadow,
        },
        input: {
          '&::placeholder': {
            color: fadedBlack,
            opacity: 1,
          },
        },
      },
      MuiInput: {
        root: {
          border: '1px solid #e2e2e1',
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: '#fcfcfb',
          transition: 'none',
          '&:hover': {
            backgroundColor: '#fff',
          },
          '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${fade(
              defaultTheme.palette.primary.main,
              0.25
            )} 0 0 0 2px`,
            borderColor: defaultTheme.palette.primary.main,
          },
        },
      },
      MuiFilledInput: {
        root: {
          borderRadius: defaultTheme.shape.borderRadius,
          backgroundColor: selectedThemeColors.input.background,
          transition: 'none',
          '&:hover': {
            backgroundColor: selectedThemeColors.input.background,
            boxShadow: `0 0 0 2px ${selectedThemeColors.input.hoverOutlineColor}`,
          },
          '&$focused': {
            backgroundColor: selectedThemeColors.input.background,
            boxShadow: `0 0 0 4px ${selectedThemeColors.input.hoverOutlineColor}`,
          },
        },
        input: {
          padding: '12px',
        },
        multiline: {
          padding: '12px',
        },
      },
      MuiInputLabel: {
        filled: {
          // fontSize: '1.4rem',
          transform: 'translate(12px, 17px) scale(1)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(12px, 8px) scale(0.7)',
          },
        },
      },
      MuiSelect: {
        selectMenu: {
          // padding: '27px 12px 10px',
          padding: '12px 12px 12px',
        },
        select: {
          '&:focus': {
            backgroundColor: 'none',
          },
        },
        filled: {
          '&&': {
            paddingRight: 36,
          },
        },
        icon: {
          top: 'calc(50% - 14px)',
        },
      },
    },
  })
}

const muiTheme = muiThemeGenerator({ themeMode: 'light' })

const scThemeGenerator = ({
  themeColors,
  selectedMuiTheme,
}: {
  themeColors: ThemeColors
  selectedMuiTheme: Theme
}) => ({
  ...selectedMuiTheme,
  styleVariables,
  ldStyleVariables,
  themeColors,
  buttonRootBackgroundColor: buttonOutlinedBackgroundColor,
  buttonContainedBackgroundColor,
  // prettier-ignore
  layout: {
    1: '0.125rem',   // 2
    2: '0.25rem',    // 4
    3: '0.5rem',     // 8
    4: '0.75rem',    // 12
    5: '1rem',       // 16
    6: '1.5rem',     // 24
    7: '2rem',       // 32
    8: '2.5rem',     // 40
    9: '3rem',       // 48
  } as const
})

const scTheme = scThemeGenerator({
  themeColors: themes.light,
  selectedMuiTheme: muiTheme,
})

type ScThemeType = typeof scTheme

declare module 'styled-components/macro' {
  export interface DefaultTheme extends ScThemeType {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends ScThemeType {}
}

export const ICON_SCALING = [
  {
    name: 'EditIcon',
    base: 0.86,
  },
  {
    name: 'ChrevronLeft',
    base: 1.2,
  },
  {
    name: 'FavoriteRoundedIcon',
    base: 0.85,
  },
  {
    name: 'FavoriteBorderRoundedIcon',
    base: 0.85,
  },
  {
    name: 'BookmarkBorderIcon',
    base: 0.95,
  },
  {
    name: 'BookmarkIcon',
    base: 0.95,
  },
  {
    name: 'ModeCommentIcon',
    base: 0.83,
  },
  {
    name: 'ModeCommentOutlinedIcon',
    base: 0.83,
  },
  {
    name: 'ExpandMoreIcon',
    base: 1.2,
  },
  {
    name: 'ExpandLessIcon',
    base: 1.2,
  },
  {
    name: 'CheckCircleIcon',
    base: 0.8,
  },
  {
    name: 'RadioButtonUncheckedIcon',
    base: 0.8,
  },
  {
    name: 'RadioButtonCheckedIcon',
    base: 0.8,
  },
  {
    name: 'EventIcon',
    base: 0.85,
  },
  {
    name: 'ScheduleIcon',
    base: 0.8,
  },
  {
    name: 'EmojiObjectsOutlinedIcon',
    base: 1,
  },
  {
    name: 'CloseIcon',
    base: 1,
  },
  {
    name: 'FlagIcon',
    base: 0.9,
  },
  {
    name: 'SortIcon',
    base: 1,
  },
  {
    name: 'SearchIcon',
    base: 0.9,
  },
]

const globalStyleGenerator = ({
  themeColors,
}: {
  themeColors: ThemeColors
}) => {
  return createGlobalStyle`
    html {}

    body {
      background: ${themeColors.background};
    }
  
    hr {
      border-color: ${borderColor};
    }
  
    a {
      color: ${themeColors.link.color};

      &:hover {
        font-weight: 500;
      }
    }

    .MuiSvgIcon-root path {
      transform-origin: 50% 50%;
    }

    ${ICON_SCALING.map(
      (iconScaling) => css`
      [data-icon="${iconScaling.name}"] path {
        transform: scale(${iconScaling.base});
      }
    `
    )}

    [data-icon^="Chevron"]{
      path {
        transform: scale(1.2);
      }
    }
  `
}

type UseThemeReturnType = {
  themeMode: ThemeMode
  toggleTheme: () => void
  scTheme: any
  muiTheme: any
  GlobalStyle: any
}

const init: UseThemeReturnType = {
  themeMode: 'light',
  toggleTheme: () => {},
  scTheme: null,
  muiTheme: null,
  GlobalStyle: null,
}

// Port 9009 is used for storybook. We don't want to use user storage for storybook since it uses token/api/etc
const useLocalStorageHook =
  window.location.pathname === '/iframe.html'
    ? useLocalStorage
    : useUserLocalStorage

export const useTheme = singletonHook(init, () => {
  const [themeMode, setThemeMode] = useLocalStorageHook<ThemeMode>(
    'themeMode',
    'dark'
  )

  const toggleTheme = React.useCallback(() => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }, [themeMode, setThemeMode])

  const selectedMuiTheme = React.useMemo(
    () => muiThemeGenerator({ themeMode }),
    [themeMode]
  )
  const selectedScTheme = React.useMemo(
    () =>
      scThemeGenerator({ themeColors: themes[themeMode], selectedMuiTheme }),
    [selectedMuiTheme, themeMode]
  )

  const GlobalStyle = globalStyleGenerator({
    themeColors: themes[themeMode],
  })

  return {
    themeMode,
    toggleTheme,
    scTheme: selectedScTheme,
    muiTheme: selectedMuiTheme,
    GlobalStyle,
  }
})
