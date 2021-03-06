import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {APIRoutes} from '../../core/config/APIRoutes';
import {ServiceService} from '../../core/services/service.service';
import {Router} from '@angular/router';
import {GLOBAL_STRS} from '../../core/config/Strings';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public programs: Array<any> = [];
  public GlobalStr = GLOBAL_STRS;

  constructor(
    private formBuilder: FormBuilder,
    public API: ServiceService,
    public router: Router
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.pattern('^\\w+[a-zA-Z_]'),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z.]{2,7}$'),
        Validators.required
      ])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
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

  singUp() {

    if (this.form.invalid) {
      this.field(this.form);
      return;
    }

    const data = new FormData();

    data.append('name', this.form.value.name);
    data.append('email', this.form.value.email);
    data.append('password', this.form.value.password);

    this.API.postForm(data, APIRoutes.REGISTER).then(resp => {
      console.log(resp);
      this.API.alertSwit('Save', 'successfully', 'success');
      this.form.reset();

      localStorage.setItem('token', JSON.stringify(resp['id']));

    }).catch(err => {
      console.log('Error', err);
      this.API.alertSwit('Sorry ', 'An error occurred', 'error');

    });


  }

  go(url) {
    this.router.navigateByUrl(url);
  }


}
