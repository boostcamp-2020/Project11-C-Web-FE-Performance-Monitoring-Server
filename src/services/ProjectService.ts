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

// members에 요청을 보낸 유저가 존재할 경우 결과를 반환할 것
const readProject = async (projectId: string) => {
  const project = await Project.findById(projectId);
  return project;
};

// 유저 정보에 있는 project 정보도 삭제할것
const removeProject = async (projectId: string) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);
  return deletedProject;
};

export default { createProject, readProject, removeProject };
