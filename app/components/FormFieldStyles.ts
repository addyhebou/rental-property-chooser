import { css } from '@emotion/css';

export const formFieldStyles = css({
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 7,
  display: 'inline-flex',
  width: '100%',

  label: {
    alignSelf: 'stretch',
    color: '#615C5B',
    fontSize: 14,
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  input: {
    // alignSelf: 'stretch',
    padding: 10,
    borderRadius: 6,
    border: '1px #615C5B solid',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    display: 'inline-flex',
    // width: '100%',
    // flex: '1 1 0',
  },
});
