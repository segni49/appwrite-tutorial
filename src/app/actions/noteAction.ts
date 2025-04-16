import { databases } from "@/utils/appwrite";
import { ID } from "appwrite";


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