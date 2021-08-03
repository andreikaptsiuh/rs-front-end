import { Router } from "express";
import { StatusCodes } from "../common/status-codes";
import { Cards } from "../shared/interfaces";
import { createCards, deleteCards, getCards, getCardsById } from "./repository";

const router = Router();

router.get('/', async (req, res) => {
  const allCards = await getCards();
  return res.json(allCards);
});

router.get('/:id', async (req, res) => {
  const cardsTypeId = Number(req.params.id);
  if (!cardsTypeId) {
    return res.status(StatusCodes.BadRequest);
  }

  const cardsType = await getCardsById(cardsTypeId);
  if (!cardsType) {
    return res.sendStatus(StatusCodes.NotFound);
  }
  return res.json(cardsType);
});

router.delete('/:id', async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categoryId) {
    return res.status(StatusCodes.BadRequest);
  }
  try {
    await deleteCards(categoryId);
    return res.sendStatus(StatusCodes.Ok);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error);
  }
});

router.post('/', async (req, res) => {
  const data = req.body as Cards;
  if (!data.type) return res.sendStatus(StatusCodes.BadRequest);
  try {
    const newCards = await createCards(data);
    return res.json(newCards);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error);
  }
});

export default router;