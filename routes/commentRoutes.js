import express from 'express';
import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Member from '../models/Member.js';

const router = express.Router();

//Add Comments to a member

router.post('/:memberId', async (req, res) => {
  try {
    const { content } = req.body;
    const { memberId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'Comment content is required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ message: 'Invalid member ID.' });
    }

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found.' });
    }

    const comment = new Comment({ memberId, content });
    await comment.save();

    // 🔧 Instead of full save(), use $push to only update comments field
    await Member.findByIdAndUpdate(memberId, {
      $push: { comments: comment._id }
    });

    res.status(201).json({ message: 'Comment added', comment });
  } catch (error) {
    console.error('Add Comment Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//get all comments for a member
router.get('/:memberId', async (req, res) => {
    try {
        const comments = await Comment.find({ memberId: req.params.memberId }).populate('memberId');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
