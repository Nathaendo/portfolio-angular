import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  standalone: true,
  imports: [],
})
export class Modal {

  @Input() projeto: any;
  @Output() fechar = new EventEmitter<void>();

  clicarFechar() {
    this.fechar.emit();
  }
}