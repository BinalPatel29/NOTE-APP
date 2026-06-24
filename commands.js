export async function addNote(){
    if (!target) {
        console.log(chalk.red("Error: Please specify a task description to add."));
        return;
    }
    const now = new Date();
    const dateStr = `$(String(now.getDate()).padStart(2,"0")}/ ${String(now.getMonth() +1).padStart(2, "0")}/ ${now.getFullYear()})`;
    const newNote = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
        text: target,
        createdAt: dateStr
    };
    notes.push(newNote);
    await saveNotes(notes);
    console.log(chalk.green(`Task added: ${target}`));
}

export async function listNotes(){
    if(notes.length === 0){
            console.log(chalk.yellow("No notes saved yet."));
        }
    notes.forEach((note) => {
        if (note.text.length > 40) {
          console.log(chalk.green(`${note.text.slice(0, 40)}...`));
        } else {
          console.log(`${note.id}. ${chalk.yellow(note.createdAt)} - ${chalk.blue.bold(note.text)} `);
        }
     });
}

export async function readNotes(){
    if (!target) {
        console.log(chalk.red("Error: please provide a note ID."));
        return;
    }
    const noteId = Number(target);
    if (!Number.isInteger(noteId) || noteId <= 0) {
        console.log(chalk.red("Error: note ID must be a positive integer."));
        return;
    }
    const noteToRead = notes.find((note) => note.id === noteId);
      if (!noteToRead) {
        console.log(chalk.yellow(`ID ${noteId} not found.`));
        return;
    }
    console.log(`${noteToRead.id}. ${chalk.yellow(noteToRead.createdAt)} - ${chalk.blue.bold(noteToRead.text)}`);
}

export async function deleteNotes(){
    const idToDelete = parseInt(target);
    const initialiseLength = notes.length;
    const filternotes = notes.filter((note) => note.id !==idToDelete );  
    if(filternotes.length === initialiseLength){
        console.log(chalk.red("Error: Note ID not found."));
        return;
    }
    await saveNotes(filternotes);
    console.log(`${idToDelete} was deleted successfully.`);
}

export async function searchNotes(){
    const keyword = target.toLowerCase();
    const matchedNotes = notes.filter((note) => note.text.toLowerCase().includes(keyword) || note.createdAt.toLowerCase().includes(keyword) || String(note.id) === keyword);

    if (matchedNotes.length === 0) {
        console.log(chalk.yellow(`No notes found matching "${target}".`));
        return;
    }
    matchedNotes.forEach((note) => {
    console.log(`${note.id}. ${chalk.yellow(note.createdAt)} - ${chalk.blue.bold(note.text)}`);
    });
}

export async function clearNotes(){
    const rl = readline.createInterface({
        input: process.stdin, 
        output: process.stdout,
    });
    rl.question('\nAre you sure you want to delete all notes? (YES/NO) ', async(answer) => {
        if (answer.toUpperCase() === 'YES') {
          await saveNotes([]);
          rl.close();
        } else {
          console.log("clear close!");
        }
        rl.close();
    });
}