import * as crypto from 'crypto';
import User, { UserDocument, SignUpUser } from '../models/User';

const hash = 'sha512';
const encoding = 'base64';
const hashPwd = (pwd: string): string => {
  return crypto.createHash(hash).update(pwd).digest(encoding);
};

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

const createUser = async (data: SignUpUser) => {
  const { name, email, pwd } = data;
  const imageURL =
    'https://avatars2.githubusercontent.com/u/46434838?s=100&v=4';
  const oauthId = 'local';
  const status = true;

  const conditions = { email, oauthId };
  const docs = Object({
    name,
    pwd: hashPwd(pwd),
    email,
    imageURL,
    oauthId,
    status,
  });

  const checkUser: UserDocument[] = await User.find(conditions);
  if (checkUser.length === 0) {
    await User.create(docs);
    return { isCreated: true };
  }
  return { isCreated: false };
};

export default { saveData, createUser };
