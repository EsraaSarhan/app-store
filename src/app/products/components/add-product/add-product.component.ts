import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: any = {
    title: null,
    description: null,
    price: null,
    image: null,
    category: null,
    id: 0
  };

  public allCategories: any =  [];

  loading:boolean = false;
  constructor(public modal: NgbActiveModal, private productService: ProductsService,private toastr: ToastrService,
    ) { 
      this.getCategoriesList();
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.saveProduct();
    //const { username, password } = this.form;

  }

  getCategoriesList(){
    this.productService.getAllCategories().subscribe(
      res=>{
        console.log(res);
        this.allCategories = res;
      },
      err=>{
        console.log(err)
      }
    )
  }
  cancel(){
    this.modal.dismiss();
  }

  saveProduct(){
    console.log(this.form);
    this.productService.addProduct(this.form).subscribe(
      res=>{
        console.log(res);
        this.toastr.success("Product added successfully");
        this.cancel();

      },
      err=>{

      }
    )
  }
}
