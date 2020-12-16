import * as mongoose from 'mongoose';

export const AlertSchema: mongoose.Schema = new mongoose.Schema(
  {
    alertType: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
      default: null,
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
      default: null,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export interface AlertType extends Object {
  type: Number;
  name: String;
  title: String;
}
export interface AlertDocument extends mongoose.Document {
  alertType: AlertType;
  issue: mongoose.Types.ObjectId;
  from: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  createdAt: Date;
}

const Alert: mongoose.Model<AlertDocument> = mongoose.model(
  'Alert',
  AlertSchema
);

export default Alert;
