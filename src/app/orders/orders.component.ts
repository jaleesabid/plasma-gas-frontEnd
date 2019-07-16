import { Component, OnInit } from '@angular/core';
import {MainServiceService} from '../shared/main-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  getOrdersRes: any;
  updateOrderRes: any;

  title: string = 'My first AGM project';
  lat: number;
  lng: number;

  constructor(private service: MainServiceService) { }

  ngOnInit() {
    this.getOrdersFunc();
  }

  getOrdersFunc(): void {
    this.service.getOrders().subscribe(res => {
      this.getOrdersRes = res;
      // this.lat = this.getOrdersRes.response[0].latitude;
      // this.lng = this.getOrdersRes.response[0].longitude;
      console.log('Get Orders Res: ', this.getOrdersRes);
      if (this.getOrdersRes.statusCode == 200) {
        this.getLocation();
      }
    });
  }

  updateOrderFunc(status, id) {
    this.service.updateOrder(status, id).subscribe(res => {
      console.log('Update Order Res: ', res);
      this.updateOrderRes = res;
      if (this.updateOrderRes.statusCode == 200) {
        this.getOrdersFunc();
      }
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.showPosition(pos));
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    console.log('Lat: ', position.coords.latitude, 'Long: ', position.coords.longitude);
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

}
