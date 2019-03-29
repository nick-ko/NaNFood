import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { Platform } from '@ionic/angular';

const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  authenticationState = new BehaviorSubject(false);
  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
      private plt: Platform
  ) {
      this.plt.ready().then(() => {
          this.checkToken();
      });
  }

    checkToken() {
        this.storage.get('user').then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        })
    }


  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + "auth/register", {
      fName: fName,
      lName: lName,
      email: email,
      password: password
    });
  }

    log(token, obj) {
    return this.storage.set("user", obj).then(() => {
      this.authenticationState.next(true);
    });
  }
    isAuthenticated() {
        return this.authenticationState.value;
    }

  logout() {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + " " + this.token["access_token"]
    });

    return this.http
      .get(this.env.API_URL + "auth/logout", { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      );
  }

  user() {
    const headers = new HttpHeaders({
      Authorization: this.token["token_type"] + "" + this.token["access_token"]
    });

    return this.http
      .get<User>(this.env.API_URL + "auth/user", { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      );
  }

}