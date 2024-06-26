import { Injectable } from '@angular/core';
import { Toast } from './toast.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private toasts: Toast[] = [];

  addToast(toast: Toast, duration: number = 3000) {
    this.toasts.push(toast);
    this.toastsSubject.next(this.toasts);
    setTimeout(() => {
      this.removeToast(toast);
    }, duration);
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
    this.toastsSubject.next(this.toasts);
  }
}
