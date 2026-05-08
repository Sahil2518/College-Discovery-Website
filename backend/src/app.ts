import express from 'express';
import cors from 'cors';
import collegeRoutes from './routes/college.routes';
import courseRoutes from './routes/course.routes';
import examRoutes from './routes/exam.routes';
import authRoutes from './routes/auth.routes';
import savedRoutes from './routes/saved.routes';
import reviewRoutes from './routes/review.routes';
import compareRoutes from './routes/compare.routes';
import articleRoutes from './routes/article.routes';
import statsRoutes from './routes/stats.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/colleges', collegeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/stats', statsRoutes);

// Error handling
app.use(errorMiddleware);

export default app;
