import mongoose from 'mongoose';

const TriviaResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const TriviaResult = mongoose.model('TriviaResult', TriviaResultSchema);
export default TriviaResult;