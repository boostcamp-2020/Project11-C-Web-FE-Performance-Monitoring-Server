import * as mongoose from 'mongoose';
import User, { UserDocument } from '../models/User';

const findUser = async (id: string) => {
  const one: UserDocument = await User.findById(id);
  const user = {
    userId: id,
    name: one.name,
    email: one.email,
    imageURL: one.imageURL,
    status: one.status,
    projects: one.projects,
    recentProject: one.recentProject,
  };
  return user;
};

const readUsers = async () => {
  const list: any = await User.find();

  return list;
};

const readProjects = async (user: any) => {
  const { projects } = await User.findOne({ _id: user.userId }).populate({
    path: 'projects',
    model: 'Project',
    select: '_id title description platform issues owner createdAt',
    populate: { path: 'owner', model: 'User', select: '_id name' },
  });
  return projects;
};

const readUserByEmail = async (email: string) => {
  const users: UserDocument[] = await User.find({ email, status: true });
  return users;
};

export default { findUser, readUsers, readProjects, readUserByEmail };
