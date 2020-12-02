import * as express from 'express';
import Log, { LogDocument } from '../models/log';

const collectLog = async (req: express.Request, res: express.Response) => {
  const data = req.body;
  const newLog: LogDocument = new Log(data);
  try {
    await newLog.save();
    res.json(newLog);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

const getLogs = async (req: express.Request, res: express.Response) => {
  try {
    const logList: LogDocument[] = await Log.find()
      .sort({ date: 'asc' })
      .exec();
    res.json(logList);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

export default { collectLog, getLogs };
