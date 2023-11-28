const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB,)
    .then(()=>app.listen(PORT, ()=>console.log(`Server running on port :${PORT}`)))
    .catch((err)=>console.log(err.message));


process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});