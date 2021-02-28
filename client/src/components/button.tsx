/** @jsxImportSource @emotion/react */

import React, { ButtonHTMLAttributes } from 'react';
import { CSSObject } from '@emotion/react';
import colors from '../common/constants/colors';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BUTTON_STYLES: CSSObject = {
  position: 'relative',
  boxSizing: 'border-box',
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderRadius: 7,
  height: '3rem',
  minWidth: '5rem',
  padding: '0 1rem',
  color: 'white',
  fontFamily: 'Ubuntu-Regular',
  fontSize: '18px',
  backgroundColor: colors.PRIMARY,
  transition: 'all 0.15s ease-in-out',
  transitionProperty: 'transform, color',
  ':hover': {
    backgroundColor: colors.PRIMARY_HOVER,
  },
  ':active': {
    backgroundColor: colors.PRIMARY_ACTIVE,
    transform: 'scale(0.96)',
  },
};

const Button: React.FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <button css={BUTTON_STYLES} {...props}>
      {children}
    </button>
  );
};

export default Button;
