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

const deleteProject = async (req: express.Request, res: express.Response) => {
  try {
    const result = await ProjectService.removeProject(req.params.projectId);
    res.json(result);
  } catch (e) {
    res.json(e);
  }
};

export default { postProject, deleteProject };
