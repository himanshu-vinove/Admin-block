import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UDescription } from '../models/description';
import { DescriptionService } from '../services/description.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  description$: Observable<UDescription>;
  public descriptionDetail: UDescription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private descriptionService: DescriptionService) { }

  ngOnInit() {

    this.description$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.descriptionService.getDescriptionById(Number.parseInt(params.get('id')))
      ));
    this.description$.subscribe(data => {
      this.descriptionDetail = data;
    });

  }

  editDescription(): void {

    this.router.navigate(['descriptions/edit/' + this.descriptionDetail.id]);
    console.log('this is edit description',this.descriptionDetail.id);
    
  }

}
