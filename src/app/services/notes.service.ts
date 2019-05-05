import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../models/note';

@Injectable()
export class NotesService {
  private notesCollection: AngularFirestoreCollection<Note>;
  
  constructor(private db: AngularFirestore) {
    this.notesCollection = this.db.collection<Note>('notes');
  }

  getAll(): Observable<Note[]> {
    return this.notesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Note;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  add(note: Note): Promise<firebase.firestore.DocumentReference> {
    return this.notesCollection.add(note);
  }

  delete(id: string): Promise<void> {
    return this.notesCollection.doc(id).delete();
  }
}
