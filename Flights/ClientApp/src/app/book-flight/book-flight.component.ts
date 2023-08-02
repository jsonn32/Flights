import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlightService} from "../api/services/flight.service";
import {FlightRm} from "../api/models/flight-rm";


@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit{

  constructor(private route: ActivatedRoute,
              private Router: Router,
              private flightService: FlightService) { }

  flightId: string = 'not loaded'
  flight: FlightRm ={}

  //Get the flight ID
  ngOnInit() {
    this.route.paramMap
      .subscribe(p => this.findFlight(p.get("flightId")))
  }

  //Assign flight id helper
  private findFlight = (flightId: string | null) => {

    this.flightId = flightId ?? 'not passed';

    this.flightService.findFlight({id : this.flightId})
      .subscribe(flight => this.flight = flight, this.handleError)
  }

  //Error handler
  private handleError = (err: any) => {

    if(err.status == 404) {
      alert("Flight not found")
      this.Router.navigate(['/search-flights'])
    }
    console.log("Response error. Status: ", err.status)
    console.log("Response error. Status text: ", err.statusText)
    console.log(err)
  }

}
