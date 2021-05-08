import {Component, OnInit} from '@angular/core';
import {APIRoutes} from '../../core/config/APIRoutes';
import {ServiceService} from '../../core/services/service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news: Array<any> = [];

  constructor(
    public API: ServiceService,
    public router: Router
  ) {
  }

  ngOnInit(): void {

    this.API.getUrl(APIRoutes.NEWS).then((resp: Array<any>) => {
      // console.log(resp);
      this.news = resp;
    }).catch(err => {
      console.error(err);
    });

  }

  go(id) {
    this.router.navigate(['/news'], {queryParams: {id}});
  }

}
