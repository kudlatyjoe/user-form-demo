import { APP_BOOTSTRAP_LISTENER, Component } from '@angular/core';
import { SessionStorageFacade } from './services/session-storage.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-form-demo';
  constructor(private storageFacade: SessionStorageFacade) {}
}
