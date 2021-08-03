import { Cards } from "../shared/interfaces";

const cards = require('./cards.json');

export function getCards(): Promise<Cards[]> {
  return Promise.resolve(cards);
};

export function getCardsById(id: number): Promise<Cards | undefined> {
  const cardsType = cards.find((item: Cards) => item.key === id);
  return Promise.resolve(cardsType)
};

export function deleteCards(id: number): Promise<void> {
  const index = cards.findIndex((item: Cards) => item.key === id);
  if (index < 0) {
    Promise.reject(new Error('Category not found'));
  }
  cards.splice(index, 1);
  return Promise.resolve();
};

const newId = (function() {
  let id = cards.length;
  return () => id++;
})

export function createCards(newCards: Cards): Promise<Cards> {
  const isExist = typeof cards.find((item: Cards) => item.type.toLowerCase() === newCards.type.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Cards with name ${newCards.type} is already exists`));
  }

  const id = newId();
  const model = { ...newCards, id };
  cards.push(model);

  return Promise.resolve(model);
}