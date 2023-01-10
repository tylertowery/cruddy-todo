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
};

exports.readOne = (id, callback) => {
  let currentDir = `${exports.dataDir}/${id}.txt`;
  if (!fs.existsSync(currentDir)) {
    console.log('error');
    callback(new Error(`No item with id: ${id}`));
  } else {
    fs.readFile(currentDir, 'utf8', (err, data) => {
      if (err) {
        console.log('error has occur');
        callback(null, 0);
      } else {
        console.log('line 70: ', data);
        var text = data;
        callback(null, { id, text });
      }
    });
  }
};

exports.update = (id, text, callback) => {
  // basically the same as create
  // if the id is already taken it will just save over it and create a new file at that destination

  var pathName = path.join(exports.dataDir, id + '.txt');
  if (!fs.existsSync(pathName)) {
    console.log('No file exists with the given name.');
    callback(new Error(`No item with id: ${id}`));
  } else {
    fs.writeFile(pathName, text, (err, data) => {
      if (err) {
        callback(null, 0);
      } else {
        callback(null, { id, text});
      }
    });
  }
};

exports.delete = (id, callback) => {
  // access the file using the id
  // delete the file using fs.unlink()
  var pathName = path.join(exports.dataDir, id + '.txt');
  if (!fs.existsSync(pathName)) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    fs.unlink(pathName, err => {
      if (err) {
        callback(null, 0);
      } else {
        callback();
      }
    });
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
