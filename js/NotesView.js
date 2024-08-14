export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `<div class="notes__sidebar">
            <div class="notes__logo">Note App</div>
            <ul class="notes__list">

            </ul>
            <button class="notes__add">Add Note</button>
        </div>
        <div class="notes__preview">
            <input type="text" class="notes__title" placeholder="note title..." />
            <textarea name="" id="" class="notes__body" cols="30" rows="10"></textarea>
        </div>`;

    const notesAddBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    notesAddBtn.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inputBody, inputTitle].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newBody = inputBody.value.trim();
        const newTitle = inputTitle.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `<li class="notes__list-item" data-note-id="${id}">
                    <a class="notes__list">
                        <div class="notes__item-header">
                          <div class="notes__small-title">${title}</div>
                        <span class="notes__list-trash" data-note-id="${id}"><i class="fa-solid fa-trash"></i></span>
                        </div>
                        <div class="notes__small-body">
                        ${body.substring(0, MAX_BODY_LENGTH)}
                        ${body.length > MAX_BODY_LENGTH ? "..." : ""}</div>
                        <div class="notes__small-updated">${new Date(
                          updated
                        ).toLocaleString("en", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}</div>
                    </a>
            </li>`;
  }

  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");
    notesContainer.innerHTML = "";
    let result = "";
    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        note.updated
      );
      result += html;
    }
    notesContainer.innerHTML = result;
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });
    notesContainer
      .querySelectorAll(".notes__list-trash")
      .forEach((noteItem) => {
        noteItem.addEventListener("click", (e) => {
          e.stopPropagation();
          this.onNoteDelete(noteItem.dataset.noteId);
        });
      });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    this.root.querySelectorAll(".notes__list-item").forEach((item) => {
      item.classList.remove("notes__list-item--selected");
    });
    this.root
      .querySelector(`.notes__list-item[data-note-id = "${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
