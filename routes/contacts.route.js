const express = require('express')
const router = express.Router()
const { getContacts, saveContacts } = require('../helpers/utils.js')

router.get('/add', (req, res) => {
	res.render('add', { title: 'Add' })
})
router.post('/add', (req, res) => {
	const contacts = getContacts()
	console.log(req.body)
	const { name, email, mobile } = req.body
	const id = global.crypto.randomUUID()
	const newContact = {
		id,
		name,
		email,
		mobile,
	}
	contacts.push(newContact)
	saveContacts(contacts)
	res.redirect('/')
})

router.get('/edit/:id', (req, res) => {
	const id = req.params.id
	const contacts = getContacts()
	const currentContact = contacts.find(c => c.id === id)
	if (!currentContact) return res.status(404).send('Contact not found')
	res.render('edit', { id, title: 'Edit', contact: currentContact })
})
router.post('/edit/:id', (req, res) => {
	const contacts = getContacts()
	const id = req.params.id
	const { name, email, mobile } = req.body
	const updatedContacts = contacts.map(c => {
		if (c.id === id) {
			return { ...c, name, email, mobile }
		}

		return c
	})
	saveContacts(updatedContacts)
	res.redirect('/')
})

router.post('/delete/:id', (req, res) => {
	const id = req.params.id
	const contacts = getContacts()
	const updatedContacts = contacts.filter(c => c.id !== id)
	saveContacts(updatedContacts)
	res.redirect('/')
})

module.exports = router
