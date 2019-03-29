import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { RegisterPage } from '../auth/register/register.page';
import { LoginPage } from '../auth/login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

    sliderConfig = {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 1.6
    };

    constructor(
        private modalController: ModalController,
        private menu: MenuController,
        private authService: AuthService,
        private navCtrl: NavController,
        private http: HttpClient,
    ) {
        this.menu.enable(false);
    }
    resto=[];
    restos={
        nom_resto:'',
        commune_resto:'',
        image_resto:'',
        description_resto:'',
        lien_resto:''
    }
    ngOnInit() {
       this.get();
    }

    get() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        this.http.get('http://localhost:3000/resto', httpOptions).subscribe((response) => {
            console.log(response['result']);
            this.resto = response['result'];
        });
    }
    async register() {
        const registerModal = await this.modalController.create({
            component: RegisterPage
        });
        return await registerModal.present();
    }
    async login() {
        const loginModal = await this.modalController.create({
            component: LoginPage,
        });
        return await loginModal.present();
    }
}
