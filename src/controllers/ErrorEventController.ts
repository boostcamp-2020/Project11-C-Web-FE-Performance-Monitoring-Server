import * as express from 'express';
import ErrorEvent, { ErrorEventDocument } from '../models/ErrorEvent';
import errorEventService from '../services/ErrorEventService';
import issueService from '../services/IssueService';

const collectErrorEvent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
  // next: express.NextFunction
) => {
  const data = req.body;

  try {
    const result = await errorEventService.saveErrorEvent(data);
    const processResult = await issueService.addErrorEventToISsue(result);
    res.json(processResult);
    console.log(processResult);
  } catch (err) {
    res.json(err);
  }
  // next();
};

const getAllErrorEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const ErrorEventList: ErrorEventDocument[] = await ErrorEvent.find().exec();
    res.json(ErrorEventList);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

export default { collectErrorEvent, getAllErrorEvents };
