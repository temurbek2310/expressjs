const path = require('path')
const fs = require('fs')

const contact_file = path.join(__dirname, '..', 'data', 'contact.json')

function getContacts() {
	if (!fs.existsSync(contact_file)) return []
	const data = fs.readFileSync(contact_file, 'utf8')
	return JSON.parse(data || '[]')
}

function saveContacts(contact) {
	fs.writeFileSync(contact_file, JSON.stringify(contact, null, 2))
}

module.exports = { contact_file, getContacts, saveContacts }
