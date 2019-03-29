import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'
import { ActivatedRoute } from "@angular/router";
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"]
})
export class DetailPage implements OnInit {
  constructor(
    private param: ActivatedRoute,
    private http: HttpClient,
    private route: Router
  ) {}

  restos = [];
  resto = {
    nom_resto: "",
    commune_resto: "",
    image_resto: "",
    description_resto: "",
    lien_resto: ""
  };
  restaurant = "";
  ngOnInit() {
    console.log(this.param.snapshot.paramMap.get("id"));
    this.get(this.param.snapshot.paramMap.get("id"));
    this.getResto(this.param.snapshot.paramMap.get("id"));
  }

  get(id) {
    this.http
      .get("http://localhost:3000/resto/seul/" + id)
      .subscribe(response => {
        console.log(response["result"]);
        this.restos = response["result"];
      });
  }
  getResto(id) {
    this.http
      .get("http://localhost:3000/resto/single/" + id)
      .subscribe(response => {
        console.log(response["result"]["nom_resto"]);
        this.restaurant = response["result"]["nom_resto"];
      });
  }

  next(id) {
    this.route.navigate(["/menu/" + id]);
  }
}
