import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() name: string = 'SINGNUP';
  @Input() rute: string = 'login';

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  go() {
    this.router.navigate([this.rute]);
  }


}
