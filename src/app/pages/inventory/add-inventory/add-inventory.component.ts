import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private productService: ProductService,private route: ActivatedRoute,private router: Router, private toastr: ToastrService) { 
    this.Form = this.formBuilder.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      category: ['',[Validators.required]],
      quantity: ['',[Validators.required]],
      image: ['',[Validators.required]],
    })
  }
  Form: FormGroup
  submitted: boolean = false;
  productID: any;
  selectedProduct: any;
  image: any
  extension: any
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      let fileName = event.target.files[0].name;
      this.extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    }
  }

  ngOnInit(): void {
    this.productID = this.route.snapshot.queryParamMap.get('productID');
    if(this.productID){
      this.productService.getProductById({productID:this.productID}).subscribe((res)=>{
        this.selectedProduct = res;
      this.controls.name.setValue(this.selectedProduct.name);
      this.controls.description.setValue(this.selectedProduct.description);
      this.controls.price.setValue(this.selectedProduct.price);
      this.controls.category.setValue(this.selectedProduct.category);
      this.controls.quantity.setValue(this.selectedProduct.quantity);
      })
    }
  }

  get controls() { return this.Form.controls; }

  onSubmit()
  {
    this.submitted = true;
    if(this.Form.invalid)
    {
      console.log("!oops");
      return
    }
    if(this.productID){
      let values = this.Form.value;
      values.productID = this.productID;
      const formData = new FormData();
      var fileName = Math.random().toString(36).substr(2, 5)+ '.'+this.extension;
      if(this.image)
      {
        formData.append('file', this.image,fileName);
      }
      formData.append('productID',this.productID);
      formData.append('name',this.controls.name.value);
      formData.append('description',this.controls.description.value);
      formData.append('price',this.controls.price.value);
      formData.append('category',this.controls.category.value);
      formData.append('quantity',this.controls.quantity.value);
      this.productService.updateProduct(values).subscribe((res) =>{
        this.toastr.success('Updated successfully');
        this.resetForm();
        this.router.navigate(
          ['/manageInventory']
        );
      })
    }else{
      const formData = new FormData();
      var fileName = Math.random().toString(36).substr(2, 5)+ '.'+this.extension;
      if(this.image)
      {
        formData.append('file', this.image,fileName);
      }
      formData.append('name',this.controls.name.value);
      formData.append('description',this.controls.description.value);
      formData.append('price',this.controls.price.value);
      formData.append('category',this.controls.category.value);
      formData.append('quantity',this.controls.quantity.value);
      this.productService.addProduct(formData).subscribe((res)=>{
        this.resetForm();
        this.toastr.success('Added successfully');
        this.router.navigate(
          ['/manageInventory']
        );
      })
    }
  }
  resetForm()
  {
    this.submitted = false;
    this.Form.reset();
  }
}
