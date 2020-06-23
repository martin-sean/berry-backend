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
    if (isNaN(id as any)) throw Error("id must be a number");
    await Clip.query().deleteById(id);
    // TODO: Delete tags
    return res.status(200).send();
  } catch (error) {
    console.error(error.message);
    return res.status(400).send();
  }
});

export default router;