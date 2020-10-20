const Dotenv = require('dotenv-webpack');
const path = require('path');


module.exports = {
    entry: './src/coronavirusData.js',

    output: {
        
        path: path.resolve(__dirname, 'dist'),
      
        filename: 'bundle.js'
  },

  mode: 'development',

  plugins: [
    new Dotenv({
        safe: true
    })
  ]
  
};

