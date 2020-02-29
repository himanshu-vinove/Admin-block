import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
                          
import { Description, UDescription } from '../models/description';
import { DescriptionService } from '../services/description.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  
  private observableSubscription:Array<Subscription> = [];
  formSubmitted = false;
  descriptionForm = this.fb.group({});
  

  constructor(private fb:FormBuilder,
    private descriptionService:DescriptionService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.descriptionForm.addControl('id',new FormControl(''));
    this.descriptionForm.addControl('name',new FormControl('',[Validators.required,Validators.minLength(3) ]));
    this.descriptionForm.addControl('age',new FormControl('',[Validators.required,Validators.max(99)]));
    this.descriptionForm.addControl('contact',new FormControl('',[Validators.required]));
    this.descriptionForm.addControl('address',new FormControl('',[Validators.required]));
    this.descriptionForm.addControl('email',new FormControl('',[Validators.required, Validators.email]));
    this.descriptionForm.addControl('bio',new FormControl('',[Validators.required]));

   
    const description$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          this.descriptionService.getDescriptionById(Number.parseInt(params.get('id')))
        ));

        description$.subscribe(description=>{
          if(!isNullOrUndefined(description)){
            console.log(description,'this is description');
            this.descriptionForm.get('id').setValue(description.id);
            this.descriptionForm.get('name').setValue(description.name);
            this.descriptionForm.get('age').setValue(description.age);
            this.descriptionForm.get('contact').setValue(description.contact);
            this.descriptionForm.get('address').setValue(description.address);
            this.descriptionForm.get('email').setValue(description.email);
            this.descriptionForm.get('bio').setValue(description.bio);
            
          }
        })
  }

  ngOnDestroy(){
    this.observableSubscription.forEach(item => {
      item.unsubscribe();
      console.log(item, 'unsubscribed');
    });
  }

  save($event:any):void{
console.log('working');

    this.formSubmitted = true;
    if(!this.descriptionForm.valid){
      return;
    }

    this.saveDescription();

    // navigate back to products list
    this.router.navigate(['/descriptions']);
  }

  saveAndContinue($event:any):void{
    this.formSubmitted = true;
    console.log(this.descriptionForm.get('name').errors);
    console.log(this.descriptionForm.get('name'));
    
    if(!this.descriptionForm.valid){
      return;
    }

    this.saveDescription();

  }

  saveDescription():void{
    const description =new Description();
    // map data from form to product
    console.log(this.descriptionForm.value);
    
    description.id = this.descriptionForm.get('id').value;
    description.name = this.descriptionForm.get('name').value;
    description.age = this.descriptionForm.get('age').value;
    description.contact = this.descriptionForm.get('contact').value;
    description.address = this.descriptionForm.get('address').value;
    description.email = this.descriptionForm.get('email').value;
    description.bio = this.descriptionForm.get('bio').value;


    // save to database
    if(description.id == 0){
      // description.id = Math.floor(Math.random() * 20);
      this.descriptionService.addNewDescription(description);}
      else {
        this.descriptionService.updateDescription(description);
      }
  }


 

}
