import * as mongoose from 'mongoose';
import User, { UserDocument } from '../models/User';

const saveData = async (user: any, domain: string) => {
  const { id, displayName, username, emails, photos } = user;
  const [email] = emails || [{ value: null }];
  const [photo] = photos;
  const oauthId = `${id}_${domain}`;

  const conditions = { oauthId };
  const docs = Object({
    name: displayName || username,
    email: email.value,
    imageURL: photo.value,
    oauthId,
    status: true,
  });

  const one: UserDocument = await User.findOne(conditions);
  const temp: UserDocument = one || (await User.create(docs));
  const userId: any = temp._id;
  const userStatus: Boolean = temp.status;
  const { recentProject } = temp;
  return [userId, userStatus, recentProject];
};

export default { saveData };
