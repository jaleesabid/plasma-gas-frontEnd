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

  constructor(private service: MainServiceService) { }

  ngOnInit() {
    this.getOrdersFunc();
  }

  getOrdersFunc(): void {
    this.service.getOrders().subscribe(res => {
      this.getOrdersRes = res;
      console.log('Get Orders Res: ', this.getOrdersRes)
    });
  }

  updateOrderFunc(status, id) {
    this.service.updateOrder(status, id).subscribe(res => {
      console.log('Update Order Res: ', res);
      this.updateOrderRes = res;
      if (this.updateOrderRes.statusCode == 200) {
        this.getOrdersFunc()
      }
    })
  }

}
