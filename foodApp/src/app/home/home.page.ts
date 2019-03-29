import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public searchTerm: string = "";

  constructor(private http: HttpClient, private router: Router,) {
    
  }

  resto = [];
  restos = {
    nom_resto: "",
    commune_resto: "",
    image_resto: "",
    description_resto: "",
    lien_resto: "",
    contact_resto: ""
  };

  ngOnInit() {
    this.get();
    this.setFilteredItems();
  }

  get() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    this.http
      .get("http://localhost:3000/resto", httpOptions)
      .subscribe(response => {
        console.log(response["result"]);
        this.resto = response["result"];
      });
  }

  filterItems(searchTerm) {
    return this.resto.filter(re => {
      return re.nom_resto.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  setFilteredItems() {
    this.resto = this.filterItems(this.searchTerm);
  }

  go(id) {
    this.router.navigate(['/detail/' + id]);
  }
}
