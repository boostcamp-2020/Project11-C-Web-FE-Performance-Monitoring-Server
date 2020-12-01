import * as mongoose from 'mongoose';

export const ErrorEventSchema: mongoose.Schema = new mongoose.Schema({
  content: String,
  errArea: mongoose.Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now,
  },
  eventId: String,
});

export interface ErrorEventDocument extends mongoose.Document {
  content: String;
  date: Date;
  errArea: mongoose.Schema.Types.Mixed;
  eventId: String;
}

const ErrorEvent: mongoose.Model<ErrorEventDocument> = mongoose.model(
  'Error',
  ErrorEventSchema
);

export default ErrorEvent;
