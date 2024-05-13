import fs from "fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "url";
import colors from "colors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFolderPath = path.join(__dirname, "db");
const contactsPath = path.join(dbFolderPath, "contacts.json");

async function listContacts() {
  try {
    console.log("GET Contacts".bgBlue);

    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);

    console.table(contacts); // Afiseaza lista de contacte sub forma de tabel

    return contacts; // Returnează lista de contacte pentru utilizări ulterioare
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);

    console.log(`GET Contact with ID ${contactId}`.bgBlue); // Confirmare că funcția este apelată

    const contact = contacts.find((c) => c.id === contactId);

    if (!contact) {
      throw new Error(`Contact with ID ${contactId} not found.`);
    }

    console.log(contact); // Afișează detaliile contactului găsit

    return contact;
  } catch (error) {
    console.error("Error getting contact:", error);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    let data = await fs.readFile(contactsPath, { encoding: "utf8" });
    let contacts = JSON.parse(data);

    // Filtrăm lista de contacte pentru a elimina contactul cu ID-ul dat
    const filteredContacts = contacts.filter((c) => c.id !== contactId);

    if (contacts.length === filteredContacts.length) {
      throw new Error(`Contact with ID ${contactId} not found.`);
    }

    // Suprascriem fișierul cu lista actualizată de contacte (fără contactul eliminat)
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

    console.log(`Contact with ID ${contactId} removed successfully.`);
  } catch (error) {
    console.error("Error removing contact:", error);
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    console.log("CREATE Contact".bgBlue);

    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);

    const newContactId = randomUUID();

    const newContact = {
      id: newContactId,
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("New contact added:");
    console.table([newContact]); // Afișează detaliile noului contact adăugat

    console.log("Contact created successfully".bgGreen);

    return newContact; // Returnăm noul contact adăugat pentru utilizare ulterioară
  } catch (error) {
    console.log("Error creating contact:".bgRed.white);
    console.error(error);
    throw error;
  }
}

export { listContacts, getContactById, addContact, removeContact };
