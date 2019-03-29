import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private param: ActivatedRoute, private http: HttpClient) { }

  menus = [];
  menu = {
    nom_menu: ''
  }
  
  restaurant = "";
  ngOnInit() {
    console.log(this.param.snapshot.paramMap.get('id'));
    this.get(this.param.snapshot.paramMap.get('id'));
    this.getResto(this.param.snapshot.paramMap.get("id"));
  }

  get(id) {
    this.http.get('http://localhost:3000/resto/' + id).subscribe((response) => {
      console.log(response['result']);
      this.menus = response['result'];
    });
  }
  getResto(id) {
    this.http.get('http://localhost:3000/resto/single/' + id).subscribe((response) => {
      console.log(response['result']['nom_resto']);
      this.restaurant = response['result']['nom_resto'];
    });
  }


}
