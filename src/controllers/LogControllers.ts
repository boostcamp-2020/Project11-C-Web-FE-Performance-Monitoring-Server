import * as express from 'express';
import Log, { LogDocument } from '../models/log';

const collectLog = async (req: express.Request, res: express.Response) => {
  const { content, date } = req.body;
  console.log(content, date);
  const newLog = new Log({ content, date: new Date(date).toISOString() });
  try {
    await newLog.save();
    res.json(newLog);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

const getLogs = async (req: express.Request, res: express.Response) => {
  try {
    const logList: LogDocument[] = await Log.find().exec();
    res.json(logList);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

export default { collectLog, getLogs };
