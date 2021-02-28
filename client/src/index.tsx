import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CSSObject, Global } from '@emotion/react';

const GLOBAL_STYLES: CSSObject = {
  faces: [
    {
      '@font-face': {
        fontFamily: 'Ubuntu-Regular',
        fontWeight: 'normal',
        src: `url(/fonts/Ubuntu-Regular.ttf)`,
        fontDisplay: 'swap',
      },
    },
  ],

  '*': {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: 'baseline',
    textDecoration: 'none',
    WebkitTapHighlightColor: 'transparent',
    fontFamily: 'Ubuntu-Regular',
    ':focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
  body: {
    fontFamily: 'Ubuntu-Regular',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Global styles={GLOBAL_STYLES} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
