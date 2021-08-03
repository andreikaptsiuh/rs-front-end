export type Card = {
  word: string;
  translation: string;
  img: string;
  audio: string;
  id: number;
};

export interface Cards {
  type: string;
  cards: Card[];
  cover: string;
  href: string;
  key: number;
}

export interface Users {
  login: string;
  password: string;
}