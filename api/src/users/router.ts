import { Router } from "express";
import { StatusCodes } from "../common/status-codes";
import { getUsers } from "./repository";

const router = Router();

router.get('/', async (req, res) => {
  const allUsers = await getUsers();
  return res.json(allUsers);
});

  export default router;