import express from 'express';
import isAuth from '../middleware/isAuth';
import isMod from '../middleware/isMod';
import Clip from '../data/models/Clip';

const router = express.Router();
 
/**
 * Delete a clip
 */
router.delete('/clip/:id', isAuth, isMod, async (req, res) => {
  const { id } = req.params;
  try {
    await Clip.query().deleteById(id);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send();
  }
});

export default router;