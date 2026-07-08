import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable, switchMap, of } from 'rxjs';
import { AppUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$: Observable<User | null> = authState(this.auth);

  appUser$: Observable<AppUser | null> = this.user$.pipe(
    switchMap(user => {
      if (!user) return of(null);
      const ref = doc(this.firestore, `users/${user.uid}`);
      return docData(ref) as Observable<AppUser>;
    })
  );

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const ref = doc(this.firestore, `users/${cred.user.uid}`);
    await setDoc(ref, {
      uid: cred.user.uid,
      name: cred.user.email?.split('@')[0] ?? 'Agent',
      role: 'agent',
      email: cred.user.email,
    }, { merge: true });
    return cred;
  }

  logout() {
    return signOut(this.auth);
  }
}
