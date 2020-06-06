const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const verbRoute = require('./api/verb/verb.routes')

app.use(cookieParser());
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
      origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:8081', 'http://localhost:8081', 'http://127.0.0.1:3000', 'http://localhost:3000'],
      credentials: true
  };
  app.use(cors(corsOptions));
}

app.use('/api/verb', verbRoute)

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
});