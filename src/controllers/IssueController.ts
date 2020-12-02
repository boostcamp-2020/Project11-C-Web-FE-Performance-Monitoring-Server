import * as express from 'express';
import { IssueDocument } from '../models/Issue';

import * as issueService from '../services/IssueService';

const listAllIssues = async (
  req: express.Request,
  res: express.Response
  // next: express.NextFunction
) => {
  const issueList: IssueDocument[] = await issueService.getAllIssue();
  res.json(issueList);
};

export default { listAllIssues };
