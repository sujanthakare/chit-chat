/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { CSSObject } from '@emotion/react';
import Input from '../components/input';
import Button from '../components/button';
import axios from 'axios';
import { getUserData, saveUserData } from '../common/utils/session';
import { useHistory } from 'react-router-dom';

const BOX: CSSObject = {
  display: 'flex',
  padding: 10,
  margin: 'auto 0',
  flexDirection: 'column',
  justifyContent: 'center',
};

const Entry: React.FC = () => {
  const history = useHistory();
  const [text, setText] = useState('');

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      history.push('/users');
    }
  }, []);

  return (
    <form
      css={BOX}
      onSubmit={async (e) => {
        e.preventDefault();
        if (text) {
          const response = await axios.post('/enter', {
            name: text,
          });

          saveUserData(response.data);
          history.push('/users');
        }
      }}
    >
      <h2
        css={{
          textAlign: 'center',
          padding: '0 0 50px 0px',
        }}
      >
        Start chit chatting
      </h2>
      <Input
        placeholder="Enter your name?"
        value={text}
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
      />
      <Button css={{ marginTop: 20, width: '100%' }} type="submit">
        Enter
      </Button>
    </form>
  );
};

export default Entry;
