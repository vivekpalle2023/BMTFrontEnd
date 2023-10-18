import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-successmodal',
  templateUrl: './successmodal.component.html',
  styleUrls: ['./successmodal.component.css']
})
export class SuccessmodalComponent{
  title?: string;

  ngOnInit(): void {
  }

  constructor(private modalService: BsModalService) { }


  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
}
