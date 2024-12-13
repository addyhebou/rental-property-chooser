import { css } from '@emotion/css';

export const pageStyles = css({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#f8f2f0',
  minHeight: '100vh',

  h1: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#615c5b',
    fontWeight: 400,
    wordWrap: 'break-word',
    fontSize: '40px',
    letterSpacing: '0.8px',
  },

  p: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#615c5b',
    fontWeight: 400,
    wordWrap: 'break-word',
    fontSize: '16px',
  },
});
