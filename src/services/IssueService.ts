/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import Issue, { IssueDocument, IssueResolveStateInfo } from '../models/Issue';
import ErrorEvent, { ErrorEventDocument } from '../models/ErrorEvent';
import Project, { ProjectDocument } from '../models/Project';
import AlertService from './AlertService';

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
  // eslint-disable-next-line no-param-reassign
  errorEvent.issueId = result._id;
  await errorEvent.save();

  // 새로운 issue 생성되었으므로 자동으로 새  Aelrt를 추가하고 메일 보내는 로직 동작
  await AlertService.addNewAlertEvent(null, result);

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
      $set: { resolved: false },
    },
    { new: true }
  );

  // eslint-disable-next-line no-param-reassign
  errorEvent.issueId = res._id;
  await errorEvent.save();
  return res;
};

export const getIssue = async (issueId: String) => {
  const issueDoc: IssueDocument = await Issue.findById(issueId).exec();
  const res = await issueDoc
    .populate('projectId')
    .populate('assignee')
    .execPopulate();
  return res;
};

export const getIssueListWithPagination = async (
  queryCond: {
    asignee: string;
    resolved: boolean;
    projectId: mongoose.Types.ObjectId;
  },
  options: mongoose.PaginateOptions
) => {
  const query = Issue.aggregate([
    {
      $match: queryCond,
    },
  ]).addFields({
    errorcnt: { $size: '$errorEvents' },
  });
  const result = await Issue.aggregatePaginate(query, options);
  return result;
};

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
  projectId: mongoose.Types.ObjectId,
  selectedCase: string
) => {
  switch (selectedCase) {
    case '0':
      const resolvedIssues: IssueDocument[] = await Issue.find({
        projectId,
        resolved: true,
      })
        .populate('assignee')
        .populate({
          path: 'projectId',
          model: 'Project',
          populate: { path: 'members', model: 'User' },
        })
        .exec();
      return resolvedIssues;
    case '1':
      const unresolvedIssues: IssueDocument[] = await Issue.find({
        projectId,
        resolved: false,
      })
        .populate('assignee')
        .populate({
          path: 'projectId',
          model: 'Project',
          populate: { path: 'members', model: 'User' },
        })
        .exec();
      console.log(unresolvedIssues[0]);
      return unresolvedIssues;
    case '2':
      const allIssues: IssueDocument[] = await Issue.find({
        projectId,
      })
        .populate('assignee')
        .populate({
          path: 'projectId',
          model: 'Project',
          populate: { path: 'members', model: 'User' },
        })
        .exec();
      return allIssues;
    default:
      return null;
  }
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
  targetIssueInfo: IssueResolveStateInfo
) => {
  const { issueIdList, resolved } = targetIssueInfo;

  const res: any = await Issue.updateMany(
    { _id: { $in: issueIdList } },
    { $set: { resolved } }
  ).exec();

  return res;
};
