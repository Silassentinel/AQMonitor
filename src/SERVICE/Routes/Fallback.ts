/**
 * This file is the fallback for all routes that are not found.
 */
import express, {Request, Response} from 'express';
const router = express.Router();

router.get('*', (req: Request, res: Response) => {
  res.status(404).redirect('/home');
});
router.post('*', (req: Request, res: Response) => {
  res.status(404).redirect('/home');
});
export default router;
