import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import CLIENT_ID from '../authenticate/client';

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
});

export default router;
