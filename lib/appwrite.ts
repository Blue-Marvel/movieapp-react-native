import { Account, Avatars, Client, Databases } from 'react-native-appwrite';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.json.aora",
  projectId: "669fd6ca002a0d5fd248",
  databaseId: '669fd8dc00380a3a0c06',
  userCollectionId: "669fd94a002d317fffb4",
  videoCollectionId: "669fd98a001dfb0315ac",
  storageId: "669fdb3b0015590cc39b",
}

// Init your React Native SDK
export const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId)
  .setPlatform(config.platform) // YOUR application ID
  ;

export const account = new Account(client);
export const avatars = new Avatars(client);
export const database = new Databases(client);