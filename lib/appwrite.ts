import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.burmesebites.foodordering",
    databaseId: "68886a8e000de92f769c",
    userCollectionId: "68886a9f003cc78aa5fd",
    categoriesCollectionId: "6889b08d0018592f2960",
    menuCollectionId: "6889b10c000ea3d3da95",
    customizationsCollectionId: "6889b3b5000feb098918",
    menuCustomizationsCollectionId: "6889b602003aa8cb7aaa",
    bucketId: "6889b70b000633397999"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

    console.log(`--- Initializing Appwrite Client ---`);
console.log(`Endpoint: ${appwriteConfig.endpoint}`);
console.log(`Project ID being used: '${appwriteConfig.projectId}'`); // Key log
console.log(`------------------------------------`);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

const avatars = new Avatars(client);

export const createUser = async ({name, email, password}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                name,
                email,
                accountId: newAccount.$id,
                avatar: avatarUrl.href
            })

         return newUser;
    } catch (e) {
        throw new Error(String(e));
    }
}


export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        // return session;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        throw new Error(String(error));
    }
}


export const getMenu = async ({category, query}: {category?: string, query?: string}) => {
    try {
        const queries: string[] = [];
        if(category) {
            queries.push(Query.equal('categories', category));
        }
        if(query) {
            queries.push(Query.search('name', query));
        }

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )
        return menus.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const getCategory = async() => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        );
        return categories.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}