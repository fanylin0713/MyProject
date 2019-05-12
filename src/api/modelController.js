import React from 'react';
import PropTypes from 'prop-types';


//.env - Holds your secret keys
const AIRTABLE_BASE_ID="appcXtOTPnE4QWIIt"
const AIRTABLE_API_KEY="keyA7EKdngjou4Dgy"

const CLOUDINARY_URL="cloudinary://232947559366573:UqMIBbdRtXA5S8a1CJDUg9lWIjU@djxmkwdsx"

// index.js - Our routes
// router.post('/models',
//   modelController.upload,
//   modelController.resize,
//   modelController.createModel);

// modelController.js 
var multer = require('multer');
var cloudinary = require('cloudinary-core').v2;
var Airtable = require('airtable');

var multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed"}, false);
    }
  }
};


var base = new Airtable({
  apiKey: "keyA7EKdngjou4Dgy",
}).base("appcXtOTPnE4QWIIt");
var tableName = 'Models';
var viewName = 'Grid view';

exports.getModels = (req, res, next) => {
  const page = req.params.page || 1;
  const limit = 25;
  const offset = (page * limit) - limit;

  base('Models').select({
      view: 'Grid view',
      pageSize: limit
  }).eachPage(function page(records, fetchNextPage) {
    fetchNextPage();
  }, function done(err) {
    if(err) { console.error(err); return; }

  });
}

exports.getModel = (req, res) => {
  base('Models').find(req.params.id, function(err, record) {
    if (err) { console.error(err); return; }
    var model = record.fields;
    res.render('model', {title: 'Model', model});
  });
}


exports.upload = multer(multerOptions).fields([{name:'headshots', maxCount: 5}, {name:'bodyshots', maxCount: 5}]);

exports.resize = (req, res, next) => {
  if(!req.files) {
    next();
    return;
  }

  const fileObjects = req.files;

  // Helper function
  function uploadToCloudinary(image) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          width: 800,
          crop: 'scale',
          quality: 80
        },
        function(error, result){
          console.log(result.url, error);
          if(error) {
            reject(error);
          } else {
            resolve({"url":result.url});
          }
        }
      ).end(image.buffer);
    })

  }

  let counter = 0;
  for (const fieldname in fileObjects) {
    const images = fileObjects[fieldname];
    let promises = images.map((image) => {
      return uploadToCloudinary(image);
    });

    Promise.all(promises)
      .then(res => {
        counter = counter + 1;
        req.body[fieldname] = res;
        if(counter == 2) {
          next(); // This then calls the createModel after all promises of the for loop are resolved
        }
      })
      .catch(err => {
        console.log(err);
      })

  }

}


exports.createModel = (req, res) => {
  let skills = [];

  if(typeof req.body.skills === 'string') {
    skills.push(req.body.skills);
    req.body.skills = skills;
  }

  base('Models').create({
    "Full Name": req.body.fullname,
    "Parent/Guardian Full Name": req.body.parent,
    "Birth Date": req.body.birthdate,
    "Gender": req.body.gender,
    "Primary Contact": req.body["phone-number"],
    "Email Address": req.body.email,
    "Skills": skills,
    "Ethnicity": req.body.ethnicity,
    "Headshot": req.body.headshots,
    "Full Body Shot": req.body.bodyshots
  }, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record.getId());
      res.redirect(`/model/${record.getId()}`);
  });

}

class modelController extends React.Component {
    render() {
        return(
            <form class="signUpForm" action="/models" method="POST" enctype="multipart/form-data">
                <div class="field">
                    <div class="file has-name is-boxed"><label class="file-label"><input class="file-input" type="file" name="headshots" multiple="multiple" accept="image/png, image/jpeg"/><span class="file-cta"><span class="file-icon"><i class="fas fa-upload"></i></span><span class="file-label">Upload Headshots</span></span><span class="file-name">5 Maximum</span></label></div>
                </div>
                <div class="field">
                    <div class="file has-name is-boxed"><label class="file-label"><input class="file-input" type="file" name="bodyshots" multiple="multiple"/><span class="file-cta"><span class="file-icon"><i class="fas fa-upload"></i></span><span class="file-label">Upload Full Bodyshots</span></span><span class="file-name">5 Maximum</span></label></div>
                </div>
            </form>

        );
    }

}
modelController.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (modelController);