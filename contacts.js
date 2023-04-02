const fs = require("fs/promises");
const path = require("path");


const contactsPath = path.join(__dirname, "contacts.json");


 function updateFile(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
}
 
async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
};


async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact;
};

async function removeContact(contactId) {
    const contacts = await listContacts();
    contacts.splice(contacts.findIndex(contact => contact.id === contactId), 1);
    await updateFile(contacts);
    return contacts;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    contacts.push({ ...contacts, name, email, phone });
    
    await updateFile(contacts);
    return contacts;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
