import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    constructor(private modalController: ModalController,
                private authService: AuthService,
                private navCtrl: NavController,
                private alertService: AlertService,
        private http: HttpClient
    ) { }
    user = {
        fName: '',
        lName: '',
        email: '',
        password:''
    };
    ngOnInit() {
    }
    // Dismiss Register Modal
    dismissRegister() {
        this.modalController.dismiss();
    }
    // On Login button tap, dismiss Register modal and open login Modal
    async loginModal() {
        this.dismissRegister();
        const loginModal = await this.modalController.create({
            component: LoginPage,
        });
        return await loginModal.present();
    }

    save(){
        this.http.post("http://localhost:3000/resto/auth/register", {
            fName: this.user.fName,
            lName: this.user.lName,
            email: this.user.email,
            password: this.user.password
          })
          .subscribe(response => {
                 console.log(response);
                        this.dismissRegister();
                        this.navCtrl.navigateRoot('/dashboard');
                        this.alertService.presentToast('Bienvenue');   
          });
    }
}
