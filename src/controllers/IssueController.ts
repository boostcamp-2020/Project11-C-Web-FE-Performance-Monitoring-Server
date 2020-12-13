import * as express from 'express';
import * as mongoose from 'mongoose';
import Issue, { IssueDocument, IssueResolveStateInfo } from '../models/Issue';
import * as issueService from '../services/IssueService';

const listAllIssues = async (req: express.Request, res: express.Response) => {
  const issueList: IssueDocument[] = await issueService.getAllIssue();
  res.json(issueList);
};
/*
const listAllIssuesWithPagination = async (req: express.Request, res: express.Response) => {
  // 페이지당 issue 개수
  const itemNumPerPage = 10;

  const { page, limit, order, resolved, asignee } = req.query;

  const pageOptions = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(limit as string, 10) || 10,
  }; // order event 개수, 최신순, 오래된순,
  let sortQuery = null;
  switch (order) {
    case 'new':
      sortQuery = { updatedAt: 'desc' };
      break;
    case 'old':
      sortQuery = { updatedAt: 'asc' };
      break;
    case 'event':
      sortQuery = { errorEvents: 'asc' };
      break;
    default:
      sortQuery = { updatedAt: 'desc' };
      break;
  }

  const queryCond = {
    ...(resolved && { resolved: Boolean(resolved) }),
    ...(asignee && { asignee: String(asignee) }),
  };
  console.log(queryCond, pageOptions, sortQuery);

  const resPage: {
    issueDocList: IssueDocument[];
    pageinfo: {
      pageNum: number;
      totalItemNum: number;
    };
  } = await issueService.getIssueListWithPagination(
    pageOptions,
    queryCond,
    sortQuery
  );
  res.json(resPage);
};
*/

const issueDetail = async (req: express.Request, res: express.Response) => {
  const { issueId } = req.params;
  const issue: IssueDocument = await issueService.getIssue(issueId);
  res.json(issue);
};

const listProjectIssues = async (
  req: express.Request,
  res: express.Response
) => {
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);

  const issuelist: IssueDocument[] = await issueService.getIssueListByProjectId(
    projectId
  );
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
  issueDetail,
  listProjectIssues,
  issueAssign,
  issueResolvedState,
};
