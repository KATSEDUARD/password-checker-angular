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

    if(password.length === 0) {
      score = 0;
    }
    else {
      if (password.length < 8 && password.length > 0) {
        score = 25;
      } else {
        if (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/.test(password)) {
          score = 100;
        } else if (/^[a-zA-Z]+$/.test(password) || /^\d+$/.test(password) || /^[\W_]+$/.test(password)) {
          score = 50;
        } else if (/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password) || 
        /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]+$/.test(password) || 
        /^[a-zA-Z0-9]+$/.test(password)) {
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
