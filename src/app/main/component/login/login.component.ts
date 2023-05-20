import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/_services/auth.service';
import { StorageService } from '../../../shared/_services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username: string = '';
  loading:boolean = false;

  constructor(private authService: AuthService, private storageService: StorageService) {
    console.log("asssss")

   }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.storageService.getUser().UserName;
      window.location.href = '/ProductsList';
    }

   }

  onSubmit(): void {
    this.loading = true;
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.loading = false;
       if(data.length){
        this.storageService.saveUser(data[0]);
       

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.username = this.storageService.getUser().UserName;
        console.log(this.username)
        this.reloadPage();
       }
       else{
        this.isLoginFailed = true;
       }
      },
      error: err => {
        this.loading = false;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}