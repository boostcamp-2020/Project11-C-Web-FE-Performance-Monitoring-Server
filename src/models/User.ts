import * as mongoose from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  imageURL: {
    type: String,
    trim: true,
  },
  oauthId: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects',
    },
  ],
  recentProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects',
  },
});

export interface UserDocument extends mongoose.Document {
  name: String;
  email: String;
  imageURL: String;
  oauthId: String;
  status: Boolean;
  projects: Array<mongoose.Types.ObjectId>;
  recentProject: mongoose.Types.ObjectId;
}

export interface ReqUserDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: String;
  email: String;
  imageURL: String;
  status: Boolean;
  projects: Array<mongoose.Schema.Types.ObjectId>;
  recentProject: mongoose.Schema.Types.ObjectId;
}

const User: mongoose.Model<UserDocument> = mongoose.model('User', userSchema);

export default User;
