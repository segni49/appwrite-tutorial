import { databases, account } from "@/utils/appwrite";
import { ID } from "appwrite";


type CreateUserAccount ={
    email: string,
    password: string,
    name: string
}

type LoginUserAccount = {
    email: string,
    password: string
}

export class AppwriteService{
    //create a new record of user inside appwrite
    async createUserAccount({email, password, name}: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if(userAccount) {
                return this.login({email, password})
            }   else {
                return userAccount
            }


        } catch (err: unknown) {
            if(err instanceof Error) {
                throw err
            }
        } }

        async login({email, password}: LoginUserAccount) {
            try {
                   return await account.createSession(email, password);  
                
            } catch (err:unknown) {
                 if(err instanceof Error){
                    throw err
                 };
            }
         }
         async isloggedIn(): Promise<boolean> {
             try {
              const data = await this.getCurrentuser()
              return Boolean(data)
             } catch (error) {}
            return false
         }
         async getCurrentuser() {
               try {
                    return account.get();
               } catch (err: unknown) {
                if(err instanceof Error) {
                    throw err
                }
               }
         }
         async logout() {

         }
}

const appwriteService = new AppwriteService()
export default appwriteService;


export async function addNote(content: string): Promise<Note> {
     const newNote = {content: content}
    
    const response = await databases.createDocument(
        'notesApp', // databaseId
        'notes',
        ID.unique(), // documentId
        newNote,
     )

    

     const note = {
      $id: response.$id,
      $createdAt: response.$createdAt,
      content: response.content,
  } 

  return note
   }  

   export async function getNotes(): Promise<Note[]> {
    const response = await databases.listDocuments(
        'notesApp', // databaseId
        'notes',
    )

    const notes = response.documents.map((note) => ({
        $id: note.$id,
        $createdAt: note.$createdAt,
        content: note.content,
    }))

    return notes
  }

  export async function deleteNote(noteId: string) {
          await databases.deleteDocument(
            'notesApp',
           'notes',
           noteId
          )
  }