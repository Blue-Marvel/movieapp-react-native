import { account, avatars, config, database } from "@/lib/appwrite";
import { ID, Query } from "react-native-appwrite";

class AuthService {


  async createUser(username: string, email: string, password: string): Promise<any> {
    try {
      const newAccount = await account.create(ID.unique(), email, password, username);
      if (!newAccount) throw Error;

      const avatarUrl = avatars.getInitials(username);
      await this.signIn(email, password);

      const newUser = await database.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          username,
          avatar: avatarUrl,
        }
      );
      return newUser;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);

    }
  }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }


  async getCurrentUser(): Promise<any> {
    try {
      const currentUser = await account.get();

      if (!currentUser) throw new Error;

      const currentUserData = await database.listDocuments
        (
          config.databaseId,
          config.userCollectionId,
          [Query.equal('accountId', currentUser.$id)]
        )

      if (!currentUserData) throw Error;

      return currentUserData.documents[0]
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message);
    }
  }
}


export default AuthService;