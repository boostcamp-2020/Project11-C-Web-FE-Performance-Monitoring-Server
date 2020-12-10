/* eslint-disable no-underscore-dangle */
import Project, { ProjectDocument } from '../models/Project';
import User, { UserDocument } from '../models/User';

const createProject = async (user: any, data: any) => {
  const { userId } = user;
  const { title, description, platform, dsn } = data;
  const docs = Object({
    title,
    description,
    platform,
    dsn,
    owner: userId,
  });

  try {
    const project: ProjectDocument = await Project.create(docs);

    project.dsn = `${process.env.SERVER_ADDR}/errorevent/${project._id}`;
    await project.save();

    const updatedUser: UserDocument = await User.findByIdAndUpdate(
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
  const project: ProjectDocument = await Project.findById(projectId);
  if (String(project.owner) === userId || project.members.includes(userId))
    return project;
  return 'no permission';
};

// object id에 해당하는 document를 모두 join하여 반환
const readProjectWithPopulate = async (user: any, projectId: string) => {
  const { userId } = user;
  const project: ProjectDocument = await Project.findById(projectId);
  if (String(project.owner) === userId || project.members.includes(userId))
    return project
      .populate('owner')
      .populate('members')
      .populate({
        path: 'issues',
        populate: {
          path: 'errorEvents',
        },
      })
      .execPopulate();
  return 'no permission';
};

const removeProject = async (user: any, projectId: string) => {
  const deletedProject: ProjectDocument = await Project.findOneAndDelete({
    _id: projectId,
    owner: user.userId,
  });
  const { owner, members } = deletedProject;
  const allMembers = [...members, owner];

  const promiseMembers = allMembers.map(async memberId => {
    const member: UserDocument = await User.findById(memberId);
    const newRecentProject =
      String(member.recentProject) === projectId ? null : member.recentProject;
    const updatedMember: UserDocument = await User.findByIdAndUpdate(
      memberId,
      {
        $pull: { projects: Object(projectId) },
        $set: { recentProject: newRecentProject },
      },
      { new: true }
    );
    return updatedMember;
  });
  const updatedMembers: UserDocument[] = await Promise.all(promiseMembers);

  return deletedProject;
};

const pushMember = async (user: any, projectId: string, data: any) => {
  const { userId } = user;
  const { member } = data;
  const updatedProject: ProjectDocument = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: userId,
    },
    {
      $addToSet: { members: member },
    },
    { new: true }
  );
  const updatedUser: UserDocument = await User.findByIdAndUpdate(
    member,
    {
      $addToSet: { projects: updatedProject._id },
    },
    { new: true }
  );
  return updatedProject;
};

const removeMember = async (user: any, projectId: string, memberId: string) => {
  const { userId } = user;
  const updatedProject: ProjectDocument = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: userId,
    },
    {
      $pull: { members: Object(memberId) },
    },
    { new: true }
  );
  const updatedUser: UserDocument = await User.findByIdAndUpdate(
    memberId,
    {
      $pull: { projects: updatedProject._id },
    },
    { new: true }
  );
  return updatedProject;
};

export default {
  createProject,
  readProject,
  readProjectWithPopulate,
  removeProject,
  pushMember,
  removeMember,
};
