import * as mongoose from 'mongoose';
import { ErrorEventSchema, ErrorEventDocument } from './ErrorEvent';
import { CommentSchema, CommentDocument } from './Comment';

const IssueSchema: mongoose.Schema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    groupHash: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },

    errorEvents: [ErrorEventSchema],

    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

export interface IssueDocument extends mongoose.Document {
  groupHash: String;
  title: String;
  description: String;
  comments: CommentDocument[];
  errorEvents: ErrorEventDocument[];
  projectId: mongoose.Types.ObjectId;
}

const Issue: mongoose.Model<IssueDocument> = mongoose.model(
  'Issue',
  IssueSchema
);

export default Issue;
