import { config, database } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

class HomeService {
  async getAllHost(): Promise<any> {
    try {
      const posts = await database.listDocuments(config.databaseId, config.videoCollectionId,);
      return posts.documents;
    } catch (error: any) {
      throw new Error(error);
    }

  }

  async getTrendingVideos(): Promise<any> {
    try {
      const posts = await database.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7),],);
      return posts.documents;
    } catch (error: any) {
      throw new Error(error);
    }

  }
}


export default HomeService;