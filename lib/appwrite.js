import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.dlysachenko.aora',
  projectId: '66fcf43f0028fb7ab50c',
  databaseId: '66fcf5e3002437d887dc',
  userCollectionId: '66fcf6170037ba23fba0',
  videosCollectionId: '66fcf63e001d73ab9eb7',
  storageId: '66fcf9270006e444cb46',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databeses = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await SignIn(email, password);

    const newUser = await databeses.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
  } catch (error) {
    console.log(error);
  }

  return newUser;
};
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
    const avatarUrl = avatars.getInitials(username);

    await SignIn();
  } catch (error) {
    console.log(error);
  }
};
