import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddInventoryRoutingModule } from './add-inventory-routing.module';
import { AddInventoryComponent } from './add-inventory.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddInventoryComponent
  ],
  imports: [
    CommonModule,
    AddInventoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddInventoryModule { }
