import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { SobreComponent } from './sobre'; // Importando como SobreComponent

describe('Sobre', () => {
  let component: SobreComponent; // Atualizado aqui
  let fixture: ComponentFixture<SobreComponent>; // Atualizado aqui

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Adicione o FormsModule junto com o seu componente
      imports: [SobreComponent, FormsModule], // Atualizado aqui
    }).compileComponents();

    fixture = TestBed.createComponent(SobreComponent); // Atualizado aqui
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});