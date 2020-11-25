import Project from '../models/Project';

// 유저 정보는 JWT에서 가져올것
const createProject = async (data: object) => {
  const result = await Project.create(Object(data));
  return result;
};

export default { createProject };
