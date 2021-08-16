import { Router, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

import { Game } from '../modules/games/entities/Game';
import { User } from '../modules/users/entities/User';
import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository';

const usersRoutes = Router();

let ormUsersRepository: Repository<User>;
let ormGamesRepository: Repository<Game>;

const usersSeed: User[] = [
  {
    first_name: 'Vinicius',
    last_name: 'Fraga',
    email: 'vinicius.fraga@rocketseat.com.br',
  },
  {
    first_name: 'Danilo',
    last_name: 'Vieira',
    email: 'danilo.vieira@rocketseat.com.br',
  },
  {
    first_name: 'Joseph',
    last_name: 'Oliveira',
    email: 'joseph.oliveira@rocketseat.com.br',
  },
  {
    first_name: 'Daniele',
    last_name: 'Leão',
    email: 'dani.leao@rocketseat.com.br',
  },
] as User[];

const gamesSeed: Pick<Game, 'title'>[] = [
  {
    title: 'Rocket League',
  },
  {
    title: 'The Last Of Us',
  },
  {
    title: 'Need For Speed: Most Wanted',
  },
  {
    title: 'Need For Speed: Payback',
  },
];

usersRoutes.post('/seed', async (_req: Request, res: Response) => {
  ormUsersRepository = getRepository(User);
  ormGamesRepository = getRepository(Game);
  const [RL, TLOU, NFSMW, NFSP] = await ormGamesRepository.save(gamesSeed);
  const [vinicius, danilo, joseph, daniele] = usersSeed;

  vinicius.games = [RL, NFSMW, NFSP];
  danilo.games = [RL, NFSMW, TLOU];
  joseph.games = [RL, NFSMW];
  daniele.games = [NFSMW, NFSP, TLOU];

  await ormUsersRepository.save(usersSeed);

  return res.send();
});

usersRoutes.get('/with-games/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const usersRepository = new UsersRepository();
  const userFound = await usersRepository.findUserWithGamesById({ user_id });

  return res.json(userFound);
});

usersRoutes.get('/asc', async (_req: Request, res: Response) => {
  const usersRepository = new UsersRepository();
  const users = await usersRepository.findAllUsersOrderedByFirstName();

  return res.json(users);
});

usersRoutes.get('/name', async (req: Request, res: Response) => {
  const { first_name, last_name } = req.query;

  const usersRepository = new UsersRepository();
  const userFound = await usersRepository.findUserByFullName({
    first_name: String(first_name),
    last_name: String(last_name),
  });

  return res.json(userFound || null);
});

export { usersRoutes };
