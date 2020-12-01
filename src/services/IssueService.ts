import Issue, { IssueDocument } from '../models/Issue';
import { ErrorEventDocument } from '../models/ErrorEvent';

class IssueService {
  // 기존 issue가 없을 경우 새로 만들어낸다
  createIssue = async (errorEvent: ErrorEventDocument) => {
    const title = errorEvent.content.split('\n')[0];
    const msg = errorEvent.content.split('\n')[1];

    const newIssue = new Issue({
      eventId: errorEvent.eventId,
      title,
      description: msg,
      comments: [],
      errorEvents: [errorEvent],
    });

    const result = await newIssue.save();
    return result;
  };

  addErrorEventToISsue = async (errorEvent: ErrorEventDocument) => {
    if (!(await this.hasIssue(errorEvent.eventId))) {
      return this.createIssue(errorEvent);
    }
    return this.appendErrorEventToIssue(errorEvent);
  };

  appendErrorEventToIssue = async (errorEvent: ErrorEventDocument) => {
    const res = await Issue.findOneAndUpdate(
      { eventId: errorEvent.eventId },
      { $push: { errorEvents: errorEvent } }
    );
    return res;
  };

  getIssue = async (eventId: String) => {
    const res: IssueDocument = await Issue.findOne({ eventId }).exec();
    return res;
  };

  getAllIssue = async () => {
    const res: IssueDocument[] = await Issue.find({}).exec();
    return res;
  };

  hasIssue = async (eventId: String) => {
    const res: IssueDocument = await Issue.findOne({ eventId }).exec();
    console.log('issue', !!res);
    return !!res;
  };
}

const issueService = new IssueService();
export default issueService;
