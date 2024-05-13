import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .command("--action list", "List all contacts")
  .command("get", "Get contact by ID", {
    id: {
      describe: "Contact ID",
      demandOption: true,
      type: "string",
    },
  })
  .command("add", "Add a new contact", {
    name: {
      describe: "Contact name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Contact email",
      demandOption: true,
      type: "string",
    },
    phone: {
      describe: "Contact phone",
      demandOption: true,
      type: "string",
    },
  })
  .command("remove", "Delete contact by ID", {
    id: {
      describe: "Contact ID",
      demandOption: true,
      type: "string",
    },
  })
  .demandCommand()
  .help().argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "--action":
    case "list":
      await listContacts();
      break;

    case "get":
      await getContactById(id);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("New contact added:");
      console.log(newContact);
      break;

    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
