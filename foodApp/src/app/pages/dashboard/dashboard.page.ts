import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    sliderConfig = {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 1.6
    };
  
    user: User;
    constructor(private menu: MenuController,
        private router: Router, private http: HttpClient) {
        this.menu.enable(true);
    }
    restau=[];
    restaux={
        nom_resto:'',
        commune_resto:'',
        image_resto:'',
        description_resto:'',
        lien_resto:''
    }

    ngOnInit() {
        this.get();
    }

  /*  ionViewWillEnter(){
        this.authService.user().subscribe(
            user => {
                this.user = user;
            }
        );
    };*/

    get(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    
    this.http.get('http://localhost:3000/resto', httpOptions).subscribe((response) => {
    console.log(response['result']);
    this.restau = response['result'];
      });
  }
   save(){
    this.http.post('http://localhost:3000/resto/', 
    {
    name: this.restaux.nom_resto
    }
    ).subscribe((response) => {
        console.log(response);
        this.get();
    });
  }

  go(id){
    this.router.navigate(['/detail/'+id]);
  }
}

