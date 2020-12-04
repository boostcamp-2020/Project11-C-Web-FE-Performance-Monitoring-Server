import * as mongoose from 'mongoose';

export const ErrorEventSchema: mongoose.Schema = new mongoose.Schema({
  content: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  errArea: mongoose.Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now,
  },
  userInfo: {},
  tags: [[String, String]],
  hash: String,
});

export interface ErrorEventDocument extends mongoose.Document {
  content: String;
  date: Date;
  errArea: mongoose.Schema.Types.Mixed;
  userInfo: {};
  tags: [[String, String]];
  hash: String;
  projectId: mongoose.Schema.Types.ObjectId;
}

const ErrorEvent: mongoose.Model<ErrorEventDocument> = mongoose.model(
  'ErrorEvent',
  ErrorEventSchema
);

export default ErrorEvent;
