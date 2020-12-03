import * as mongoose from 'mongoose';

export const CommentSchema: mongoose.Schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    targetIssue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export interface CommentDocument extends mongoose.Document {
  description: String;
  writer: mongoose.Types.ObjectId;
  targetIssue: String;
}

const Comment: mongoose.Model<CommentDocument> = mongoose.model(
  'Comment',
  CommentSchema
);

export default Comment;
