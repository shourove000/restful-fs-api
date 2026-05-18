const fs = require('fs');
const path = require('path');

const lib = {};
// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = (dir, file, data, callback) => {
  const directory = lib.baseDir + dir + '/';
  // Ensure the directory exists first
  fs.mkdir(directory, { recursive: true }, (err) => {
    if (!err) {
      // Open the file for writing
      fs.open(directory + file + '.json', 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
          const stringData = JSON.stringify(data);
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing new file');
                }
              });
            } else {
              callback('Error writing to new file');
            }
          });
        } else {
          callback(err);
        }
      });
    } else {
      callback('Error creating directory for data storage');
    }
  });
};

//read data from a file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err, data) => {
        callback(err, data);
    });
};

//update data inside a file
lib.update = (dir, file, data, callback) => {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            //truncate the file
            fs.ftruncate(fileDescriptor, (err) => {
                if (!err) {
                    //write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if (!err) {
                            fs.close(fileDescriptor, (err) => {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open the file for updating, it may not exist yet');
        }
    });
};  


lib.delete = (dir, file, callback) => {
    // Unlink the file from the filesystem
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
        callback(err);
    });
};

module.exports = lib;