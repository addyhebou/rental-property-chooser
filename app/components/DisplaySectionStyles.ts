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
