/** @jsxImportSource @emotion/react */
import React from 'react';

interface IMessageProps {
  incoming?: boolean;
  text: string;
}

const Message: React.FC<IMessageProps> = ({ incoming, text }) => {
  return (
    <div>
      <p
        css={{
          backgroundColor: incoming ? '#0140fe' : '#f4f4f4',
          padding: '15px',
          margin: '6px 0',
          color: incoming ? 'white' : 'black',
          width: 'fit-content',
          maxWidth: 200,
          float: incoming ? 'left' : 'right',
          borderRadius: incoming ? '1px 20px 20px' : '20px 20px 1px',
          fontSize: '18px',
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Message;
