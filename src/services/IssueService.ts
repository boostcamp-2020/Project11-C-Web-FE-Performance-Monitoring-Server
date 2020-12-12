import * as mongoose from 'mongoose';
import Issue, { IssueDocument, IssueResolveStateInfo } from '../models/Issue';
import ErrorEvent, { ErrorEventDocument } from '../models/ErrorEvent';
import Project, { ProjectDocument } from '../models/Project';

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
    { projectId: errorEvent.projectId, groupHash: errorEvent.hash },
    // eslint-disable-next-line no-underscore-dangle
    {
      $push: { errorEvents: errorEvent._id },
    },
    { new: true }
  );

  errorEvent.issueId = res._id;
  await errorEvent.save();
  return res;
};

export const getIssue = async (issueId: String) => {
  const issueDoc: IssueDocument = await Issue.findById(issueId).exec();
  const res = await issueDoc.populate('projectId').execPopulate();
  return res;
};
// 잘못 구현된 함수, 재구현 예정
/*
export const getIssueListWithPagination = async (
  pageOptions: {
    page: number;
    limit: number;
  },
  conditionQuery: {
    asignee: string;
    resolved: boolean;
  },
  orderQuery: any
) => {
  const issueDocList: IssueDocument[] = await Issue.find(conditionQuery)
    .sort(orderQuery)
    .skip((pageOptions.page - 1) * pageOptions.limit)
    .limit(pageOptions.limit)
    //.populate({ path: 'projectId' })
    .exec();

  const pageinfo = {
    pageNum: Math.ceil(issueDocList.length / pageOptions.limit),
    totalItemNum: issueDocList.length,
  };

  return { issueDocList, pageinfo };
};
*/

export const getAllIssue = async () => {
  const res: IssueDocument[] = await Issue.find({}).exec();
  return res;
};

export const hasIssue = async (errorEvent: ErrorEventDocument) => {
  const res: IssueDocument = await Issue.findOne({
    groupHash: errorEvent.hash,
    projectId: errorEvent.projectId,
  }).exec();
  return !!res;
};

export const getIssueListByProjectId = async (
  projectId: mongoose.Types.ObjectId
) => {
  const res: IssueDocument[] = await Issue.find({ projectId }).exec();
  return res;
};

export const addIssueToProject = async (issue: IssueDocument) => {
  const { projectId } = issue;

  const res: ProjectDocument = await Project.findOneAndUpdate(
    { _id: projectId },
    // eslint-disable-next-line no-underscore-dangle
    { $push: { issues: issue._id } },
    { new: true }
  );
  return res;
};

export const addErrorEventToISsue = async (errorEvent: ErrorEventDocument) => {
  let resIssueDoc = null;
  if (!(await hasIssue(errorEvent))) {
    resIssueDoc = await createIssue(errorEvent);
    await addIssueToProject(resIssueDoc);
  } else resIssueDoc = await appendErrorEventToIssue(errorEvent);

  return resIssueDoc;
};

export const setAssignee = async (
  projectId: mongoose.Types.ObjectId,
  issueId: mongoose.Types.ObjectId,
  assignee: mongoose.Types.ObjectId
) => {
  const filter = { _id: issueId, projectId };
  const update = { assignee };

  const res: IssueDocument = await Issue.findOneAndUpdate(filter, update, {
    new: true,
  });
  return res;
};
export const setResolvedState = async (
  projectId: mongoose.Types.ObjectId,
  targetIssueInfo: IssueResolveStateInfo
) => {
  const { issueIdList, resolved } = targetIssueInfo;

  const res: any = await Issue.updateMany(
    { projectId, _id: { $in: issueIdList } },
    { $set: { resolved } }
  ).exec();

  return res;
};
