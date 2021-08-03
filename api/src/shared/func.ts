import { Cards } from "./interfaces";

export async function getCardsFromJson(): Promise<Cards[]> {
    const response = await fetch('./english-cards.json');
    const data = await response.json();
    return data;
};