import * as mongoose from 'mongoose';
import { ErrorEventSchema, ErrorEventDocument } from './ErrorEvent';

const IssueSchema: mongoose.Schema = new mongoose.Schema(
  {
    eventId: {
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

    comments: [],
  },
  {
    timestamps: true,
  }
);

export interface IssueDocument extends mongoose.Document {
  eventId: String;
  title: String;
  description: String;
  comments: String[];
  errorEvents: ErrorEventDocument[];
}

const Issue: mongoose.Model<IssueDocument> = mongoose.model(
  'Issue',
  IssueSchema
);

export default Issue;
