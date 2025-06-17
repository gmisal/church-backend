import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  content: String,
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
