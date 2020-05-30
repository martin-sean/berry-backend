import express from 'express';
import Account from '../data/models/Account';
import isAuth from '../middleware/isAuth';
import { createAccessToken } from '../utils/auth';

const router = express.Router();

const usernamePattern = new RegExp('^\\w+$');

// Authorise the current user
router.get('/current', isAuth, async (req, res) => {
  const account = Account.query().findById(res.locals.account);
  return res.status(200).json(account);
});

// Update the current user (Just username for now)
router.patch('/current', isAuth, async (req, res) => {
  type PatchRequest = { username: string }
  const username = (req.body as PatchRequest).username;

  // Check if username is a word ([A-Za-z0-9_]*) and in range
  if (!usernamePattern.test(username) || username.length < 3 || username.length > 20) {
    console.log("Username not valid");
    return res.status(400).send();
  }
    
  try {
    const updatedAccount = await Account.query()
      .findById(res.locals.userId)
      .patch({ username: username })
      .returning('*');
    // Small hack, typescript appears to be wrong, updatedAccount should not be an array
    return res.status(200).send(createAccessToken(<any> updatedAccount));
  } catch (error) {
    // Error occured, username not unique
    console.log("Error inserting username into DB");
    return res.status(400).send();
  }
})

// Delete the user's account
router.delete('/current', isAuth, async (req, res) => {
  type DeleteRequest = { 'deleteAccount': boolean, 'deleteClips': boolean };
  const deleteAccount = (req.body as DeleteRequest).deleteAccount;
  const deleteClips = (req.body as DeleteRequest).deleteClips;

  // Check if the user really wants to delete their account
  if (deleteAccount) {
    // Delete all of a user's clips first and associated tags
    if (deleteClips) {
      // TODO: Find and delete all clips
    } else {
      // Todo: Make all their clips anonymous
    }

    try {
      await Account.query().deleteById(res.locals.account);
      console.log(`Deleted account #${ res.locals.account }`);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
    // Account successfully deleted
    return res.status(204).send();
  }
  // Request completed, delete account was not specified
  return res.status(400).send();
});

// Publicly accessible user information. Get a user by username
router.get('/username/:username', async (req, res) => {
  const { username } = req.params;
  const account = await Account.query()
    .select('username', 'moderator', 'created_at')
    .where('username', '=', username)
    .first();
  return account ? res.status(200).json(account) : res.status(404).send();
});

export default router;