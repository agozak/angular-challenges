import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <img [src]="imgSrc" width="200px" />

      <section>
        <ng-template #defaultItemTemplate let-value>
          {{ value.text || value.name || value.id || value.toString() }}
        </ng-template>
        <app-list-item
          *ngFor="let item of list"
          [item]="item"
          (delete)="delete.emit($event)">
          <ng-container
            *ngTemplateOutlet="
              itemTemplate ? itemTemplate : defaultItemTemplate;
              context: { $implicit: item }
            " />
        </app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<
  _ItemType,
  _TemplateType extends { $implicit: _ItemType },
> implements AfterViewInit
{
  @Input() list: _ItemType[] | null = null;

  @Input() customClass = '';
  @Input() imgSrc = '';

  @Output() delete = new EventEmitter<_ItemType>();
  @Output() addNewItem = new EventEmitter();

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<_TemplateType>;

  ngAfterViewInit() {
    if (!this.itemTemplate) {
      console.warn('CardComponent: item template not specified. Default used.');
    }
  }
}
