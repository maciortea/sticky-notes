import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  @Output() save: EventEmitter<Note>;
  @Output() cancel: EventEmitter<any>;

  title: string;
  message: string;

  constructor() {
    this.save = new EventEmitter<any>();
    this.cancel = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  saveForm(note: Note) {
    this.save.emit(note);
  }

  cancelForm(event) {
    this.cancel.emit(event);
  }
}
