import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-failuremodal',
  templateUrl: './failuremodal.component.html',
  styleUrls: ['./failuremodal.component.css']
})
export class FailuremodalComponent{
  title?: string;
  
  ngOnInit(): void {
  }

  constructor(private modalService: BsModalService) { }


  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
}
