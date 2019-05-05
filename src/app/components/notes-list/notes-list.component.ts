import { Component, OnInit, Inject } from '@angular/core';
import { Note } from 'src/app/models/note';
import { JQ_TOKEN } from 'src/app/common/jquery.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[];
  showAddNoteForm: boolean;

  constructor(@Inject(JQ_TOKEN) private $: any, private notesService: NotesService) {
    this.notes = [];
    this.showAddNoteForm = false;

    this.notesService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
      setTimeout(() => {
        this.$('.toast').toast('show');
      }, 10);
    });
  }

  ngOnInit() {
  }

  addNote() {
    this.showAddNoteForm = true;
  }

  saveNote(note: Note) {
    this.showAddNoteForm = false;

    this.notesService.add(note).then(() => {
      this.notes.push(note);

      setTimeout(() => {
        this.$('.toast').toast('show');
      }, 10);
    });
  }

  removeNote(noteId: string) {
    this.notesService.delete(noteId).then();
  }

  cancelNote() {
    this.showAddNoteForm = false;
  }
}
