import { Component } from '@angular/core';
import { StorageService } from './shared/_services/storage.service';
import { AuthService } from './shared/_services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './products/components/add-product/add-product.component';

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

  constructor(private storageService: StorageService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.Role;

      this.isAdmin = this.role === 'admin';
      this.isUser = this.role === 'user';

      this.username = user.username;
    }
  }

  logout(): void {
    this.storageService.clean();

        window.location.reload();
  }

  addProduct(){
    const addModalRef = this.modalService.open(AddProductComponent, { size: 'lg', backdrop: 'static' });

  }
}

