const env = require('../config/env');
const connectToDatabase = require('../config/db');
const app = require('./app');
connectToDatabase();

app.listen(env.app_port, () =>
  console.log(`server running on port ${env.app_port}`)
);
