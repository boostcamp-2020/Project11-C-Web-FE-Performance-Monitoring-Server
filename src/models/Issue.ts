import * as mongoose from 'mongoose';
import { CommentSchema, CommentDocument } from './Comment';
// import * as mongoosePaginate from 'mongoose-paginate-v2';
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const IssueSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },
    stack: {
      type: String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    groupHash: {
      type: String,
      index: true,
    },
    errorEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ErrorEvent',
      },
    ],
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);
IssueSchema.index({ createdAt: -1 });
export interface IssueDocument extends mongoose.Document {
  name: String;
  message: String;
  stack: String;
  groupHash: String;
  comments: CommentDocument[];
  errorEvents: mongoose.Types.ObjectId[];
  projectId: mongoose.Types.ObjectId;
  resolved: Boolean;
  createdAt: Date;
}
export interface IssueResolveStateInfo {
  issueIdList: mongoose.Types.ObjectId[];
  resolved: Boolean;
}

IssueSchema.plugin(mongooseAggregatePaginate);
const Issue: mongoose.AggregatePaginateModel<IssueDocument> = mongoose.model(
  'Issue',
  IssueSchema
);

export default Issue;
