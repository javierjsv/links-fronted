import {Component, OnInit} from '@angular/core';
import {GLOBAL_STRS} from '../../core/config/Strings';
import {IProfile} from '../../shared/interfaces/interface.user';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ServiceService} from '../../core/services/service.service';
import {IUrl} from '../../shared/interfaces/interface.urls';
import {Router} from '@angular/router';
import {APIRoutes} from '../../core/config/APIRoutes';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public GlobalStr = GLOBAL_STRS;
  public profile: IProfile[] = [];
  public form: FormGroup;
  public urls: IUrl[];
  public idUser;

  constructor(
    private formBuilder: FormBuilder,
    public API: ServiceService,
    public router: Router,
    public authService: AuthService
  ) {

    this.form = this.formBuilder.group({
      url: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {

    this.idUser = this.authService.getIdUser();
    this.getuser();
    this.getLink();

    this.urls = [
      {
        id: 1,
        createdAt: '2021-03-18T15:11:43.458Z',
        url: 'https://daphne.com',
        name: 'rodger.name'
      },
      {
        id: 2,
        createdAt: '2021-03-18T15:11:43.458Z',
        url: 'https://daphne.com',
        name: 'rodger.name'
      },
    ];
  }


  getuser() {
    this.API.getForm(APIRoutes.MY_PROFILE + `/${this.idUser}`).then((resp: any) => {
      console.log(resp);
      this.profile = resp;
    }).catch(err => {
      console.error('Err=>', err);
    });
  }


  field(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.field(control);
      }
    });
  }

  addUrl() {

    console.log(this.form.value);

    if (this.form.invalid) {
      this.field(this.form);
      return;
    }

    const data = new FormData();
    data.append('name', this.form.value.name);
    data.append('url', this.form.value.url);

    JSON.stringify(this.form.value);

    this.API.postFormToken(JSON.parse(JSON.stringify(this.form.value)), APIRoutes.LINKS).then(resp => {
      console.log(resp['name']);
      this.urls.push(resp['name']);
    }).catch(err => {
      console.error('Err=>', err);
      this.API.alertSwit('Sorry ', 'An error occurred', 'error');
    });

  }

  getLink() {
    this.API.getFormToken(APIRoutes.LINKS).then(resp => {
      console.log('link', resp);
      this.urls = resp;

    }).catch(err => {

      console.error('Err=>', err);

    });
  }


  deleteLik(id, index) {

    console.log('id', id, 'index', index);
    this.API.deleteToken(APIRoutes.LINKS + `/${id}`).then(resp => {
      this.urls.splice(index, 1);
      console.log(resp);
    }).catch(err => {
      console.error('Error', err);
    });

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigateByUrl('login');
  }
}
