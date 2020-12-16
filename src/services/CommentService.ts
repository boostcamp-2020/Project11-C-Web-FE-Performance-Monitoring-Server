import * as mongoose from 'mongoose';
import Comment, { CommentDocument } from '../models/Comment';
import Issue, { IssueDocument } from '../models/Issue';

const appendCommentToIssue = async (commentData: CommentDocument) => {
  const res = await Issue.findOneAndUpdate(
    { _id: commentData.targetIssue },
    { $push: { comments: commentData } }
  );
  return res;
};

const editCommentOfIssue = async (commentData: CommentDocument) => {
  const res: IssueDocument = await Issue.update(
    { _id: commentData.targetIssue, 'comments._id': commentData._id },
    { $set: { 'comments.$.description': commentData.description } }
  );

  return res;
};

const removeCommentFromIssue = async (issueId: String, commentId: String) => {
  const res = await Issue.findOneAndUpdate(
    { _id: issueId },
    { $pull: { comments: { _id: commentId } } }
  );

  return res;
};

export default {
  appendCommentToIssue,
  removeCommentFromIssue,
  editCommentOfIssue,
};
