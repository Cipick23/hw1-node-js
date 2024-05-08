import fs from "node:fs/promises";
import * as path from "node:path";
import colors from "colors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "node:fs";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = `${__dirname}//db//contacts.json`;
console.log(contactsPath);

// CRUD
getContacts();

// Read
async function getContacts() {
  try {
    console.log("GET Contacts".bgBlue);
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    // const contacts = JSON.parse(contents);
    console.table(contents);
    console.log(contents.length);
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error);
  }
}

// Create
/*
    {
      "name": "Nike Air Max - Blue/Royal Purple",
      "size": 46,
      "type": "shoe"
    }
  */
// export async function createProduct(product) {
//   try {
//     const contents = await readFile(contactsPath, { encoding: "utf8" });
//     const contacts = JSON.parse(contents);
//     const newContactId = randomUUID();
//     const isValid = contact?.name && contact?.email && contact?.phone;
//     if (!isValid) {
//       throw new Error("The product does not have all required parameters!");
//     }
//     const newContact = {
//       id: newContactId,
//       ...contact,
//     };

//     contacts.push(newContact);
//     const parsedContacts = JSON.stringify(contacts);
//     await writeFile(contactsPath, parsedContacts);

//     console.log("The product has been created succesfully".bgGreen);
//   } catch (error) {
//     console.log("There is an error".bgRed.white);
//     console.error(error);
//   }
// }

// Update

// Delete

// https://immerjs.github.io/immer/update-patterns/
