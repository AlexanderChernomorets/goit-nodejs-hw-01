const { error } = require("console");
const fs = require("fs");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }
    const contacts = JSON.parse(data);
    console.log(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }
    const contacts = JSON.parse(data);

    const contact = contacts.find((contact) => {
      if (contact.id === contactId) {
        console.log(contact);
        return contact;
      }
    });

    if (contact == null) {
      console.log(`ID "${contactId}" is not found`);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    const removedContact = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (removedContact.length === contacts.length) {
      console.log(
        `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`
      );
      return;
    }

    console.log("Contact deleted successfully! New list of contacts: ");
    console.log(removedContact);

    fs.writeFile(contactsPath, JSON.stringify(removedContact, null, 2), (error) => {
      if (error) {
        return console.log("error :", error);
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
    }

    const contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);

    console.log("Contact added successfully!");
    console.log(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        return console.log(error);
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
