const express = require('express') // add library
const app = express() // call express
const port = 3000 // set port

//định nghĩa route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})