import { Users } from "../shared/interfaces";

const users = require('./users.json');

export function getUsers(): Promise<Users[]> {
  return Promise.resolve(users);
};