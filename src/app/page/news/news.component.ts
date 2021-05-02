import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {APIRoutes} from '../../core/config/APIRoutes';
import {ServiceService} from '../../core/services/service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public idNews;
  public news: Array<any> = [];

  constructor(
    public API: ServiceService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams
      .subscribe(params => {
        // console.log(params);
        if (params.id == undefined) {
          this.router.navigate(['/home']);
        } else {

          this.idNews = params.id;
          // console.log(this.idNews);
          this.getNews();

        }
      });

  }

  getNews() {

    this.API.getForm(APIRoutes.NEWS).then((resp: Array<any>) => {
      // console.log(resp);
      this.news = resp.find(res => res.id === this.idNews);
      console.log(this.news);
    }).catch(err => {
      console.error(err);
    });

  }

}
