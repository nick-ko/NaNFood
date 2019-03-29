import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

    user = {
        email: '',
        password: ''
    };
    constructor(
        private modalController: ModalController,
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService,
        private http: HttpClient
    ) { }
    ngOnInit() {
    }
    // Dismiss Login Modal
    dismissLogin() {
        this.modalController.dismiss();
    }
    // On Register button tap, dismiss login modal and open register modal
    async registerModal() {
        this.dismissLogin();
        const registerModal = await this.modalController.create({
            component: RegisterPage
        });
        return await registerModal.present();
    }


    log(){
        this.http.post('http://127.0.0.1:3000/resto/auth/login', this.user).subscribe((response) => {
            console.log(response['result']);
            if (response['result']) {
                this.authService.log('user', response['result']);
            }
            if(response['result'] === undefined){  
                console.log('mot de passe ou email incorrect');
                this.alertService.presentToast("mot de passe ou email incorrect");
            }else{
                console.log("log in");
                this.dismissLogin();
                this.navCtrl.navigateRoot('/dashboard');
                this.alertService.presentToast("Vous etez connectez");
            }
        });
    }
}