import React from 'react';

export const Context = React.createContext(false);

export const ShowModal = React.createContext(false);

export const Login = React.createContext(false);

const obj = {
  typeCards: '',
  set: function setType(type: string) {
    this.typeCards = type;
  },
};
export const AdminUpdateCards = React.createContext(obj);
