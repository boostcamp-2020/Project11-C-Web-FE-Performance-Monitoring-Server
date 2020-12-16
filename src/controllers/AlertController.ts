import * as express from 'express';
import * as mongoose from 'mongoose';
import { AlertDocument } from '../models/Alert';
import AlertService from '../services/AlertService';

const listAlerts = async (req: express.Request, res: express.Response) => {
  const alertDocs: AlertDocument[] = await AlertService.getAlertList(req.user);
  return res.json(alertDocs);
};

export default { listAlerts };
