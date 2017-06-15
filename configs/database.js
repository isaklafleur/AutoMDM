const mongoose = require('mongoose');

const port = '27017';
const dbName = 'autoMDM';

// connect to the database
mongoose.connect(`mongodb://localhost:${port}/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${dbName} database`);
});
