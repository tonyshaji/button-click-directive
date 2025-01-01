import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MockService } from './services/mock.service';
import { ButtonClickDirective } from './directive/button-click.directive';

@Component({
  selector: 'app-root',
  imports: [ButtonClickDirective],
  providers: [ MockService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'button-click-directive';
  mockService = inject(MockService);
  
  handler: any = (e:any) => {
    console.log(e);
    const api = this.mockService.btnclickCheck();
    api.subscribe((res) => {
      console.log(res);
    });
    return api;
  };
}
