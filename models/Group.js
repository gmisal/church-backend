import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  meetingTime: Date,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }]
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
