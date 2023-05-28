import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/_services/storage.service';
import { IProduct } from '../../dataModels/product';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  editedProduct : IProduct = {title: '', description: '', price: 0, id: 0, image: '', category: ''}
  addProductForm = this.formBuilder.group({
     title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    image: new FormControl(''),
    category: new FormControl('', Validators.required),
    id: new FormControl(0)
  });

  public allCategories: any =  [];

  public inEditMode: boolean = false;
  loading:boolean = false;
  constructor(public modal: NgbActiveModal, private productService: ProductsService,private toastr: ToastrService, private storageService: StorageService, private formBuilder: FormBuilder
    ) { 
      this.getCategoriesList();
    }

  ngOnInit(): void {
   this.checkInEditMode();
  }

  checkInEditMode(){
    if(this.editedProduct.title){
      this.inEditMode = true;
      this.addProductForm.patchValue({
        title: this.editedProduct.title,
        price: this.editedProduct.price,
        category: this.editedProduct.category,
        description: this.editedProduct.description,
        image: this.editedProduct.image,
        id: this.editedProduct.id
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.saveProduct();

  }

  getCategoriesList(){
    this.productService.getAllCategories().subscribe(
      res=>{
        this.allCategories = res;
      },
      err=>{
        this.toastr.error("unable to get gategories")
      }
    )
  }
  cancel(){
    this.modal.dismiss();
  }

  saveProduct(){
    if(this.inEditMode){
      this.productService.updateProduct(this.addProductForm.value).subscribe(
        res=>{
          this.toastr.success("Product Updated successfully");
          this.cancel();
  
        },
        err=>{
          this.toastr.error("Unable to add product")
        }
      )
    }
    else{
      this.productService.addProduct(this.addProductForm.value).subscribe(
        res=>{
          this.toastr.success("Product added successfully");
          this.cancel();
        },
        err=>{
          this.toastr.error("Unable to add product");

        }
      )
    }
    
  }
}
