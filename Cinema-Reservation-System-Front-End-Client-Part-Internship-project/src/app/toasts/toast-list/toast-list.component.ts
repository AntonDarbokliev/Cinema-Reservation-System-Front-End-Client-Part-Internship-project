import { Component, OnDestroy, OnInit } from '@angular/core';
import { Toast } from '../toast.model';
import { ToastService } from '../toast.service';
import { ToastComponent } from '../toast/toast.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-list',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toast-list.component.html',
})
export class ToastListComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
