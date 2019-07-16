import {AfterContentInit, Component, OnInit} from '@angular/core';
import {MainServiceService} from '../shared/main-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterContentInit {

  getOrdersRes: any;
  updateOrderRes: any;

  title: string = 'My first AGM project';
  lat: number;
  lng: number;

  locations = [];

  markers = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  constructor(private service: MainServiceService) { }

  ngOnInit() {
    this.getOrdersFunc();
  }

  ngAfterContentInit(): void {

  }

  getOrdersFunc(): void {
    this.locations.length = 0;
    this.service.getOrders().subscribe(res => {
      this.getOrdersRes = res;
      // this.lat = this.getOrdersRes.response[0].latitude;
      // this.lng = this.getOrdersRes.response[0].longitude;
      console.log('Get Orders Res: ', this.getOrdersRes);
      if (this.getOrdersRes.statusCode == 200) {
        this.getOrdersRes.response.forEach(item => {
          if (item.items.length > 0) {
            if (item.items[0].status == 'pending') {
              this.locations.push({
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
                location: item.location
              });
            }
          }
        });
        console.log('Pending Orders: ', this.locations);
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
