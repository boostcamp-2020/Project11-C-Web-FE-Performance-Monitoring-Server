import * as express from 'express';

import issueService from '../services/IssueService';

const listAllIssues = async (
  req: express.Request,
  res: express.Response
  // next: express.NextFunction
) => {
  const issueList = await issueService.getAllIssue();
  res.json(issueList);
};

export default { listAllIssues };
