import * as express from 'express';
import * as mongoose from 'mongoose';
import Issue, { IssueDocument } from '../models/Issue';
import * as issueService from '../services/IssueService';

const listAllIssues = async (req: express.Request, res: express.Response) => {
  const issueList: IssueDocument[] = await issueService.getAllIssue();
  res.json(issueList);
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
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);

  const issuelist: IssueDocument[] = await issueService.getIssueListByProjectId(
    projectId
  );
  res.json(issuelist);
};

const issueAssign = async (req: express.Request, res: express.Response) => {
  const issueId = new mongoose.Types.ObjectId(req.body.issueId);
  const { assignee } = req.body;

  const updatedIssue: IssueDocument = await issueService.setAssignee(
    issueId,
    assignee ? new mongoose.Types.ObjectId(assignee) : null
  );
  res.json(updatedIssue);
};
const issueResolvedState = async (
  req: express.Request,
  res: express.Response
) => {
  const issueId = new mongoose.Types.ObjectId(req.body.issueId);
  const { resolved } = req.body;
  const updatedIssue: IssueDocument = await issueService.setResolvedState(
    issueId,
    resolved
  );
  res.json(updatedIssue);
};

export default {
  listAllIssues,
  issueDetail,
  listProjectIssues,
  issueAssign,
  issueResolvedState,
};
