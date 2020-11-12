import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  codeValue: String = localStorage.getItem("liveCode");

  paymentForm: FormGroup;

  allPayments: Array<any> = localStorage.getItem("allPayments") ? JSON.parse(localStorage.getItem("allPayments")) : [];

  paymentsArray: object = {};

  amount: string = '';
  payment: string = '';



  addNewRow(pay, amount) {
    this.paymentsArray = {
      name: `Payment ${pay.value}`,
      amount: amount.value,
      code: this.codeValue,
      grid: 0
    };
    this.allPayments.push(this.paymentsArray)
    localStorage.setItem("allPayments", JSON.stringify(this.allPayments))
    return
  }


  deleteRow(index) {
    this.allPayments.splice(index, 1);
    localStorage.setItem("allPayments", JSON.stringify(this.allPayments));
    return
  }


  constructor(formBuilder: FormBuilder) {
    this.paymentForm = formBuilder.group({
      payments: new FormControl(),
      amount: new FormControl(),
    })
  }


  ngOnInit(): void {

  }






}
