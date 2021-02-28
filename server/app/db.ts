export const users: Array<{ id: string; name: string }> = [
  {
    id: '1',
    name: 'John',
  },
  {
    id: '2',
    name: 'Veronica',
  },
];

export const findUser = (name: string) => {
  const existingUser = users.find((user) => {
    if (user.name === name) {
      return true;
    }
    return false;
  });

  return existingUser;
};

export const createUser = (name: string) => {
  const newUser = {
    name,
    id: Math.random().toString(),
  };

  users.push(newUser);
  return newUser;
};

export const conversations: Array<{
  id: string;
  users: Array<string>;
}> = [];

export const messages: {
  [conversationId: string]: Array<{
    id: string;
    fromId: string;
    toId: string;
    text: string;
  }>;
} = {};

export const createMessage = (conversationId: string, text: string, fromId: string, toId: string) => {
  const newMessage = {
    id: Math.random().toString(),
    fromId,
    toId,
    text,
  };

  messages[conversationId].push(newMessage);
  return newMessage;
};

export const creatConversation = (fromId: string, toId: string) => {
  const newConversation = {
    id: Math.random().toString(),
    users: [fromId, toId],
  };
  conversations.push(newConversation);

  return newConversation;
};

export const findConversation = (fromId: string, toId: string) => {
  const existingConversation = conversations.find((conversation) => {
    if (conversation.users.includes(fromId) && conversation.users.includes(toId)) {
      return true;
    }

    return false;
  });

  return existingConversation;
};
