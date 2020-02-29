import { Component, OnInit } from '@angular/core';
import { UDescription } from '../models/description';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DescriptionService } from '../services/description.service';
import { Description } from '../models/description';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  public descriptions:Observable<UDescription[]> = null;
  constructor(
    private router: Router,
    private descriptionService:DescriptionService) { }

  ngOnInit() {
      this.descriptions = this.descriptionService.getAllDescription();
  }

  deleteDescription(description):void{
    const result = this.descriptionService.deleteDescription(description);
    console.log(result);
  }

  viewDescription(description:UDescription):void{
    console.log('working view');
    console.log(description)
    this.router.navigate(['descriptions/view/'+description.id]);
    console.log(description.id);
    

  }
}





