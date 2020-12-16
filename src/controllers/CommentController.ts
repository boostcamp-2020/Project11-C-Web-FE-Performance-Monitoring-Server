import * as express from 'express';
import * as mongoose from 'mongoose';
import { CommentDocument } from '../models/Comment';
import CommentService from '../services/CommentService';

const addComment = async (req: express.Request, res: express.Response) => {
  const data: CommentDocument = req.body;
  const userId = new mongoose.Types.ObjectId(req.body.writer);
  data.writer = userId;

  const result = await CommentService.appendCommentToIssue(data);

  res.json(result);
};

const editComment = async (req: express.Request, res: express.Response) => {
  const data: CommentDocument = req.body;
  const result = await CommentService.editCommentOfIssue(data);

  res.json(result);
};

const deleteComment = async (req: express.Request, res: express.Response) => {
  const { commentId, issueId } = req.params;
  const result = await CommentService.removeCommentFromIssue(
    issueId,
    commentId
  );

  res.json(result);
};

export default { addComment, deleteComment, editComment };
