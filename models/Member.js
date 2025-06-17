import mongoose from 'mongoose';
import { type } from 'os';

const memberSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type:String, required: true},
  dob: {type: Date, required: true},
  email: { type: String, required: false, unique: false}, 
  phone: { type: String, required: true, unique: false },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
