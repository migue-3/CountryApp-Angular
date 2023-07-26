import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img {
      width: 60px;
    }`
  ]
})
export class CountryTableComponent {

  @Input() //Para recibir los paises
  public countries: Country[] = [];

}
