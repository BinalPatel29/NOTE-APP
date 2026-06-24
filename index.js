import { readNotes, saveNotes } from "./storage.js";
import { addNote, listNotes, readNotes, deleteNotes, searchNotes, clearNotes } from "./commands.js";

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
            await listNotes(notes);
            break;
        case "read":
            await readNotes(target,notes);
            break;
        case "delete":
            await deleteNotes(target,notes);
            break;
        case "search":
            await searchNotes(target,notes);
            break;
        case "clear":
            await clearNotes(saveNotes);
            break;
        default:
            console.log("target");
    }
}
main();