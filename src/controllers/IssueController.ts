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
  console.log(issueId);
  const issue: IssueDocument = await issueService.getIssue(issueId);
  res.json(issue);
};

const listProjectIssues = async (
  req: express.Request,
  res: express.Response
) => {
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);

  const issuelist: IssueDocument[] = await issueService.getIssueListOfProject(
    projectId
  );
  res.json(issuelist);
};

export default { listAllIssues, issueDetail, listProjectIssues };
