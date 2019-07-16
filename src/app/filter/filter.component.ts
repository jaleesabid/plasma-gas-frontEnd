import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../shared/main-service.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup;

  getOrdersRes: any;
  filterRes;

  constructor(private service: MainServiceService) {
    this.filterForm = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  ngOnInit() {
    this.getOrdersFunc();
  }

  getOrdersFunc(): void {
    this.service.getOrders().subscribe(res => {
      this.getOrdersRes = res;
      console.log('Get Orders Res: ', this.getOrdersRes);
      if (this.getOrdersRes.statusCode == 200) {

      }
    });
  }

  filterOrdersFunc(val) {
    console.log('hello filter: ', val);
    this.service.filterOrders(val.fromDate, val.toDate).subscribe(res => {
      this.filterRes = res;
      console.log('Filter Response: ', this.filterRes);
      if (this.filterRes.statusCode == 200) {
        this.getOrdersRes = this.filterRes;
      }
    });
  }

}
