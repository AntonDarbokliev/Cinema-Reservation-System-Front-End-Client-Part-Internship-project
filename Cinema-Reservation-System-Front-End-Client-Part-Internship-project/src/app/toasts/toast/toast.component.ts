import { Component, HostBinding, Input } from '@angular/core';
import { Toast } from '../toast.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const toastAnimations = [
  trigger('toastState', [
    state(
      'void',
      style({
        opacity: 0,
      }),
    ),
    state(
      'enter',
      style({
        opacity: 1,
      }),
    ),
    transition(':enter', [animate('300ms ease-in')]),
    transition(':leave', [
      animate(
        '300ms ease-out',
        style({
          opacity: 0,
        }),
      ),
    ]),
  ]),
];

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  animations: toastAnimations,
})
export class ToastComponent {
  @HostBinding('@toastState') toastAnimation = true;

  @Input() toast: Toast = { message: '', type: 'error' };
}
