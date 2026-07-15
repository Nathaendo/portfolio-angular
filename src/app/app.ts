import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Experiencia } from './components/experiencia/experiencia';
import { SobreComponent } from './components/sobre/sobre';
import { Projetos } from './components/projetos/projetos';
import { Contato } from './components/contato/contato';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, Experiencia, Projetos, SobreComponent, Contato],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio-angular');
}
