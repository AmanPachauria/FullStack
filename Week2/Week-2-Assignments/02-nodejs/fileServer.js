/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */


const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let port = 3002;

// Function to send an error response
function sendErrorResponse(res, statusCode, errorMessage) {
  res.status(statusCode).send(errorMessage);
}

// Function to start the server
function startServer(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


// GET /files - Returns a list of files in the ./files/ directory
app.get('/files', (req, res) => {
  // Construct the path to the file directory
  const directoryPath = path.join(__dirname, 'files');

  // Read the list of files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      sendErrorResponse(res, 500, 'An error occurred during reading files.');
    } else {
      res.status(200).json(files);
    }
  });
});

// GET /file/:filename - Returns content of the given file by name
app.get('/file/:filename', (req, res) => {
  const requestedFile = req.params.filename;
  const filePath = path.join(__dirname, 'files', requestedFile);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      sendErrorResponse(res, 404, 'File not found');
    } else {
      // Read and send the file content if found
      fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
          sendErrorResponse(res, 500, 'Error reading the file');
        } else {
          res.status(200).send(fileContent);
        }
      });
    }
  });
});

// For any other route not defined, return 404
app.use((req, res) => {
  sendErrorResponse(res, 404, "Route not found");
});


// Attempt to start the server on port 3000, and if it's already in use, try the next port
function startServerOnPort() {
  app.listen(port, (err) => {
    if (err) {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying the next port...`);
        port += 1;
        startServerOnPort(); // Try the next port
      } else {
        console.error(err);
        // Exit the process if you couldn't start the server after trying all available ports
        process.exit(1);
      }
    } else {
      console.log(`Server is running on port ${port}`);
    }
  });
}


// Start the server on port 3000, or the next available port if 3000 is in use
startServerOnPort();

module.exports = app;
