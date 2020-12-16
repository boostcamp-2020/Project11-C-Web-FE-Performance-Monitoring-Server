import * as mongoose from 'mongoose';

export const ErrorEventSchema: mongoose.Schema = new mongoose.Schema({
  name: String,
  message: String,
  stack: String,
  content: String,
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  errArea: mongoose.Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {},
  hash: String,
});

export interface ErrorEventDocument extends mongoose.Document {
  name: String;
  message: String;
  stack: String;
  content: String;
  date: Date;
  errArea: mongoose.Schema.Types.Mixed;
  tags: {};
  hash: String;
  issueId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
}

const ErrorEvent: mongoose.Model<ErrorEventDocument> = mongoose.model(
  'ErrorEvent',
  ErrorEventSchema
);

export default ErrorEvent;
