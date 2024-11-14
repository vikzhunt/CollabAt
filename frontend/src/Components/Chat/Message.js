// src/components/Chat/Message.js
import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

const Message = ({ username, text }) => {
  return (
    <ListItem>
      <ListItemText primary={`${username}: ${text}`} />
    </ListItem>
  );
};

export default Message;

