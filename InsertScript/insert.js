const db = require("../app/models");
const BMIData = db.BMIData;
const BMISeedData = require("./BMIData.json")
const dbConfig = require("../app/config/db.config");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    BMIData.insertMany(BMISeedData,(err, doc)=>{
        if(err){
            console.log('insert seed data failed');
            process.exit(1)
        } else {
            console.log('successfully loaded data');
            process.exit(0)
        }
    })
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });