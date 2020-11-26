import Project from '../models/Project';

// 유저 정보는 JWT에서 가져올것
// 필요 내용만 저장
const createProject = async (data: any) => {
  const result = await Project.create(data);
  return result;
};
// 유저 정보에 있는 project 정보도 삭제할것
const removeProject = async (projectId: string) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);
  return deletedProject;
};

export default { createProject, removeProject };
