import * as express from 'express';
import { ProjectDocument } from '../models/Project';
import ProjectService from '../services/ProjectService';
import * as mongoose from 'mongoose';

const postProject = async (req: express.Request, res: express.Response) => {
  try {
    const result: ProjectDocument = await ProjectService.createProject(
      req.user,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const getProject = async (req: express.Request, res: express.Response) => {
  try {
    const result: ProjectDocument | any = await ProjectService.readProject(
      req.user,
      req.params.projectId
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const getJoinedProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const result:
      | ProjectDocument
      | any = await ProjectService.readProjectWithPopulate(
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
    const result: ProjectDocument = await ProjectService.removeProject(
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
    const result: ProjectDocument = await ProjectService.pushMember(
      req.user,
      req.params.projectId,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const deleteMember = async (req: express.Request, res: express.Response) => {
  try {
    const result: ProjectDocument = await ProjectService.removeMember(
      req.user,
      req.params.projectId,
      req.params.memberId
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const iniviteMember = async (req: express.Request, res: express.Response) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  const result = await ProjectService.inivteUser(
    new mongoose.Types.ObjectId(projectId),
    new mongoose.Types.ObjectId(userId)
  );

  res.json(result);
};

export default {
  postProject,
  getProject,
  getJoinedProject,
  deleteProject,
  postMember,
  deleteMember,
  iniviteMember,
};
