import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: false,
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.css'
})
export class MyComponentComponent {
  myVar: string = 'Hello Angular';

  getMyVar(): string {
    return this.myVar;
}
}
