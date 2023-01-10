const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // get id from getNextUniqueId function
  // put the text parameter into the files that we've created
  // run the callback?
  counter.getNextUniqueId((err, data) => {
    pathName = path.join(exports.dataDir, data + '.txt');
    // callback(null, {id: id,});
    // write a file using the id as the pathname
    var id = data;

    fs.writeFile(pathName, text, (err, data) => {
      if (err) {
        callback(null, 0);
      } else {
        callback(null, { id, text });
      }
    });
  });
};

exports.readAll = (callback) => {
  // create a array
  var dataArray = [];
  // iterate through exports.dataDir and push all of the id's into the array
  fs.readdir(exports.dataDir, (err, files) => {
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      dataArray.push({ id: files[i].split('.')[0], text: files[i].split('.')[0] });
      // fs.readFile(`${exports.dataDir}/${files[i]}`, 'utf8', (err, data) => {
      //   if (err) {
      //     console.log('error happening');
      //     callback(null, 0);
      //   } else {
      //     id = files[i];
      //     text = data;
      //     dataArray.push({ id, text });
      //   }
      // });
    }
    callback(null, dataArray);

  });
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
};

exports.readOne = (id, callback) => {
  // if exports.dataDir + the id isn't defined
  // callback new Error like below
  // else
  // callback like below
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
