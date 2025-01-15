import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678666220022ac3fe0da");

const account = new Account(client);

export { account, client };
