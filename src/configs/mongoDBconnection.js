const mongodb = require("mongoose")
mongodb.connect(process.env.mongoDBurl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(success => console.log("mongoDB bağlandı"))
  .catch(err => console.log(err))