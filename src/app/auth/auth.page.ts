import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) {}

  ngOnInit() {}

  onLogin = () => {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;

        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  };
  onLogout = () => {
    this.authService.logout();
  };

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) return;
    const { email, password } = form.value;
    console.log(email, password);
    if (this.isLoginMode) {
      this.onLogin();
    } else {
    }
  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
