/*
  Bikin folder trs lngsng -> npm init; aja ga perlu npx create-react-app nama
  pke express -> npm install express
  declare express dan app trs app.use
  pke nodemon -> npm install --save-dev nodemon
  ganti "start" di node.js jadi : "node src/index.js"
  tmbh  "dev" di node.js : "nodemon src/index.js"
  run nya -> npm run dev; selesai
*/

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// -- Latihan 3.1 --
let data = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name":"Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppedieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.status(200).send("Hello")
})

app.get('/api/persons/', (req, res) => {
  res.status(200).send(data)
})

// -- Latihan 3.2 --
app.get('/info/', (req, res) => {
  res.status(200).send({
    message: "Phonebook has info for 2 people",
    date: Date()
  })
})

// -- Latihan 3.3 --
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const dataSearch = data.find(data => data.id === id)

  if(dataSearch)
    res.status(200).send(dataSearch)
  else
    res.status(404).send({message: "Data not found!"})
})

// -- Latihan 3.4 --
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  data = data.filter(data => data.id !== id) //Cuman yang beda yg diambil
  //const message = "Data dengan id " {id}  " berhasil dihapus"

  res.status(200).send({message: "Data berhasil dihapus"})
})

// -- Latihan 3.5 --
app.post('/api/persons/', (req, res) => {
  const body = req.body
  let id = Math.random() * (100-4) + 4 // * (max - min) + min

  data.push({
    "id": parseInt(id), // to Int
    "name": body.name, // pke body krna value" in nya di taro ke var "body"
    "number": body.number //nama kiri nya bisa diganti" kyknya bebas ttp jalan klo beda
  })

  res.status(200).send({message: "Data berhasil ditambahkan"})
})

const PORT = process.env.PORT || 8080
app.listen(PORT)
console.log(`Server running on port ${ PORT }`)
