import { Component } from '@angular/core';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.scss']
})
export class PasswordCheckerComponent {
  password: string;
  blockColors: string[] = ['gray', 'gray', 'gray'];

  checkPassword() {
    const score = this.calculatePasswordStrength(this.password);
    this.setBlockColors(score);
  }

  calculatePasswordStrength(password: string): number {

    let score = 0;

    const onlyLetters = /^[a-zA-Z]+$/;
    const onlyDigits = /^\d+$/;
    const onlySymbols = /^[\W_]+$/;

    const allIncluded = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;
    const mixedLettersNumbers = /^[a-zA-Z0-9]+$/;
    const mixedLettersSymbols = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const mixedNumbersSymbols = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]+$/;

    if(password.length === 0) {
      score = 0;
    }
    else {
      if (password.length < 8 && password.length > 0) {
        score = 25;
      } else {
        if (allIncluded.test(password)) {
          score = 100;
        } else if (onlyLetters.test(password) || onlyDigits.test(password) || onlySymbols.test(password)) {
          score = 50;
        } else if (mixedLettersSymbols.test(password) || 
        mixedNumbersSymbols.test(password) || 
        mixedLettersNumbers.test(password)) {
          score = 75;
        } else {
          score = 0;
        }
      }
    }

    return score;
  }

  setBlockColors(score: number) {
    if (score === 0) {
      this.blockColors = ['gray', 'gray', 'gray'];
    }
    if (score === 25) {
      this.blockColors = ['red', 'red', 'red'];
    }
    if (score === 50) {
      this.blockColors = ['red', 'gray', 'gray'];
    }
    if (score === 75) {
      this.blockColors = ['yellow', 'yellow', 'gray'];
    }
    if (score === 100) {
      this.blockColors = ['green', 'green', 'green'];
    }
  }
}
