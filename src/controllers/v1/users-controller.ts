import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
//import {users} from '../../data/users';
import Users from '../../db/schemas/user';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = Users.find();
  res.send(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const user = Users.findById(userId);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send();
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, email, avatar, password } = req.body;
    const hash: string = await bcrypt.hash(password, 16);
    const newUser = await Users.create({
      first_name,
      last_name,
      email,
      avatar,
      password: hash,
    });
    res.send(newUser);
  } catch (e) {
    res.status(500).send(e.message)
  }
  
};
