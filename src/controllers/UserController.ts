import * as express from 'express';
import UserService from '../services/UserService';

const getUser = async (req: express.Request, res: express.Response) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.json(err);
  }
};

const getProjects = async (req: express.Request, res: express.Response) => {
  try {
    const result: {} = await UserService.readProjects(req.user);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

export default { getUser, getProjects };
