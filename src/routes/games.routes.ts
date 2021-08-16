import { Router, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

import { Game } from '../modules/games/entities/Game';
import { GamesRepository } from '../modules/games/repositories/implementations/GamesRepository';

const gamesRoutes = Router();

let ormGamesRepository: Repository<Game>;
let gamesRepository: GamesRepository;

gamesRoutes.post('/seed', (req: Request, res: Response) => {
  ormGamesRepository = getRepository(Game);

  return res.send();
});

export { gamesRoutes };
