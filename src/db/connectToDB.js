import mongoose from 'mongoose';

export async function connectToDB() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/nodecoin', (err) => {
      if (err) {
        throw new Error(`Error connecting to mongo: `, err.message);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
