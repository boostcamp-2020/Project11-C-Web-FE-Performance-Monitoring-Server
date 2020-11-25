import User from '../models/User';

const loginService = {
  saveData: async (user: any, domain: string) => {
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

    const one = await User.findOne(conditions);
    const userData = one || (await User.create(docs));
    return userData;
  },
};

export default loginService;
