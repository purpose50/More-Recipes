import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import models from '../models';

const secret = 'This is your guy';

/**
 * @class controller
 */
class UserController {
  /**
   * @return {obj}singup
   * @param {*} req
   * @param {*} res
   */
  static async signup(req, res) {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      };

      const userFound = await models.User.findOne({ where: { email: user.email } });
      if (userFound) {
        return res.status(403).send({ success: 'false', message: 'Email already registered' });
      }

      if (!isEmail(req.body.email)) {
        return res.status(400).send({ sucess: 'false', message: 'invalid email address' });
      }

      const newUser = await models.User.create(user);
      const publicUserData = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      };
      const token = jwt.sign(publicUserData, secret, { expiresIn: 87640 });
      return res.status(201).send({
        success: 'true',
        message: 'User created',
        token,
        user: publicUserData
      });
    } catch (err) {
      res.status(500).send({ success: 'false', message: 'Internal server error', error: err });
    }
  }

  /**
   * @return {obj} signin
   * @param {*} req
   * @param {*} res
   */
  static async signin(req, res) {
    try {
      const userFound = await models.User.findOne({ where: { email: req.body.email } });
      if (!userFound) {
        return res.status(403).send({ success: 'false', message: 'Incorrect email or password, user not found' });
      }
      const validPassword = bcrypt.compareSync(req.body.password, userFound.password);
      if (!validPassword) {
        return res.status(403).send({ success: 'false', message: 'wrong password' });
      }

      if (!isEmail(req.body.email)) {
        return res.status(400).send({ sucess: 'false', message: 'invalid email address' });
      }

      const publicUserData = {
        id: userFound.id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email
      };

      const token = jwt.sign(publicUserData, secret, { expiresIn: 87640 });
      res.status(201).send({
        success: 'true',
        message: 'successfully signed in',
        token,
        user: publicUserData
      });
    } catch (err) {
      res.status(500).send({ success: 'false', message: 'Internal server error', error: err });
    }
  }
}

export default UserController;
