import * as express from 'express';
import ChartService from '../services/ChartService';
import { ReqUserDocument } from '../models/User';

const getDailyError = async (req: express.Request, res: express.Response) => {
  try {
    const result = await ChartService.readDailyError(
      req.user as ReqUserDocument,
      req.params.projectId as string,
      req.query.day as string
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

export default { getDailyError };
