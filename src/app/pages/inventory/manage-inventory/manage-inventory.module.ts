import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageInventoryRoutingModule } from './manage-inventory-routing.module';
import { ManageInventoryComponent } from './manage-inventory.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; 
@NgModule({
  declarations: [
    ManageInventoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ManageInventoryRoutingModule
  ]
})
export class ManageInventoryModule { }
