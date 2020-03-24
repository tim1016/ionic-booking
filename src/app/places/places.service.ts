import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Acadia national park',
      'In the heart of the fashion city',
      'https://www.nps.gov/acad/planyourvisit/images/Kent_Bass-Harbor.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
      375.0
    ),
    new Place(
      'p2',
      'Manhattan Mansion',
      'Manhattan is the most densely populated of New York City’s 5 boroughs. ',
      'https://upload.wikimedia.org/wikipedia/commons/5/54/William_A._Clark_House%2C_Manhattan.jpg',
      309.99
    ),
    new Place(
      'p3',
      "L'Amour Toujour",
      'A romantic place in Paris',
      'https://cdn.pixabay.com/photo/2016/07/03/17/48/lost-places-1495150_960_720.jpg',
      109.99
    )
  ];
  get places() {
    return [...this._places];
  }
  getPlace = (id: string) => this.places.find(place => place.id === id);
  constructor() {}
}
