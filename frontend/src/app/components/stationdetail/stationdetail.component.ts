import { Component, OnInit } from '@angular/core';
import { StationServices } from "../../services/Station.services";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.services";

@Component({
  selector: 'app-Stationdetail',
  templateUrl: './stationdetail.component.html',
  styleUrls: ['./stationdetail.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class StationdetailComponent implements OnInit {

//Com a variables globals, posem:
  Station: Object;
  bikes: Object;
  StationId: string;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(private StationService: StationServices,private dataService:DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.clickedStationId.subscribe(StationId => this.StationId = StationId)
    console.log("Id del element clickat: "+this.StationId)
    if(this.StationId=="0")
    {
      this.router.navigateByUrl("/");
    }
    this.obtainStation()
    this.obtainBikes()
  }

  obtainStation() {
    console.log("Operació de demanar informació sobre una asignatura");
    if(this.StationId!="0") {
      this.StationService.obtainStation(this.StationId)
        .subscribe(response => {
            console.log("Resposta del BackEnd" + response.body);
            //Podem filtrar per tots els codis 2XX
            if (response.status == 200) {
              this.Station = response.body;
            } else {
              //Error desconegut
              console.log("Error");
            }
          },
          err => {
            console.log("Error del BackEnd" + err);
            //Podem filtrar per tots els altres codis
          });
    }
  }

  obtainBikes(){
    if(this.StationId!="0") {
      this.StationService.obtainStationBikes(this.StationId)
        .subscribe(response => {
            console.log("Resposta del BackEnd" + response.body);
            //Podem filtrar per tots els codis 2XX
            if (response.status == 200) {
              this.bikes = response.body;
            } else {
              //Error desconegut
              console.log("Error");
            }
          },
          err => {
            console.log("Error del BackEnd" + err);
            //Podem filtrar per tots els altres codis
          });
    }

  }

  botoLlista(idBike) {
    this.dataService.changeBikeId(idBike)
    this.StationService.deleteBike(idBike,this.StationId)
    this.router.navigateByUrl("/api/bike");
  }

  botoAfagir() {
    this.router.navigateByUrl("/api/form");
  }
}
