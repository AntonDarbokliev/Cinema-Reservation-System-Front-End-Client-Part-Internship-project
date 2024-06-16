import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() options: { value: string; text: string }[] = [];
  @Input() placeholder = 'Select an option';
  @Output() selectionChange = new EventEmitter<string>();

  onSelectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectionChange.emit(selectElement.value);
  }
}
