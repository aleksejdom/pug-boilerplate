const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const path = require('path')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))
app.use(errorHandler())



const handleLinkResolver = doc => {
  if (doc.type === 'contact') {
    return '/contact/'
  }
  return '/'
}

app.use((req, res, next) => {
  res.locals.Link = handleLinkResolver
  next()
})

app.get('/', (req, res) => {
  res.render('pages/home', {
  })
})
app.get('/contact/', (req, res) => {
  res.render('pages/contact', {
  })
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
