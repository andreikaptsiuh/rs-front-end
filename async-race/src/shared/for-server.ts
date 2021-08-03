import { allAuto, allWinnersAuto } from './all-auto';

const baseUrl = 'http://127.0.0.1:3000';

const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

// garage
export const getCars = async () : Promise<void> => {
  const response = await fetch(`${baseUrl}${path.garage}`);
  const data = await response.json();

  allAuto.splice(0, allAuto.length);

  allAuto.splice(0, allAuto.length);
  data.forEach((auto: { name: string, color: string, id: number }) => allAuto.push(auto));
};

export const getCar = async (id: number) : Promise<{ name: string, color: string, id: number }> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
};

export const createCar = async (auto: { name: string, color: string }) : Promise<void> => {
  await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auto),
  });
};

export const deleteCar = async (id: number) : Promise<void> => {
  await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
};

export const updateCar = async (auto: { name: string, color: string, id: number }) : Promise<void> => {
  await fetch(`${baseUrl}${path.garage}/${auto.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auto),
  });
};

// winners
export const getWinners = async () : Promise<void> => {
  const response = await fetch(`${baseUrl}${path.winners}`);
  const data = await response.json();

  if (allWinnersAuto.length <= data.length && allWinnersAuto.length === 1) {
    data.forEach((auto: { id: number, wins: number, time: number }) => allWinnersAuto.push(auto));
    allWinnersAuto.shift();
  } else if (allWinnersAuto.length < data.length) {
    data.forEach((auto: { id: number, wins: number, time: number }) => allWinnersAuto.push(auto));
  }
};

export const deleteWinner = async (id: number) : Promise<void> => {
  await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: 'DELETE',
  });
};

export const createWinner = async (winner: { id: number, wins: number, time: number }) : Promise<void> => {
  await fetch(`${baseUrl}${path.winners}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });
};

// racing
export const getRace = async (id: number) : Promise<void> => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=started`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const toDrive = async (id: number) : Promise<void> => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=drive`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
