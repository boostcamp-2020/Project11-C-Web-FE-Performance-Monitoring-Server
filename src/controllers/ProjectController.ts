import * as express from 'express';
import ProjectService from '../services/ProjectService';

const postProject = async (req: express.Request, res: express.Response) => {
  try {
    const result = await ProjectService.createProject(req.user, req.body);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const getProject = async (req: express.Request, res: express.Response) => {
  try {
    const result = await ProjectService.readProject(
      req.user,
      req.params.projectId
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const deleteProject = async (req: express.Request, res: express.Response) => {
  try {
    const result = await ProjectService.removeProject(
      req.user,
      req.params.projectId
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const postMember = async (req: express.Request, res: express.Response) => {
  try {
    const result = await ProjectService.pushMember(
      req.user,
      req.params.projectId,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

export default { postProject, getProject, deleteProject, postMember };
