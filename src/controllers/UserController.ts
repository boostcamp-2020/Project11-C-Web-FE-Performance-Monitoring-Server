import * as express from 'express';

const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { user } = req;
    res.json(user);
  } catch (e) {
    res.json(e);
  }
};

export default { getUser };
