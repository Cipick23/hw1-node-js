// import {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
// } from "./contacts.js";
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";

// const argv = yargs(hideBin(process.argv))
//   .command("list", "List all contacts")
//   .command("get", "Get contact by ID", {
//     id: {
//       describe: "Contact ID",
//       demandOption: true,
//       type: "string",
//     },
//   })
//   .command("add", "Add a new contact", {
//     name: {
//       describe: "Contact name",
//       demandOption: true,
//       type: "string",
//     },
//     email: {
//       describe: "Contact email",
//       demandOption: true,
//       type: "string",
//     },
//     phone: {
//       describe: "Contact phone",
//       demandOption: true,
//       type: "string",
//     },
//   })
//   .command("remove", "Delete contact by ID", {
//     id: {
//       describe: "Contact ID",
//       demandOption: true,
//       type: "string",
//     },
//   })
//   .demandCommand()
//   .help().argv;

// async function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     // case "--action":
//     case "list":
//       await listContacts();
//       break;

//     case "get":
//       await getContactById(id);
//       break;

//     case "add":
//       const newContact = await addContact(name, email, phone);
//       console.log("New contact added:");
//       console.log(newContact);
//       break;

//     case "remove":
//       await removeContact(id);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("action", {
    alias: "a",
    describe: "Choose action",
    choices: ["list", "get", "add", "remove"],
    demandOption: true,
  })
  .option("id", {
    alias: "i",
    describe: "User ID",
    type: "string",
  })
  .option("name", {
    alias: "n",
    describe: "User name",
    type: "string",
  })
  .option("email", {
    alias: "e",
    describe: "User email",
    type: "string",
  })
  .option("phone", {
    alias: "p",
    describe: "User phone",
    type: "string",
  }).argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        break;
      case "get":
        const contact = await getContactById(id);

        break;
      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(
          `Contact with name: ${name}, email: ${email}, phone: ${phone} added!`
        );
        break;
      case "remove":
        await removeContact(id);
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
        break;
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

invokeAction(argv);
