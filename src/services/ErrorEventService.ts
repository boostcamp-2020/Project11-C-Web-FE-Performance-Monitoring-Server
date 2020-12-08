import * as crpyto from 'crypto';
import * as mongoose from 'mongoose';
import ErrorEvent, { ErrorEventDocument } from '../models/ErrorEvent';

export const saveErrorEvent = async (LogData: {}) => {
  const hash: string = crpyto
    .createHash('md5')
    // eslint-disable-next-line dot-notation
    .update(LogData['stack'])
    .digest('hex');
  const newErrorEvent = new ErrorEvent({ ...LogData, hash });
  await newErrorEvent.save();
  return newErrorEvent;
};

export const getErrorEvent = async (errorEventId: String) => {
  const res: ErrorEventDocument = await ErrorEvent.findById(errorEventId);
  return res;
};

export const getAllErrorEvent = async () => {
  const res: ErrorEventDocument[] = await ErrorEvent.find().exec();
  return res;
};
export const getErrorEventByIssueId = async (
  issueId: mongoose.Types.ObjectId
) => {
  const res: ErrorEventDocument[] = await ErrorEvent.find({
    issueId,
  })
    .sort({ date: -1 })
    .exec();
  return res;
};
