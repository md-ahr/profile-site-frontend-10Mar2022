import multer from 'multer';
import path from 'path';

function fileUploader(allowed_file_types: string[], max_file_size: number, error_msg: string) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '');
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + '-' + Date.now();
      cb(null, fileName + fileExt);
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        throw new Error(error_msg);
      }
    },
  });
  return upload;
}

export default fileUploader;