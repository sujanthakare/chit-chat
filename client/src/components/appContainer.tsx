/** @jsxImportSource @emotion/react */
import { CSSObject } from '@emotion/react';
import React from 'react';
import useBrowserValidator from '../common/hooks/useChromeValidator';

const CONTAINER: CSSObject = {
  width: '100%',
  height: '100vh',
  backgroundColor: '#002845',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const BOX: CSSObject = {
  minWidth: '520px',
  minHeight: '520px',
  background: 'white',
  display: 'flex',
  borderRadius: '10px',
  flexDirection: 'column',
};

const AppContainer: React.FC = ({ children }) => {
  const { isValid, isValidating } = useBrowserValidator();

  if (isValidating) {
    return <h2>Checking your chrome version</h2>;
  }

  if (!isValid) {
    return <h2>It looks like either you are not using chrome or your chrome is outdated</h2>;
  }

  return (
    <div css={CONTAINER}>
      <div css={BOX}>{children}</div>
    </div>
  );
};

export default AppContainer;
