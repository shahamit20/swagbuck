const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const path = require('path')
const Detail = require("./models/detail");
const port = 3000


mongoose.connect('mongodb://localhost:27017/userdata')
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(express.static(path.join(__dirname)))
const md = mongoose.connection
md.once('open',()=>{
    console.log("conncetion")
})

app.get('/reg', (req, res) => {
  res.sendFile(path.join(__dirname,'regitation.html'))
})
app.post('/post', async (req, res) => {
    const {Name,Email,Phone,Age,Password} = req.body
    const user = new Detail({
        Name,
        Email,
        Phone,
        Age,
        Password
    })
    await user.save()
    console.log(user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})