const notes = [
  {
    id: 1,
    title: "first note",
    body: "this is the first note",
    updated: "2024-08-11T17:24:50.611Z",
  },
  {
    id: 2,
    title: "second note",
    body: "this is the second note",
    updated: "2024-04-11T17:24:50.611Z",
  },
  {
    id: 3,
    title: "third note",
    body: "this is the third note",
    updated: "2024-08-11T17:30:34.356Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(note) {
    const notes = NotesAPI.getAllNotes();
    const existedNote = notes.find((n) => n.id == note.id);
    if (existedNote) {
      existedNote.title = note.title;
      existedNote.body = note.body;
      existedNote.updated = new Date().toISOString();
    } else {
      note.id = new Date().getTime();
      note.updated = new Date().toISOString();
      notes.push(note);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}

// console.log(NotesAPI.getAllNotes());

// console.log(
//   NotesAPI.saveNote({
//     id: 1,
//     title: "first note edited",
//     body: "this is the first note edited",
//     updated: "2024-08-11T17:24:50.611Z",
//   })
// );

//   console.log(NotesAPI.deleteNote(1));
