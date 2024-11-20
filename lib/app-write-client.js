import { Client, Databases } from "appwrite";
const dbClient = new Client();
dbClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66f2c08e0024ae6447a5");
export const databases = new Databases(dbClient);
