import { Cards, Users } from './interfaces';

const baseUrl = 'https://boiling-anchorage-44305.herokuapp.com';
const path = {
  cards: '/cards',
  users: '/users',
};

export const getCardsFromApi = async (): Promise<Cards[]> => {
  const response = await fetch(`${baseUrl}${path.cards}`);
  const data = await response.json();

  return data;
};

export const loginUser = async (log: string, pass: string): Promise<boolean> => {
  const response = await fetch(`${baseUrl}${path.users}`);
  const data = await response.json();

  const res: Users = data.find((user: Users) => user.login === log && user.password === pass);

  return !!res;
};
