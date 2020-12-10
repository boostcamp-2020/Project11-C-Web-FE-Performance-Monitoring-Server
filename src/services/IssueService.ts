import * as mongoose from 'mongoose';
import Issue, { IssueDocument } from '../models/Issue';
import ErrorEvent, { ErrorEventDocument } from '../models/ErrorEvent';

// 기존 issue가 없을 경우 새로 만들어낸다
export const createIssue = async (errorEvent: ErrorEventDocument) => {
  const { name } = errorEvent;
  const { message } = errorEvent;
  const { stack } = errorEvent;

  const newIssue = new Issue({
    projectId: errorEvent.projectId,
    groupHash: errorEvent.hash,
    name,
    message,
    stack,
    comments: [],
    errorEvents: [errorEvent],
  });

  const result: IssueDocument = await newIssue.save();

  errorEvent.issueId = result._id;

  await errorEvent.save();

  return result;
};

export const appendErrorEventToIssue = async (
  errorEvent: ErrorEventDocument
) => {
  const res: IssueDocument = await Issue.findOneAndUpdate(
    { groupHash: errorEvent.hash },
    // eslint-disable-next-line no-underscore-dangle
    { $push: { errorEvents: errorEvent._id } }
  );

  errorEvent.issueId = res._id;
  await errorEvent.save();
  return res;
};

export const getIssue = async (issueId: String) => {
  const res: IssueDocument = await Issue.findById(issueId).exec();
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

export const getIssueListByProjectId = async (
  projectId: mongoose.Types.ObjectId
) => {
  const res: IssueDocument[] = await Issue.find({ projectId }).exec();
  return res;
};

export const setAssignee = async (
  issueId: mongoose.Types.ObjectId,
  assignee: mongoose.Types.ObjectId
) => {
  const filter = { _id: issueId };
  const update = { assignee };
  const res: IssueDocument = await Issue.findOneAndUpdate(filter, update, {
    new: true,
  });
  return res;
};
export const setResolvedState = async (
  issueId: mongoose.Types.ObjectId,
  resolved: Boolean
) => {
  const filter = { _id: issueId };
  const update = { resolved };
  const res: IssueDocument = await Issue.findOneAndUpdate(filter, update, {
    new: true,
  });
  return res;
};
