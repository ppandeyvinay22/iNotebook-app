const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')


const app = express()

connectToMongo();
const port = 5000

app.use(cors());
// app.use(cors(
//   {
//     origin: ["https://deploy-mern-1whq.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true
//   }
// ));
app.use(express.json());        //middleware hai ye

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebok backend listening on port ${port}`);
})
