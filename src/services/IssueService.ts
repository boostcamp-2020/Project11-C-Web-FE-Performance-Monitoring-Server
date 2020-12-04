import Issue, { IssueDocument } from '../models/Issue';
import { ErrorEventDocument } from '../models/ErrorEvent';

// 기존 issue가 없을 경우 새로 만들어낸다
export const createIssue = async (errorEvent: ErrorEventDocument) => {
  const title = errorEvent.content.split('\n')[0];
  const msg = errorEvent.content.split('\n')[1];

  const newIssue = new Issue({
    groupHash: errorEvent.hash,
    title,
    description: msg,
    comments: [],
    errorEvents: [errorEvent],
  });

  const result: IssueDocument = await newIssue.save();
  return result;
};

export const appendErrorEventToIssue = async (
  errorEvent: ErrorEventDocument
) => {
  const res: IssueDocument = await Issue.findOneAndUpdate(
    { groupHash: errorEvent.hash },
    { $push: { errorEvents: errorEvent } }
  );
  return res;
};

export const getIssue = async (groupHash: String) => {
  const res: IssueDocument = await Issue.findOne({ groupHash }).exec();
  return res;
};

export const getAllIssue = async () => {
  const res: IssueDocument[] = await Issue.find({}).exec();
  return res;
};

export const hasIssue = async (groupHash: String) => {
  const res: IssueDocument = await Issue.findOne({ groupHash }).exec();
  return !!res;
};

export const addErrorEventToISsue = async (errorEvent: ErrorEventDocument) => {
  if (!(await hasIssue(errorEvent.hash))) {
    return createIssue(errorEvent);
  }
  return appendErrorEventToIssue(errorEvent);
};
