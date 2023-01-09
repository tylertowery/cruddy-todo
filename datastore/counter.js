const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////
// use readCounter and writeCounter functions
// probably need the zeroPaddedNumber in there, although it is already being used in writeCounter

exports.getNextUniqueId = (callback) => {
  // call readcounter, will get data
  readCounter( (err, data) => {
    if (err) {
      callback(null, 0);
    } else {
      console.log('line47', data);
      let newData = ++data;
      console.log('line49', newData);
      writeCounter(newData, (err, data) => {
        if (err) {
          callback(null, 0);
        } else {
          callback(null, data);
        }
      });
    }
  }); // increment the data
  // call write counter with incremented data
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
