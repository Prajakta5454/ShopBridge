import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.css']
})
export class ManageInventoryComponent implements OnInit {

  allProducts: any;
  sortBy = 'default';
  searchText: any ='';
  page: number = 1;
  BaseUrl: any = environment.config.BaseUrl;
  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList()
  {
    this.productService.getProducts().subscribe((res) =>{
      this.allProducts = res.products;
    })
  }
  sort(property: any,direction: any) {
    this.allProducts = [...this.allProducts.sort(function (a: any, b: any) {
     if (a[property] < b[property]) {
       return -1 * direction;
     }
     else if (a[property] > b[property]) {
       return 1 * direction;
     }
     else {
       return 0;
     }
   })];
   };

  applySort(event: any) {
    this.sortBy = event
    if (event === 'latest') {
      this.sort('createdAt',-1)
    } else if (event === 'price-down') {
      this.sort('price',-1)
    } else if (event === 'price-up') {
      this.sort('price',1)
    } else if (event === 'default') {
      this.allProducts = [...this.allProducts.sort(() => Math.random() - 0.5)];
    }
  }
  editProduct(product: any){
    this.router.navigate(
      ['/addInventory'],
      { queryParams: { productID: product._id } }
    );
  }
  deleteProduct(product: any){
    let text = "Are you sure you want to delete ?"
    if (confirm(text) == true) {
      this.productService.deleteProduct({productID: product._id}).subscribe(res =>{
        this.getProductsList();
      })
    } 
  }
}
