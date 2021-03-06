import { DefaultTheme } from 'styled-components';

import { darken, lighten, rgba } from 'polished';

const colors = {
  shadowColor: 'rgba(0, 0, 0, 0.06)',
  secondary: '#8a92a9',
  primary: 'rgb(26,92,255)',
  text: '#2c3e50',
  danger: '#ff4d4f',
  background: '#fff',
  gray: '#eaeaea',
  pure: '#fff',
  lightgray: '#fafafa',
  baseGreen: '#47B881',
  gray1: '#f9fcfd',
  gray2: '#f4f7f8',
  gray3: '#f0f3f4',
  gray4: '#e6e9ea',
};

const theme: DefaultTheme = {
  isMobile: false,
  name: 'BASE',
  enFont: 'Rubik',
  colors,
  fontSizes: [
    12, 14, 16, 18, 24, 32, 48, 64, 72,
  ],
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
  width: {
    wrapper: 1920,
    header: 700,
  },
  height: {
    header: 70,
    footer: 55,
  },
  styles: {
    nprogress: colors.primary,
    box: {
      borderColor: colors.gray,
      background: '#fff',
    },
    link: {
      hover: lighten(0.2, colors.primary),
      active: darken(0.2, colors.primary),
      color: colors.primary,
    },
    input: {
      borderColor: colors.gray2,
      background: colors.gray2,
      shadow: 'transparent',
      disabled: {
        color: colors.gray,
        background: colors.lightgray,
      },
      hover: {
        shadow: rgba(colors.primary, 0.6),
        borderColor: colors.primary,
      },
    },
    collection: {
      background: colors.secondary,
      addPicture: {
        background: '#20305a',
        color: colors.pure,
      },
    },
    notification: {
      read: {
        background: '#fffef1',
      },
    },
    scrollbar: {
      graidient: 'rgba(255,255,255,.9)',
      background: 'rgba(0,0,0,.45)',
      hover: 'rgba(0,0,0,.55)',
      active: 'rgba(0,0,0,.7)',
    },
    picture: {
      shadow: {
        opacity: 1,
      },
    },
    skeleton: {
      accents1: '#fafafa',
      accents2: '#eaeaea',
    },
    popover: {
      boxShadow1: 'rgba(0, 0, 0, 0.12)',
      boxShadow2: 'rgba(0, 0, 0, 0.08)',
      boxShadow3: 'rgba(0, 0, 0, 0.05)',
    },
  },
  layout: {
    header: {
      shadowColor: '#f3f3f4',
      borderWidth: 0,
      borderColor: 'transparent',
      background: '#fff',
      menu: {
        color: colors.secondary,
        hover: {
          color: darken(0.5, colors.secondary),
          background: colors.lightgray,
        },
      },
      logo: colors.primary,
    },
    picture: {
      wrapper: {
        backgroundColor: '#f8fafc',
      },
    },
  },
  mapbox: {
    style: 'yiiu/ck5na49rq0gjk1invjba59xzt',
  },
};

export default theme;
