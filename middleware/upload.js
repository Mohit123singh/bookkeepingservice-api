const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

// Middleware to handle file upload
const uploadFile = (req, res, next) => {
  const __ = req.__.bind(req);
  if (!req.files || !req.files.file) {
    return next(new ErrorResponse(__('file.file_missing'), 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(__('file.file_invalid'), 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(__('file.file_size'), 400));
  }

  // Create a custom filename
  file.name = `photo_${Date.now()}${path.parse(file.name).ext}`;

  // Move file to the upload path (optional for local storage)
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      return next(new ErrorResponse(__('file.file_upload_problem'), 500));
    }

    // Attach file info to request for further use in the controller
    req.file = file;
    next();
  });
};

module.exports = uploadFile;