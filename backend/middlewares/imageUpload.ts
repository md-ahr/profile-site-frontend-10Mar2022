import { Request, Response, NextFunction } from 'express';
import uploader from '../utilities/fileUploader';

function imageUpload(req: Request, res: Response, next: NextFunction) {
  const upload = uploader(
    ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'],
    10000000,
    'only .jpg, jpeg, svg or png format allowed!'
  );
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({ success: 0, message: err.message });
    } else {
      next();
    }
  });
}

export default imageUpload;
