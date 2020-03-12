const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east'
});

const s0 = new AWS.S3({});
const upload = multer({
  storage: multerS3({
    s3: s0,
    bucket: 'wrestlechat',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(key, file, cb) {
      cb(null, file.originalname);
    }
  }),
  rename(fieldName, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();
  }
});

exports.Upload = upload;
