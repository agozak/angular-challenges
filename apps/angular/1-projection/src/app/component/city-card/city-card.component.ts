import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      imgSrc="assets/img/city.png"
      [list]="cities"
      (delete)="delete($any($event))"
      (addNewItem)="addNewItem()"
      customClass="bg-sky-100/50">
      <ng-template let-value>
        <div class="flex flex-col">
          <span>{{ value.name }}</span>
          <span class="text-xs text-gray-500">{{ value.country }}</span>
        </div>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }
  addNewItem() {
    this.store.addOne(randomCity());
  }
  delete(city: City) {
    this.store.deleteOne(city.id);
  }
}
