/** @jsxImportSource @emotion/react */

import React, { ButtonHTMLAttributes } from 'react';
import { CSSObject } from '@emotion/react';
import colors from '../common/constants/colors';

interface IInputProps extends ButtonHTMLAttributes<HTMLInputElement> {}

const INPUT_STYLES: CSSObject = {
  backgroundColor: 'white',
  border: '2px solid grey',
  fontFamily: 'Ubuntu-Regular',
  fontSize: 18,
  padding: '0 5px',
  borderRadius: 7,
  height: '46px',
  ':focus': {
    borderRadius: 7,
    border: `2px solid ${colors.PRIMARY}`,
  },
};

const Input: React.FC<IInputProps> = ({ ...props }) => {
  return (
    <label
      css={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '12px',
        textTransform: 'uppercase',
      }}
    >
      <input css={INPUT_STYLES} spellCheck={false} {...props} />
    </label>
  );
};

export default Input;
