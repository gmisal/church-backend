import express from 'express';
import Member from '../models/Member.js';

const router = express.Router();

//get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().populate('comments').populate('groupId');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add a new member
router.post('/', async (req, res) => {
    const member = new Member(req.body);
    try {
        const savedMember = await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Edit a member
router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json(member);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//Delete a member
router.delete('/:id', async (req, res) => {
    try {
        const deletedMember = await Member.findByIdAndDelete(req.params.id);
        if (!deletedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get Birthdays
router.get('/birthdays', async (req, res) => {
    try {
        const today = new Date();
        const members = await Member.find();
        const upcomingBirthdays = members.filter(member => {
            const dob = new Date(member.dob);
            // Check if the birthday is this month and within the next 7 days
            return dob.getMonth() === today.getMonth() && 
                   dob.getDate() >= today.getDate() && 
                   dob.getDate() <= today.getDate() + 7;
        });
        res.status(200).json(upcomingBirthdays);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;