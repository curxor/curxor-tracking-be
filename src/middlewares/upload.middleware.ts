// import multer from "multer";
// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage }).single("file");

// export default upload;
import multer, { StorageEngine } from "multer";
import { Request } from "express";

// Khai báo kiểu storage cho multer
const storage: StorageEngine = multer.diskStorage({
  filename: function (req: Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
    cb(null, file.originalname); // Đặt tên file là tên gốc
  },
});

// Khởi tạo multer
const upload = multer({ storage: storage }).single("file");

export default upload;
