import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APIRoutes} from '../../core/config/APIRoutes';

// import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url_receiver;

  constructor(
    public http: HttpClient,
  ) {
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


  alertSwit(title, text, icon) {
    Swal.fire({
      title, text, icon,
      confirmButtonText: 'Accpet'
    });
  }

}
