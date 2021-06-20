import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;

  constructor() {
  }

  getToken() {
    if (localStorage.getItem('token')) {
      console.log('localStore' + localStorage.getItem('token'));
      this.token = localStorage.getItem('token');
      // console.log(this.token);
      return JSON.parse(localStorage.getItem('token'));
    } else {
      return undefined;
    }
  }

  getIdUser() {
    if (localStorage.getItem('id')) {
      console.log('id' + localStorage.getItem('id'));
      this.token = localStorage.getItem('id');
      // console.log(this.token);
      return JSON.parse(localStorage.getItem('id'));
    } else {
      return undefined;
    }
  }

  isLogged() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

}
