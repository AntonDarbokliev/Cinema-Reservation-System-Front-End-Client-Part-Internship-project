import { Component, Input } from '@angular/core';
import { Toast } from '../toast.model';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  @Input() toast: Toast = {message: '', type: 'error'};
}
