import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import CLIENT_ID from '../authenticate/client';
import Account from '../data/models/Account';

const router = express.Router();

type AuthResponse = { idToken: string }

// Google authentication
router.get('/signin', async (req, res) => {
  const authResponse = req.body as AuthResponse;
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: authResponse.idToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userId = payload && payload['sub'];

  if (userId) {
    const account = await Account.query().findById(userId);
    if (!account) {
      await Account.query().insert({
        id: parseInt(userId),
      });
    }
  }
  // create JWT token for session
});

router.get('/users', async (req, res) => {
  res.json(await Account.query());
});

export default router;
