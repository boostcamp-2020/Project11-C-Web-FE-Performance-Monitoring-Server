import * as express from 'express';
import ProjectService from '../services/ProjectService';

const postProject = async (req: express.Request, res: express.Response) => {
  try {
    const result = await ProjectService.createProject(req.body);
    res.json(result);
  } catch (e) {
    res.json(e);
  }
};

export default { postProject };
