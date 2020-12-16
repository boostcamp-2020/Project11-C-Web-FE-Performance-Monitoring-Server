/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import AlertEvent, { AlertDocument, AlertType } from '../models/Alert';
import { IssueDocument } from '../models/Issue';
import { ProjectDocument } from '../models/Project';
import User, { UserDocument } from '../models/User';
import MailService from './MailService';
import ProjectService from './ProjectService';
import UserService from './UserService';

/**
 *
 * TODO: alert 보내는 함수에 이메일 템플릿이 하드코딩 되어있음
 * 따로 빼서 관리하도록 개선해야됨
 */

const addNewAlertEvent = async (
  user: mongoose.Types.ObjectId | null,
  newIssue: IssueDocument
) => {
  const newIssueType: AlertType = {
    type: -1,
    name: 'NEW-ISSUE',
    title: '새로운 이슈 발생',
  };

  const newAlertDoc = {
    alertType: newIssueType,
    // eslint-disable-next-line no-underscore-dangle
    issue: newIssue._id,
    from: user,
    project: newIssue.projectId,
  };

  const newAlert: AlertDocument = new AlertEvent(newAlertDoc);
  const res = await newAlert.save();

  const memberList: any = await ProjectService.getProjectMemberList(
    newIssue.projectId.toHexString()
  );

  memberList.forEach(member => {
    const mailTemplate = `
  <h2> 새로운 issue 발생  </h2>
  <h3> ${newIssue.name}  - ${newIssue.message}  </h3>
  <h4> 발생 시각 : ${new Date(newIssue.createdAt).toLocaleString()}  </h4>
  <h3> STACK MESSAGE  </h3>
  <div>
   ${newIssue.stack}
  </div>
  
  <a href="http://${process.env.FRONT_HOST}/issues/${
      // eslint-disable-next-line no-underscore-dangle
      newIssue._id
    }" >해당 issue page로 이동하기</a>
  `;
    if (member.email)
      MailService.sendEmail(member.email, 'issue 발생함', mailTemplate);
  });

  return res;
};

const addInviteProjectAlert = async (
  from: mongoose.Types.ObjectId | null,
  newMember: mongoose.Types.ObjectId,
  project: ProjectDocument
) => {
  const newInviteType: AlertType = {
    type: 1,
    name: 'INVITE',
    title: '프로젝트에 초대됨',
  };

  const newAlertDoc = {
    alertType: newInviteType,
    // eslint-disable-next-line no-underscore-dangle
    issue: null,
    from,
    project: project._id,
  };

  const inviteUserInfo = await User.findById(from);
  const invitedUserInfo = await User.findById(newMember);

  const newAlert: AlertDocument = new AlertEvent(newAlertDoc);
  const res = await newAlert.save();

  const mailTemplate = `
  <h2> ${inviteUserInfo.name}님이 프로젝트 ${project.title}에 초대했습니다.</h2>
  <a href="http://${process.env.FRONT_HOST}/projects/${
    // eslint-disable-next-line no-underscore-dangle
    project._id
  }" > 프로젝트 페이지로 이동하기</a>
  `;

  MailService.sendEmail(
    invitedUserInfo.email,
    `@acent - ${inviteUserInfo.name}님이 프로젝트 ${project.title}에 초대했습니다.`,
    mailTemplate
  );

  return res;
};

const getAlertList = async (user: any) => {
  const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
    user.userId
  );

  const { projects } = await User.findOne({ _id: userId });

  const res: AlertDocument[] = await AlertEvent.find({
    project: { $in: projects },
  })
    .populate({
      path: 'project',
      model: 'Project',
      select: '_id title',
    })
    .populate({
      path: 'from',
      model: 'User',
    })
    .sort({ createdAt: -1 })
    .exec();

  return res;
};

export default { addNewAlertEvent, getAlertList, addInviteProjectAlert };
