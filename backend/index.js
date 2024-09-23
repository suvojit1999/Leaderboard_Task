import express from 'express'
import cors from 'cors'
import api from "./api/claimPoints.js"
import 'dotenv/config'
const app = express()
const port = process.env.PORT || 3000


// app.use(cors({
//   origin: ['http://localhost:5173'],
//   methods: ['POST', 'GET']
// }))
// app.use(cors({
//   origin: ['https://reliable-rabanadas-1e97c2.netlify.app/'],
//   methods: ['POST', 'GET']
// }))
app.use(cors())

app.use(express.json())
app.use('/', api)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
