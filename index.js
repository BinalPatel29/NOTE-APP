import { readNotes, saveNotes } from "./storage.js";
import { addNote, listNote, readNote, deleteNote, searchNote, clearNote } from "./commands.js";

export async function main(){
    const argv = process.argv.slice(2);
    const action = argv[0];
    const target = argv [1];
    const notes =await readNotes();

    switch(action){
        case "add":
            await addNote(target,notes,saveNotes);
            break;
        case "list":
            await listNote(notes);
            break;
        case "read":
            await readNote(target,notes);
            break;
        case "delete":
            await deleteNote(target,notes,saveNotes);
            break;
        case "search":
            await searchNote(target,notes);
            break;
        case "clear":
            await clearNote(notes,saveNotes);
            break;
        default:
            console.log("target");
    }
}
main();