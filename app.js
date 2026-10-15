require('dotenv').config()
const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const { getContacts } = require('./helpers/utils')

const PORT = process.env.PORT || 3000

const app = express()

// view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Routes

app.get('/', (req, res) => {
	const contacts = getContacts()
	res.render('home')
})
app.use('/contacts', require('./routes/contacts.route'))
app.listen(PORT, () => console.log(`Server is runnning on port: ${PORT}`))
