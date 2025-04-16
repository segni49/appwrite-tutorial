import { Client, Databases } from "appwrite";

export const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject('67fd5bc00038416a7c94'); // Your project ID

export const databases = new Databases(client);
