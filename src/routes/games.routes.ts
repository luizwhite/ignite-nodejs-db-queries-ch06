import { Router, Request, Response } from 'express';

import { GamesRepository } from '../modules/games/repositories/implementations/GamesRepository';

const gamesRoutes = Router();

gamesRoutes.get('/', async (req: Request, res: Response) => {
  const { title } = req.query;

  const gamesRepository = new GamesRepository();
  const games = await gamesRepository.findByTitleContaining(String(title));

  return res.json(games);
});

export { gamesRoutes };
