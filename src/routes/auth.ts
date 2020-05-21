import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { createAccessToken, RefreshToken, sendRefreshToken, clearRefreshToken } from '../utils/auth';
import Account from '../data/models/Account';
import { verify } from 'jsonwebtoken';
const router = express.Router();

export const CLIENT_ID = "308764093187-1tds1qnccfdit8bfs2f3q8cv7h405dt9.apps.googleusercontent.com";


// Login or create an account when user clicks the google sign in button
router.post('/login', async (req, res) => {
  type AuthResponse = { idToken: string }

  const authResponse = req.body as AuthResponse;
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: authResponse.idToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const exteralId = payload && payload['sub'];

  // Confirm that exteral id was included in the request
  if (exteralId) {
    // Search for an account with the external id
    let account = await Account.query().where({ external_id: exteralId }).first();
    // Create a new account if one does not exist
    if (!account) {
      console.log(`Creating account`)
      account = await Account.query().insert({
        external_id: exteralId,
      });
    }
    // Issue a new refresh token in a httponly cookie
    sendRefreshToken(res, account);
    // Issue a new access token
    return res.status(200).send(createAccessToken(account));
  }
  // Login request could not be completed
  return res.status(400).send();
});


// Refresh an expired access token
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.rid as string;
  // No refresh token
  if (!refreshToken) {
    return res.status(401).send();
  }

  let payload: RefreshToken;
  try {
    payload = verify(refreshToken, process.env.RT_SECRET!) as RefreshToken;
    const account = await Account.query().findById(payload.userId);
    // Validate account exists for id
    if (!account) throw new Error("Account could not be found");

    // Send a new refresh token
    sendRefreshToken(res, account);
    // Return a new access token
    return res.status(200).send(createAccessToken(account));
  } catch (error) {
    console.log(error);
    return res.status(401).send();
  }
});

// Clear the user's refresh cookie to log the user out
router.get('/logout', async (req, res) => {
  return clearRefreshToken(res);
});

// Get a list of the current users for testing purposes
router.get('/users', async (req, res) => {
  res.json(await Account.query());
});

export default router;
