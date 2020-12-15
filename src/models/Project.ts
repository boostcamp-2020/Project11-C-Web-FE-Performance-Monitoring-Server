import * as mongoose from 'mongoose';

const projectSchema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    platform: {
      type: String,
    },
    dsn: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface ProjectDocument extends mongoose.Document {
  title: String;
  description: String;
  platform: String;
  dsn: String;
  owner: mongoose.Types.ObjectId;
  members: Array<mongoose.Types.ObjectId>;
  issues: Array<mongoose.Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}

const Project: mongoose.Model<ProjectDocument> = mongoose.model(
  'Project',
  projectSchema
);

export default Project;
