import { css } from '@emotion/css';

export const inputSectionStyles = css({
  paddingInlineStart: '100px',
  paddingBlockStart: '150px',
  flex: '1 1 0px',
  backgroundColor: 'white',
});

export const formStyles = css({
  width: '337px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '14px',
  display: 'inline-flex',
});

export const resetButtonStyles = css({
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid orange',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'orange',
    color: 'white',
  },
});
