import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise
console.log("MONGO URI=",config.mongoUri)
mongoose.connect(config.mongoUri,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  };  
  console.info('Server started on port %s.', config.port+"\u{1F680}\u{1F680}\u{1F680}")
});