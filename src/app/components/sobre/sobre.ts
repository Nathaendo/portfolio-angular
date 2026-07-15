import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ComandoHist {
  cmd: string;
  output: string[];
}

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sobre.html',
})
export class SobreComponent implements OnInit {
  historico: ComandoHist[] = [];
  inputAtual: string = '';
  
  // Lista de comandos para o Autocomplete funcionar
  comandosDisponiveis: string[] = ['help', 'ls', 'cat perfil.txt', 'skills', 'experiencia', 'clear'];

  @ViewChild('terminalInput') terminalInput!: ElementRef;

  ngOnInit() {
    this.executar('cat perfil.txt');
  }

  // --- Lógica do Tab Autocomplete ---
  onTab(event: Event) {
    event.preventDefault();
    const digitado = this.inputAtual.toLowerCase();
    if (!digitado) return;

    const matches = this.comandosDisponiveis.filter(cmd => cmd.startsWith(digitado));

    if (matches.length === 1) {
      this.inputAtual = matches[0];
    } else if (matches.length > 1) {
      this.historico.push({
        cmd: this.inputAtual,
        output: [matches.join('    ')]
      });
      this.rolarParaBaixo();
    }
  }

  onEnter() {
    if (this.inputAtual.trim()) {
      this.executar(this.inputAtual.trim().toLowerCase());
    }
    this.inputAtual = '';
    this.rolarParaBaixo();
  }

  rolarParaBaixo() {
    setTimeout(() => {
      const terminal = document.getElementById('terminal-body');
      if (terminal) terminal.scrollTop = terminal.scrollHeight;
    }, 10);
  }

  executar(cmd: string) {
    let output: string[] = [];

    switch(cmd) {
      case 'help':
      case 'ls':
        output = [
          'Comandos disponíveis:',
          '  cat perfil.txt  - Resumo do meu perfil',
          '  skills          - Minhas hard skills e stack',
          '  experiencia     - Onde eu trabalho/estudo',
          '  clear           - Limpa a tela do terminal'
        ];
        break;
      case 'cat perfil.txt':
        output = [
          'Estudante do sexto período de Ciência da Computação na UFPR.', 
          'Estagiário da MPS Informática.',
          'Jogador de Tênis e amante de videogames.'
        ];
        break;
      case 'skills':
        output = [
          '[Linguagens]: C++, C#, C, Assembly (x86, MIPS, RISC-V), Java, JS, Python, SQL',
          '[Frameworks]: ASP.NET WebForms, Angular, NHibernate, Oracle, SQL',
          '[Ambiente]: Linux e Windows',
          '[Ferramentas]: Visual Studio, VS Code, Neovim/Vim, Matplotlib, PyTorch, Pandas, NumPy'
        ];
        break;
      case 'experiencia':
        output = [
          'Estudante de Ciência da Computação na UFPR.',
          'Estagiário de Desenvolvimento de Software e Inovação na MPS Informática.',
          'Membro bolsista da equipe Capimara (Treinamento Maratona SBC/ICPC).',
          'Monitor da disciplina Desafios de Programação.',
          'Iniciação Científica em Teoria de Grafos.',
          'Certificação de matemática avançada em Cálculo I e Cálculo II.'
        ];
        break;
      case 'clear':
        this.historico = [];
        return;
      default:
        output = [`bash: ${cmd}: comando não encontrado. Digite 'help' para ver as opções.`];
    }

    this.historico.push({ cmd, output });
  }

  focarInput() {
    this.terminalInput?.nativeElement?.focus();
  }
}