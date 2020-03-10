const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east'
});

const S0 = new AWS.S3({});
const upload = multer({
  storage: multerS3({
    S3: S0,
    bucket: 'wrestlechat',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },
    key(key, file, cb) {
      cb(null, file.originalname);
    },
    rename(fieldName, fileName) {
      return fileName.replace(/\W+/g, '-');
    }
  })
});

exports.Upload = upload;
