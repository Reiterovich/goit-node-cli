import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

import * as contacts from "./src/contacts.js";

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContact = await contacts.listContacts();
      return console.log(allContact);
      break;

    case "get":
      const getContact = await contacts.getContactById(id);
      return console.log(getContact);
      break;

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      return console.log(addContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
