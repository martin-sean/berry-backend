import express from 'express';
import Account from '../data/models/Account';
import isAuth from '../middleware/isAuth';
import { createAccessToken } from '../utils/auth';
import { deleteClipById } from '../actions/clip';
import Clip from '../data/models/Clip';

const router = express.Router();

const usernamePattern = new RegExp('^\\w+$');

// Authorise the current user
router.get('/current', isAuth, async (req, res) => {
  try {
    const account = Account.query().findById(res.locals.userId);
    return res.status(200).json(account);
  } catch (error) {
    // User not found
    return res.status(404).send();
  }
});

// Update the current user (Just username for now)
router.patch('/current', isAuth, async (req, res) => {
  type PatchRequest = { username: string }
  const username = (req.body as PatchRequest).username;

  // Check if username is a word ([A-Za-z0-9_]*) and in range
  if (!usernamePattern.test(username) || username.length < 3 || username.length > 20) {
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
  const deleteRequest = req.body as DeleteRequest;
  const userId: number = res.locals.userId;
  
  // Check if the user really wants to delete their account
  if (!deleteRequest.deleteAccount) return res.status(422).send();

  try {
    // Create a new transaction to delete account and update related clips
    await Account.transaction(async trx => {
      // Check if clip deleting was requested
      if (deleteRequest.deleteClips) {
        // Get all clips
        const clips = await Account.relatedQuery('clipsCreated', trx).for(userId);
        // Delete all clips
        for (const clip of clips) {
          await deleteClipById((clip as Clip).id, userId, trx);
        }
      }
      // Delete account
      await Account.query(trx).deleteById(userId);
    });
    // Account successfully deleted
    console.log(`Deleted account #${ userId }`);
    return res.status(204).send();
  // Error occured during deletion, account doesn't exist or connection is broken
  } catch (error) {
    console.log(error.message);
    return res.status(500).send();
  }
});

// Publicly accessible user information. Get a user by username
router.get('/username/:username', async (req, res) => {
  const { username } = req.params;
  const account = await Account.query()
    .select('username', 'moderator', 'created_at')
    .findOne('username', '=', username);
  return account ? res.status(200).json(account) : res.status(404).send();
});

export default router;