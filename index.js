import { readNotes, saveNotes } from "./storage.js";
import { addNote, listNotes, readNotes, deleteNotes, searchNotes, clearNotes } from "./commands.js";

export async function main(){
    const argv = process.argv.slice(2);
    const action = argv[0];
    const target = argv [1];
    const notes =await readNotes();
}
main();