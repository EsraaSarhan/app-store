import { Component } from '@angular/core';
import { StorageService } from './shared/_services/storage.service';
import { AuthService } from './shared/_services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './products/components/add-product/add-product.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-cart';

  private role: string = '';
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  username?: string;

  constructor(private translate: TranslateService, private storageService: StorageService, private authService: AuthService, private modalService: NgbModal) {
    translate.setDefaultLang('en');
    //translate.use('en');
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.Role;

      this.isAdmin = this.role === 'admin';
      this.isUser = this.role === 'user';

      this.username = user.username;
      this.translate.use(user.PreferedLanguage);

      this.changeUILAng(user.PreferedLanguage);

    }
  }

  logout(): void {
    this.storageService.clean();

        window.location.reload();
  }

  addProduct(){
    const addModalRef = this.modalService.open(AddProductComponent, { size: 'lg', backdrop: 'static' });

  }

  changLanguage(selecetedLanguage: string){
    console.log(selecetedLanguage);
    this.storageService.changeUserLanguage(selecetedLanguage);
    this.translate.use(selecetedLanguage);
    
this.changeUILAng(selecetedLanguage);

   window.location.reload();
  }

  changeUILAng(selecetedLanguage: string){

    document.querySelector('html')?.setAttribute('lang', selecetedLanguage);
    let boottstrapLink = document.getElementById('bootstrapLang');

   if(selecetedLanguage === 'ar'){
    if(boottstrapLink){
      boottstrapLink.setAttribute("href", 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.rtl.min.css') ; 
    }
    document.querySelector('html')?.setAttribute('dir', 'rtl');

   }
   else{
    if(boottstrapLink){
      boottstrapLink.setAttribute("href", 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css') ; 
    }
    document.querySelector('html')?.setAttribute('dir', 'ltr');


   }
  }
}

