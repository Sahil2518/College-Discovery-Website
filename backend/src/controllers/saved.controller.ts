import { Response, NextFunction } from 'express';
import { SavedService } from '../services/saved.service';
import { ApiResponse } from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

const savedService = new SavedService();

export class SavedController {
  async getSaved(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const saved = await savedService.getSavedColleges(req.userId!);
      res.json(ApiResponse.success(saved));
    } catch (err) { next(err); }
  }

  async saveCollege(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await savedService.saveCollege(req.userId!, req.body.collegeId);
      res.status(201).json(ApiResponse.success(result));
    } catch (err) { next(err); }
  }

  async removeCollege(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await savedService.removeCollege(req.userId!, Number(req.params.collegeId));
      res.json(ApiResponse.success({ message: 'College removed from saved' }));
    } catch (err) { next(err); }
  }

  async getSavedIds(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ids = await savedService.getSavedIds(req.userId!);
      res.json(ApiResponse.success(ids));
    } catch (err) { next(err); }
  }
}
