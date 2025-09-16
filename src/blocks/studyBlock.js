import mongoose from 'mongoose';

const StudyBlockSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  notified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.StudyBlock || mongoose.model('StudyBlock', StudyBlockSchema);
