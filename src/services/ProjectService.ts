import Project from '../models/Project';
import User from '../models/User';

const createProject = async (user: any, data: any) => {
  const { userId } = user;
  const { title, description, framework, dsn } = data;
  const docs = Object({
    title,
    description,
    framework,
    dsn,
    owner: userId,
  });

  try {
    const project = await Project.create(docs);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { projects: project._id },
        $set: { recentProject: project._id },
      },
      { new: true }
    );
    return project;
  } catch (err) {
    return err;
  }
};

const readProject = async (user: any, projectId: string) => {
  const { userId } = user;
  const project = await Project.findById(projectId);
  if (String(project.owner) === userId || project.members.includes(userId))
    return project;
  return 'no permission';
};

// 유저 정보에 있는 project 정보도 삭제할것
const removeProject = async (projectId: string) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);
  return deletedProject;
};

export default { createProject, readProject, removeProject };
