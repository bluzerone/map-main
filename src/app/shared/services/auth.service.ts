import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { WindowService } from './window.service';
import { BaseService } from './../../base.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { VKLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  errorLogin: string;
  errorReg: string;
  regVerifiMessage: boolean = false;
  windowRef: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private authService: SocialAuthService,
    public win: WindowService,
    public baseService: BaseService
  ) {

    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.emailVerified) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          this.afs
            .collection('users')
            .doc(this.userData.uid).valueChanges()
            .subscribe((res: any) => {
              this.userData.awords = res.awords;
            })
        } else if (user.phoneNumber && !user.emailVerified) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.baseService.openSnackBar("Вам необходимо подтвердить адрес электронной почты указанный при регистрации!", "", 20000, "center", "top", "error-dialog-red");
          JSON.parse(localStorage.getItem('user'));
          this.afs
            .collection('users')
            .doc(this.userData.uid).valueChanges()
            .subscribe((res: any) => {
              this.userData.awords = res.awords;
            })
        } else if (!user.email) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          this.afs
            .collection('users')
            .doc(this.userData.uid).valueChanges()
            .subscribe((res: any) => {
              this.userData.awords = res.awords;
            })
        } else {
          this.baseService.openSnackBar("Вам необходимо подтвердить адрес электронной почты указанный при регистрации!", "", 20000, "center", "top", "error-dialog-red");
          this.errorLogin = 'Вам необходимо подтвердить адрес электронной почты! Проверьте свою почту и перейдите по ссылке в письме.';
          this.SignOut();
        }
      }
    })

    const getLocalSession = JSON.parse(localStorage.getItem('user'));

    if (getLocalSession) {
      this.userData = getLocalSession;
    } else {
      this.userData = null;
    }

    this.authService.authState.subscribe((user) => {
      if (user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
        const userData: User = {
          uid: user.id,
          email: user.provider,
          displayName: user.name,
          photoURL: user.photoUrl,
          emailVerified: true
        }
        this.userData = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        return userRef.set(userData, {
          merge: true
        })
      }
    });

  }

  ValidMail(email, password) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(email);
    if (valid) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user.emailVerified) {
            this.SetUserData(result.user);
          } else {
            this.errorLogin = 'Вам необходимо подтвердить адрес электронной почты! Проверьте свою почту и перейдите по ссылке в письме.'
            this.SignOut();
          }
        }).catch((error) => {
          if (error.message === 'The email address is badly formatted.') {
            this.errorLogin = 'Адрес электронной почты введен неправильно!';
          } else if (error.message === 'The password is invalid or the user does not have a password.') {
            this.errorLogin = 'Пароль недействителен или у пользователя нет пароля.';
          } else if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            this.errorLogin = 'Такой пользователь не найден в базе!';
          }
        })
    }
  }

  ValidPhone(phone) {
    var re = /^[+]((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    var valid = re.test(phone);
    if (valid) {
      let appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container-login');
      firebase.auth().signInWithPhoneNumber(phone, appVerifier)
        .then((confirmationResult) => {
          let code = window.prompt('Пожалуйста, введите подтверждение ' +
              'код, который был отправлен на ваше мобильное устройство.');
          confirmationResult.confirm(code).then((result) => {
            this.userData = result.user;
            this.SetUserData(result.user);
          }).catch((error) => {
            this.errorLogin = 'Ошибка: Неверный код подтверждения';
          });
        }).catch((error) => {
          this.errorLogin = 'Ошибка: СМС не отправлено';
        });
    } else {
      setTimeout(() => {
        this.errorLogin = 'Ошибка: Неверно введен email или номер телефона';
      }, 3000);
    }
  }

  // Sign in with email/password and phone
  SignIn(email, password) {
    this.ValidPhone(email);
    this.ValidMail(email, password);
  }

  // Sign up with email/password
  SignUp(email: string, password: string, respassword: string, name: string, phone: string) {
    if (password !== respassword) {
      this.errorReg = 'Не правильно повторен пароль!'
    } else if(!name) {
      this.errorReg = 'Необходимо ввести Имя'
    } else if (phone) {
      let applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      let provider = new firebase.auth.PhoneAuthProvider();
      firebase.auth().signInWithPhoneNumber(phone, applicationVerifier)
        .then((confirmationResult) => {
          let code = window.prompt('Пожалуйста, введите подтверждение ' +
              'код, который был отправлен на ваше мобильное устройство.');
          confirmationResult.confirm(code).then((result: any) => {
            this.userData = result.user;
            result.user.updateProfile({
                displayName: name,
                email: email
            }).then((req) => {
            });
            var credential = firebase.auth.EmailAuthProvider.credential(email, password);
            this.afAuth.currentUser.then(u => u.linkWithCredential(credential))
            .then((usercred) => {
              var user = usercred.user.emailVerified;
              this.SendVerificationMail();
              this.SetUserData(user);
            }).catch((error) => {
              this.errorReg = 'Ошибка привязки аккаунта';
            });
          }).catch((error) => {
            this.errorReg = 'Ошибка: Неверный код подтверждения';
          });
        }).catch((error) => {
          this.errorReg = 'Ошибка: Мы заблокировали все запросы с этого устройства из-за необычной активности. Попробуйте позже.';
        });
    } else {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({
              displayName: name
          }).then((req) => {
            console.log('Update successful');
          });
          this.SetUserData(result.user);
          this.SendVerificationMail();
          this.SignOut();
          this.regVerifiMessage = true;
        }).catch((error) => {
          if (error.message === 'Password should be at least 6 characters') {
            this.errorReg = 'Пароль должен состоять не менее чем из 6 символов.'
          } else if (error.message === 'The email address is already in use by another account.') {
            this.errorReg = 'Такой адрес электронной почты уже зарегистрирован!';
          } else {
            this.errorReg = error.message;
          }
        })
    }
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then((e) => {
      console.log(e);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(passwordResetEmail);
    if (valid) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.errorLogin = 'Письмо для сброса пароля отправлено, проверьте свой почтовый ящик.';
      }).catch((error) => {
        this.errorLogin = 'Адрес электронной почты введен неправильно либо такого email адреса нет в базе!';
      })
    } else {
      this.errorLogin = 'Адрес электронной почты введен неправильно!';
    }

  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  AppleAuth() {
    return this.AuthLogin(new firebase.auth.OAuthProvider('apple.com'));
  }

  signInWithVK(): void {
    this.authService.signIn(VKLoginProvider.PROVIDER_ID);
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    this.router.navigate(['/home/main']);
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
    localStorage.removeItem('user');
    this.userData = null;
    this.authService.signOut();
  }

}
