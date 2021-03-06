import jwt from 'jsonwebtoken';
import models from '../models';

const secret = process.env.SECRET;

/**
 * @class Middleware
 */
class Middleware {
  /**
   *@returns {obj} validateSignUpForm
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   */
  static validateAddRecipe(req, res, next) {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if (!req.body.instructions) {
      return res.status(400).send({
        success: 'false',
        message: 'instruction is required'
      });
    } else if (!req.body.ingredients) {
      return res.status(400).send({
        success: 'false',
        message: 'ingredient is required'
      });
    } else if (!req.body.image) {
      return res.status(400).send({
        success: 'false',
        message: 'image is required'
      });
    }
    next();
  }

  /**
   * @returns {obj} verifyToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async verifyToken(req, res, next) {
    try {
      const { token } = req.headers;

      if (!token) {
        return res.status(401).send({
          success: 'false',
          message: 'user not signed in'
        });
      }

      const foundToken = await models.blacklist.findOne({
        where: {
          token
        }
      });

      if (foundToken) {
        return res.status(401).send({
          success: 'false',
          message: 'Session has expired, please sign in',
          error: {
            name: 'TokenExpiredError'
          }
        });
      }

      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            success: 'false',
            message: 'Invalid username or password.',
            error: err
          });
        }

        req.decoded = decoded;
        next();
      });
    } catch (err) {
      return res.status(500).send({
        success: 'false',
        message: 'Internal server error.'
      });
    }
  }

  /**
   * @returns {obj} getUserId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static getUserId(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      return next();
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: 'false',
          message: 'Invalid username or password.',
          error: err
        });
      }
      req.decoded = decoded;
      next();
    });
  }

  /**
   * @returns {*} validateUserSignup
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static validateUserSignup(req, res, next) {
    if (!req.body.firstName) {
      return res.status(400).send({
        success: 'false',
        message: 'please enter your first name'
      });
    } else if (!req.body.lastName) {
      return res.status(400).send({
        success: 'false',
        message: 'please enter your last name'
      });
    } else if (!req.body.email) {
      return res.status(400).send({
        success: 'false',
        message: 'please enter your email'
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        success: 'false',
        message: 'please enter your password'
      });
    } else if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send({
        success: 'false',
        message: 'passowrd should match'
      });
    }
    next();
  }

  /**
   * @returns {*} validateUserSignin
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static validateUserSignin(req, res, next) {
    if (!req.body.email) {
      return res.status(400).send({
        success: 'false',
        message: 'please enter your email'
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        success: 'false',
        message: 'please enter your password'
      });
    }
    next();
  }
}

export default Middleware;
