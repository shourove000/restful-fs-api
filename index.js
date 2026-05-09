const http = require('http');


const {handleRequestResponse} = require('./helper/handleRequestResponse');
const environment = require('./helper/environments');

const data = require('./lib/data');
const app = {};
//test the file system
// @TODO: remove this test code
// data.create('test', 'newFile', {foo: 'bar'}, (err) => {
//     console.log('This was the error: ', err);
// } );

// data.read('test', 'newFile', (err, data) => {
//     console.log('This was the error: ', err);
//     console.log('This was the data: ', data);
// } );
// data.update('test', 'newFile', {fizz: 'buzz'}, (err) => {
//     console.log('This was the error: ', err);
// } );
data.delete('test', 'newFile', (err) => {
    console.log('This was the error: ', err);
} );


app.handleRequestResponse = handleRequestResponse;

app.createServer =  () => {
  const server = http.createServer(app.handleRequestResponse);
    server.listen(environment.port, () => {
      console.log(`Server running on port ${environment.port}`);
    });

}



//start the server
 app.createServer();
