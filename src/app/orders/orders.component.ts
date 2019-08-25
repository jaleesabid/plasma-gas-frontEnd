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
  orderPrice = [];

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

        const orders = this.getOrdersRes.response;
        let multipliedPrice;
        for (let i = 0; i < orders.length; i++) {
          multipliedPrice = 0;
          if (orders[i].items.length > 0) {
            if (orders[i].items[0].status == 'pending') {
              this.locations.push({
                latitude: parseFloat(orders[i].latitude),
                longitude: parseFloat(orders[i].longitude),
                location: orders[i].location,
                order_id: orders[i].id
              });
            }
          }

          // console.log('Order Detail', orders[i]);
          if (orders[i].items.length <= 0) {
            console.log('Order without items: ');
            orders[i].order_price = 0;
          } else {

            for (let j = 0; j < orders[i].items.length; j++) {
              console.log('item price: ', orders[i].items[j].price, 'Items array Length: ', orders[i].items.length);
              multipliedPrice += orders[i].items[j].price * orders[i].items[j].quantity;
            }

            orders[i].order_price = multipliedPrice;
          }
          console.log('Total price array: ', orders);
        }

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

  moveToLocation(lat, long): void {
    this.lat = Number(lat);
    this.lng = Number(long);
    console.log('current lat long: ', this.lat, this.lng);
  }


}
