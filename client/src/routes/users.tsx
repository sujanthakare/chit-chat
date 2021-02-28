/** @jsxImportSource @emotion/react */

import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserData } from '../common/utils/session';

const Users: React.FC = () => {
  const history = useHistory();
  const userData = getUserData();

  const [users, setUsers] = useState<
    Array<{
      name: string;
      id: string;
    }>
  >([]);

  useEffect(() => {
    console.log(userData);
    if (!userData) {
      history.push('/');
    } else {
      const getUsers = async () => {
        const response = await axios.get('/users', {
          headers: {
            userId: userData.id,
          },
        });
        setUsers(response.data);
      };

      getUsers();
    }
  }, []);

  return (
    <div css={{ padding: 5, display: 'flex', flexDirection: 'column' }}>
      <h2
        css={{
          margin: '20px 0',
          textAlign: 'center',
        }}
      >
        Users
      </h2>
      {users.map((user) => {
        return (
          <button
            key={user.id}
            onClick={() => {
              history.push(`/chat?id=${user.id}&name=${user.name}`);
            }}
            css={{
              padding: 10,
              margin: 5,
              display: 'block',
              textAlign: 'left',
            }}
          >
            <h2>{user.name}</h2>
          </button>
        );
      })}
    </div>
  );
};

export default Users;
