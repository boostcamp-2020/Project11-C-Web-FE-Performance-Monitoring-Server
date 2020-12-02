import * as crpyto from 'crypto';
import ErrorEvent, { ErrorEventDocument } from '../models/ErrorEvent';

export const saveErrorEvent = async (LogData: {}) => {
  const eventId: string = crpyto
    .createHash('md5')
    // eslint-disable-next-line dot-notation
    .update(LogData['content'])
    .digest('hex');
  const newErrorEvent = new ErrorEvent({ ...LogData, eventId });
  await newErrorEvent.save();
  return newErrorEvent;
};

export const getErrorEvent = async (eventId: String) => {
  const res: ErrorEventDocument = await ErrorEvent.findOne({
    eventId,
  }).exec();
  return res;
};

export const getAllErrorEvent = async () => {
  const res: ErrorEventDocument[] = await ErrorEvent.find().exec();
  return res;
};
