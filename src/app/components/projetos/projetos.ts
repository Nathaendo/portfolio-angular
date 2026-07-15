import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from './modal/modal';
import { PROJETOS_DATA } from './projetos.data';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CommonModule, Modal],
  templateUrl: './projetos.html'
})

export class Projetos implements AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef;

  projetosBase = PROJETOS_DATA;
  projetos = [...PROJETOS_DATA, ...PROJETOS_DATA, ...PROJETOS_DATA];
  projetoSelecionado: any = null;

  readonly cardWidth = 304;
  private scrollListener!: () => void;

  ngAfterViewInit() {
    const el = this.container.nativeElement;
    el.scrollLeft = this.projetosBase.length * this.cardWidth;

    this.scrollListener = () => {
      const meio = this.projetosBase.length * this.cardWidth;
      const inicio = 0;
      const fim = this.projetosBase.length * 2 * this.cardWidth;

      if (el.scrollLeft <= inicio) {
        el.scrollLeft = fim;
      } else if (el.scrollLeft >= fim) {
        el.scrollLeft = meio;
      }
    };

    el.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy() {
    const el = this.container.nativeElement;
    el.removeEventListener('scroll', this.scrollListener);
  }

  abrir(p: any) {
    this.projetoSelecionado = p;
  }

  fecharModalPai() {
    this.projetoSelecionado = null;
  }

  proximo() {
    const el = this.container.nativeElement;
    el.scrollBy({ left: this.cardWidth, behavior: 'smooth' });
  }

  anterior() {
    const el = this.container.nativeElement;
    el.scrollBy({ left: -this.cardWidth, behavior: 'smooth' });
  }
}