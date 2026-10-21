require('dotenv').config()
const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const { getContacts } = require('./helpers/utils')
const session = require('express-session')

const PORT = process.env.PORT || 3000

const app = express()

// view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// false - oddiy formatda data lar qabul qiladi
// true - nested object
app.use(express.static(path.join(__dirname, 'public')))
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: {},
	}),
)
app.use((req, res, next) => {
	res.locals.message = req.session.message
	delete req.session.message
	next()
})

// Routes
app.get('/', (req, res) => {
	console.log(req.session)
	if (req.session.views) {
		req.session.views += 1
	} else {
		req.session.views = 1
	}
	const contacts = getContacts()
	res.render('home', { title: 'Home Page', contacts, views: req.session.views })
})
app.use('/contacts', require('./routes/contacts.route'))
app.listen(PORT, () => console.log(`Server is runnning on port: ${PORT}`))
