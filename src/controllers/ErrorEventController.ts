import * as express from 'express';
import * as mongoose from 'mongoose';
import { ErrorEventDocument } from '../models/ErrorEvent';
import * as errorEventService from '../services/ErrorEventService';
import * as issueService from '../services/IssueService';

const collectErrorEvent = async (
  req: express.Request,
  res: express.Response
  // next: express.NextFunction
) => {
  const { projectId } = req.params;
  const data = { ...req.body, projectId };
  try {
    const newErrorEvent: ErrorEventDocument = await errorEventService.saveErrorEvent(
      data
    );
    await issueService.addErrorEventToISsue(newErrorEvent);
    res.json({ result: true });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

const getAllErrorEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const ErrorEventList: ErrorEventDocument[] = await errorEventService.getAllErrorEvent();
    res.json(ErrorEventList);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

const getErrorEvent = async (req: express.Request, res: express.Response) => {
  try {
    const { errorEventId } = req.params;
    const errorEvent: ErrorEventDocument = await errorEventService.getErrorEvent(
      errorEventId
    );
    res.json(errorEvent);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

const listIssueErrorEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const issueId = new mongoose.Types.ObjectId(req.params.issueId);
    const ErrorEventList: ErrorEventDocument[] = await errorEventService.getErrorEventByIssueId(
      issueId
    );
    res.json(ErrorEventList);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

export default {
  collectErrorEvent,
  getAllErrorEvents,
  getErrorEvent,
  listIssueErrorEvents,
};
