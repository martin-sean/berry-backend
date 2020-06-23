import express from 'express';
import Tag from '../data/models/Tag';

const router = express.Router();

// Temporary endpoint to see all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.query()
      .select('id', 'name');
    return res.status(200).json(tags);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send();
  }
})

export default router;