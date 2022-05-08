import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [{ path: '', component: InventoryComponent,
                          children:[
                            { path: '', loadChildren: () => import('./manage-inventory/manage-inventory.module').then(m => m.ManageInventoryModule) },
                            { path: 'addInventory', loadChildren: () => import('./add-inventory/add-inventory.module').then(m => m.AddInventoryModule) },
                            { path: 'manageInventory', loadChildren: () => import('./manage-inventory/manage-inventory.module').then(m => m.ManageInventoryModule) }
                          ] },        
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
