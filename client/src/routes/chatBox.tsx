/** @jsxImportSource @emotion/react */

import React, { useEffect, useMemo, useState } from 'react';
import { CSSObject } from '@emotion/react';
import Button from '../components/button';
import Input from '../components/input';
import Message from '../components/message';
import { io } from 'socket.io-client';
import { getUserData } from '../common/utils/session';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const MESSAGE_BOX: CSSObject = {
  minWidth: '520px',
  minHeight: '520px',
  background: 'white',
  display: 'flex',
  borderRadius: '10px',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '10px',
};

const CONTROLS: CSSObject = {
  display: 'flex',
  flexDirection: 'row',
  padding: '1rem',
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const INPUT_CONTAINER: CSSObject = { flex: 1, paddingRight: '20px' };

const ChatBox: React.FC = () => {
  const [text, setText] = useState('');
  const [conversationId, setConversationId] = useState('');

  const query = useQuery();
  const history = useHistory();

  const receiver = useMemo(() => {
    return {
      name: query.get('name'),
      id: query.get('id'),
    };
  }, []);

  const userData = useMemo(() => {
    return getUserData();
  }, []);

  const [messages, setMessages] = useState<
    Array<{
      id: string;
      text: string;
      fromId: string;
      toId: string;
    }>
  >([]);

  useEffect(() => {
    const receiverId = query.get('id');
    if (userData && receiverId) {
      const socket = io('http://localhost:8080', {
        transports: ['websocket', 'polling', 'flashsocket'],
        query: {
          userId: userData.id,
          senderId: receiverId,
        },
      });
      socket.connect();

      socket.on('message', (data: any) => {
        setMessages(data);
      });

      socket.on('conversationInit', (_conversationId: string) => {
        setConversationId(_conversationId);
      });

      return () => {
        socket.disconnect();
      };
    } else {
      history.push('/users');
    }
  }, [userData]);

  return (
    <div>
      <h2 css={{ textAlign: 'center', margin: '10px 0 ' }}>{receiver.name}</h2>
      <div css={MESSAGE_BOX}>
        {messages.map((message) => {
          console.log(message);
          console.log(userData.id);
          return <Message key={message.id} text={message.text} incoming={message.fromId === userData.id} />;
        })}
      </div>
      <form
        css={CONTROLS}
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post('/sendMessage', {
            toUserId: query.get('id'),
            fromUserId: userData.id,
            messageText: text,
            conversationId,
          });
          setText('');
        }}
      >
        <div css={INPUT_CONTAINER}>
          <Input
            value={text}
            onChange={(e) => {
              setText(e.currentTarget.value);
            }}
          />
        </div>
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatBox;
