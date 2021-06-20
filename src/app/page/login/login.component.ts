import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ServiceService} from '../../core/services/service.service';
import {APIRoutes} from '../../core/config/APIRoutes';
import {Router} from '@angular/router';
import {GLOBAL_STRS} from '../../core/config/Strings';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public GlobalStr = GLOBAL_STRS;

  constructor(
    private formBuilder: FormBuilder,
    public API: ServiceService,
    public router: Router,
    public authService: AuthService
  ) {

    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z.]{2,7}$'),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {

    if (this.authService.isLogged()) {
      this.go('dashboard');
    }

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

  login() {
    console.log(this.form.value);
    console.log(this.form.controls);

    if (this.form.invalid) {
      this.field(this.form);
      return;
    }

    const data = new FormData();

    data.append('email', this.form.value.email);
    data.append('password', this.form.value.password);

    this.API.postForm(data, APIRoutes.SIGNUP_USER).then(resp => {
      console.log(resp);
      console.log(resp['token']);
      localStorage.setItem('token', JSON.stringify(resp['token']));
      this.form.reset();
      this.router.navigateByUrl('/dashboard');
    }).catch(err => {
      console.error('Errr=>', err);
    });

  }

  go(url) {
    this.router.navigateByUrl(url);
  }

}
