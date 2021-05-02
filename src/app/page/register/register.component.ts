import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {APIRoutes} from '../../core/config/APIRoutes';
import {ServiceService} from '../../core/services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public programs: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    public API: ServiceService,
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
      family_name: ['', Validators.compose([
        Validators.pattern('^\\w+[a-zA-Z_]'),
        Validators.required
      ])],
      phone: ['', Validators.max(9999999999)],
      program: [''],
      comment: [''],
    });

  }

  ngOnInit(): void {

    this.getInteres();

  }

  getInteres() {
    this.API.getForm(APIRoutes.PROGRAM_INTERES).then((resp: Array<any>) => {
      // console.log(resp);
      let data = resp;
      for (let i = 0; i < data.length; i++) {
        const search = this.programs.find(res => res.id === resp[i]['id']);
        if (search === undefined) {
          this.programs.push(resp[i]);
        }
      }

      console.log(this.programs);

    }).catch(err => {
      console.error(err);
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

  post() {

    console.log(this.form.value);
    console.log(this.form);
    console.log('name', this.form.controls.name.status);
    console.log('Email', this.form.controls.email.status);
    console.log('family_name', this.form.controls.family_name.status);
    console.log('phone', this.form.controls.phone.status);
    console.log('program', this.form.controls.program.status);
    console.log('comment', this.form.controls.comment.status);

    if (this.form.invalid) {
      this.field(this.form);
      return;
    }

    this.form.value.phone = this.form.value.phone.toString();
    this.form.value.program = this.form.value.program.toString();

    this.API.postForm(this.form.value, APIRoutes.REGISTER).then(resp => {
      console.log(resp);
      this.API.alertSwit('Save', 'successfully', 'success');
      this.form.reset();

    }).catch(err => {
      console.log('Error', err);
      this.API.alertSwit('Sorry ', 'An error occurred', 'error');

    });


  }


}
