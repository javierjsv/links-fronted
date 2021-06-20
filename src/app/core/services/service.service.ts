import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APIRoutes} from '../../core/config/APIRoutes';
import {AuthService} from '../services/auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url_receiver;
  public token;
  public not_domain;
  public form_data;

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) {


    this.token = this.authService.getToken();
  }


  getForm(relUrl) {
    return new Promise((resolve, reject) => {
      this.url_receiver = relUrl;
      this.http.get(APIRoutes.ROOT + relUrl)
        .subscribe(res => {
          resolve(res);
        }, (error) => {
          reject(error);
        });
    });
  }

  getUrl(relUrl) {
    return new Promise((resolve, reject) => {
      this.url_receiver = relUrl;
      this.http.get(relUrl)
        .subscribe(res => {
          resolve(res);
        }, (error) => {
          reject(error);
        });
    });
  }


  postForm(formData, relUrl) {
    return new Promise((resolve, reject) => {
      this.http.post(APIRoutes.ROOT + relUrl, formData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.error(err);
        });
    });
  }


  postFormToken(formData, relUrl) {
    return new Promise((resolve, reject) => {
      this.form_data = formData;
      this.url_receiver = relUrl;
      const headers = new HttpHeaders({
        Authorization: this.token
      });

      this.http.post(APIRoutes.ROOT + relUrl, formData, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  getFormToken(relUrl, notDomain = false) {


    return new Promise<any>((resolve, reject) => {
      this.url_receiver = relUrl;
      this.not_domain = notDomain;

      let headers;
      if (this.token != '') {
        headers = new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        });

      } else {
        headers = new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'

        });
      }
      this.http.get((notDomain ? '' : APIRoutes.ROOT) + relUrl, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }


  deleteToken(relUrl) {
    return new Promise((resolve, reject) => {
      this.url_receiver = relUrl;
      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      });

      this.http.delete(APIRoutes.ROOT + relUrl, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  alertSwit(title, text, icon) {
    Swal.fire({
      title, text, icon,
      confirmButtonText: 'Accpet'
    });
  }

}
