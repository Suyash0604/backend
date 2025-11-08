require('dotenv').config();
const app = require('./src/app');
const connectTODB = require('./src/db/db')

connectTODB();
// app.use(express.json());


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})