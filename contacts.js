// import fs from "fs/promises";
// import path from "path";

// // const path = require("path");

// const contactsPath = path.resolve("contacts.json");
// console.log(contactsPath);

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("src", "db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

// listContacts();

async function getContactById(id) {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === id);
  // console.log(result);
  return result || null;
}

// getContactById("drsAJ4SHPYqZeG-83QTVW");

async function addContact(name, email, phone) {
  const contact = await listContacts();
  const id = nanoid();

  const newContact = {
    id: id,
    name: name,
    email: email,
    phone: phone,
  };

  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  const contactAdd = await getContactById(id);
  console.log(contactAdd);
  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту (з id).
}

// addContact("Andrii4", "Andrii@mail2", "0678022263");

export async function removeContact(contactId) {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  console.log(result);
  return result;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

removeContact("rsKkOQUi80UsgVPCcLZZW");
