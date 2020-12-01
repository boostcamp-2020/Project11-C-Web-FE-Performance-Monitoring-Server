import User from '../models/User';

const findUser = async (id: string) => {
  const one = await User.findById(id);
  const user = {
    name: one.name,
    email: one.email,
    imageURL: one.imageURL,
    status: one.status,
    projects: one.projects,
    recentProject: one.recentProject,
  };
  return user;
};

export default { findUser };
