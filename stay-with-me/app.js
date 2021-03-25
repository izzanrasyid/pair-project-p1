// const express = require('express')

// const app = express()
// const port = process.env.PORT || 3000

// app.set('view engine', 'ejs')

// app.use(express.urlencoded({ extended: false }))
// app.use(session({
//     secret: 'rahasia ya ges',
//     resave: false,
//     saveUninitialized: true
// }))

// app.use(route)

// app.get('/', (req, res) => {
//     res.send('test koneksi')
// })
// app.listen(port, () => {
//     console.log('this server running on: ', port)
// })

const express = require('express')
const route = require('./routes')
const session = require('express-session')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'rahasia ya ges',
    resave: false,
    saveUninitialized: true
}))

app.use(route)

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})