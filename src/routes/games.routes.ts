import { Router, Request, Response } from 'express';

import { GamesRepository } from '../modules/games/repositories/implementations/GamesRepository';

const gamesRoutes = Router();

gamesRoutes.get('/', async (req: Request, res: Response) => {
  const { title } = req.query;

  const gamesRepository = new GamesRepository();
  const games = await gamesRepository.findByTitleContaining(String(title));

  return res.json(games);
});

gamesRoutes.get('/count', async (_req: Request, res: Response) => {
  const gamesRepository = new GamesRepository();
  const count = await gamesRepository.countAllGames();

  return res.json(count);
});

export { gamesRoutes };
