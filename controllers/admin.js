module.exports = function(formidable, show, aws) {
  return {
    SetRouting: function(router) {
      router.get('/dashboard', this.adminPage);

      router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
      router.post('/dashboard', this.adminPostPage);
    },

    adminPage: function(req, res) {
      res.render('admin/dashboard');
    },

    adminPostPage: function(req, res) {
      const newShow = new show();
      newShow.name = req.body.show;
      newShow.brand = req.body.brand;
      newShow.image = req.body.upload;
      newShow.save(err => {
        res.render('admin/dashboard');
      });
    },

    uploadFile: function(req, res) {
      const form = new formidable.IncomingForm();
      //form.uploadDir = path.join(__dirname, '../public/uploads');

      form.on('file', (field, file) => {
        // fs.rename(file.path, path.join(form.uploadDir, file.name), err => {
        //   if (err) throw err;
        //   console.log('File renamed successfully');
        // });
      });

      form.on('error', err => {
        console.log(err);
      });

      form.on('end', () => {
        console.log('File upload is successful');
      });

      form.parse(req);
    }
  };
};
