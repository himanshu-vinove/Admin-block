import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageServiceModule } from  'ngx-webstorage-service';
import { DescriptionRoutingModule } from './description-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [ListComponent, AddComponent, ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DescriptionRoutingModule,
    StorageServiceModule
  ]
})
export class DescriptionModule { }








