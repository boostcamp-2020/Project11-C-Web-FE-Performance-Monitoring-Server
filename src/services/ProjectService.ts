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

const removeProject = async (user: any, projectId: string) => {
  const deletedProject = await Project.findOneAndDelete({
    _id: projectId,
    owner: user.userId,
  });
  const { owner, members } = deletedProject;
  const allMembers = [...members, owner];

  const promiseMembers = allMembers.map(async memberId => {
    const member = await User.findById(memberId);
    const newRecentProject =
      String(member.recentProject) === projectId ? null : member.recentProject;
    const newProjects = member.projects.filter(
      project => String(project) !== projectId
    );
    const updatedMember = await User.findByIdAndUpdate(
      memberId,
      {
        $set: { recentProject: newRecentProject, projects: newProjects },
      },
      { new: true }
    );
    return updatedMember;
  });
  const updatedMembers = await Promise.all(promiseMembers);

  return deletedProject;
};

export default { createProject, readProject, removeProject };
