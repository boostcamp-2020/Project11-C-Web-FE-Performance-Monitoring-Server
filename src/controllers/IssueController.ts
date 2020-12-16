import * as express from 'express';
import * as mongoose from 'mongoose';
import { IssueDocument, IssueResolveStateInfo } from '../models/Issue';
import * as issueService from '../services/IssueService';
import UserService from '../services/UserService';

const listAllIssues = async (req: express.Request, res: express.Response) => {
  const issueList: IssueDocument[] = await issueService.getAllIssue();
  res.json(issueList);
};

const getProjectIssuesWitPagination = async (
  req: express.Request,
  res: express.Response
) => {
  const { projectId } = req.params;
  const { page, limit, order, resolved, asignee } = req.query;

  const pageOptions = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(limit as string, 10) || 20,
  }; // order event 개수, 최신순, 오래된순,
  let sortQuery = null;
  switch (order) {
    case 'new':
      sortQuery = { updatedAt: 'desc' };
      break;
    case 'old':
      sortQuery = { updatedAt: 'asc' };
      break;
    case 'eventdesc':
      sortQuery = { errorcnt: -1 };
      break;
    case 'eventasc':
      sortQuery = { errorcnt: 1 };
      break;
    default:
      sortQuery = { updatedAt: 'desc' };
      break;
  }

  const queryCond = {
    projectId: new mongoose.Types.ObjectId(projectId),
    ...(resolved && { resolved: Boolean(resolved) }),
    ...(asignee && { asignee: String(asignee) }),
  };

  const options: mongoose.PaginateOptions = {
    page: pageOptions.page,
    limit: pageOptions.limit,
    sort: sortQuery,
  };

  const result = await issueService.getIssueListWithPagination(
    queryCond,
    options
  );

  res.json(result);
};

const issueDetail = async (req: express.Request, res: express.Response) => {
  const { issueId } = req.params;
  const issue: IssueDocument = await issueService.getIssue(issueId);
  res.json(issue);
};

const listProjectIssues = async (
  req: express.Request,
  res: express.Response
) => {
  const { projectId } = req.params;
  const { userId } = req.user as any;

  let projectObjId =
    projectId === 'undefined' || !projectId
      ? null
      : new mongoose.Types.ObjectId(projectId);

  if (!projectObjId) {
    projectObjId = await (await UserService.findUser(userId)).recentProject;
  }

  const issuelist: IssueDocument[] = await issueService.getIssueListByProjectId(
    projectObjId
  );

  await UserService.updateRecentProject(req.user, projectObjId);

  res.json(issuelist);
};

const issueAssign = async (req: express.Request, res: express.Response) => {
  const issueId = new mongoose.Types.ObjectId(req.body.issueId);
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);
  const { assignee } = req.body;

  const updatedIssue: IssueDocument = await issueService.setAssignee(
    projectId,
    issueId,
    assignee ? new mongoose.Types.ObjectId(assignee) : null
  );
  res.json(updatedIssue);
};

const issueResolvedState = async (
  req: express.Request,
  res: express.Response
) => {
  const resolveStateInfo: IssueResolveStateInfo = req.body;

  const updateRes: any = await issueService.setResolvedState(resolveStateInfo);

  res.json(updateRes);
};

export default {
  listAllIssues,
  getProjectIssuesWitPagination,
  issueDetail,
  listProjectIssues,
  issueAssign,
  issueResolvedState,
};
