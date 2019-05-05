import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userKey = 'currentUser';

  constructor(private afAuth: AngularFireAuth, private localStorageService: LocalStorageService) {
  }

  googleLogin(): Promise<void> {
    var provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(result => {
      this.localStorageService.set(this.userKey, result.user);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.localStorageService.remove(this.userKey);
    })
  }

  getUser(): firebase.User {
    return this.localStorageService.get(this.userKey);
  }

  getDisplayName(): string {
    const user: firebase.User = this.getUser();
    if (!!user) {
      return user.displayName;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
