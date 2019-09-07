'use strict'

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

// Add as many video/image/audio links as you like in {Object}
const urlObj = [
  {
    'url': '<url of video/image/audio>',
    'saveAs': 'name of file you like'
  },
];

async function downloadImage(urlObj) {
  console.log('Downloading...');
  for (let i = 0; i < urlObj.length; i++) {
    const url = urlObj[i].url;

    // Make sure you have blank folder with name(whatever you like) but here 'videos' 
    const path = Path.resolve(__dirname, 'videos', `${i + 1}_${urlObj[i].saveAs}.mp4`); // Change the extension as per requirement
    const writer = Fs.createWriteStream(path);

    // Get the url and write the video incoming stream
    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    // Pipe the response (write the streamed data)
    response.data.pipe(writer);
  }
}

downloadImage(urlObj).then(() => {
  console.log(':::::Download Completed:::::');
});
