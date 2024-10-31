import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    data: { type: Array, default: [] },
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model('News', newsSchema);
export default News;
