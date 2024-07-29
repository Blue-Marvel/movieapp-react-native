import { Models } from "react-native-appwrite";

export default interface HomeHostData extends Models.Document {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: Creator;
}

export interface Creator {
  username: string;
  avatar: string;
}