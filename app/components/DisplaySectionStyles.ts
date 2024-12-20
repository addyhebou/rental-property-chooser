import { css } from '@emotion/css';

export const displaySectionStyles = css({
  flex: '1 1 0px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',

  h1: {
    margin: '0',
  },

  '.content': {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const offerSectionStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '37%',
  gap: '20px',
  '.offerDetails': {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
});

const rareGreenColor = '#2EBF02';

export const rareFindStyles = css({
  position: 'relative',
  padding: '8px',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: `8px dashed ${rareGreenColor}`,
    animation: 'blinkBorder 0.25s infinite',
    pointerEvents: 'none',
  },

  '@keyframes blinkBorder': {
    '0%, 100%': {
      borderColor: 'transparent',
    },
    '50%': {
      borderColor: rareGreenColor,
    },
  },
});
