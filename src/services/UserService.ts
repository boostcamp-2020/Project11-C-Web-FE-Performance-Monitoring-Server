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

const readProjects = async (user: any) => {
  const { projects } = await User.findOne({ _id: user.userId }).populate({
    path: 'projects',
    model: 'Project',
    select: '_id title description platform issues owner createdAt',
    populate: { path: 'owner', model: 'User', select: '_id name' },
  });
  return projects;
};

export default { findUser, readProjects };
