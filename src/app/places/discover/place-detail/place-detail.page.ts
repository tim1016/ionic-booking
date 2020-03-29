import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      const placeId = paramMap.get('placeId');
      this.place = this.placesService.getPlace(placeId);
    });
  }

  onBookPlace = () => {
    this.actionSheetController
      .create({
        header: 'Choose an action',
        buttons: [
          {
            text: 'Select a date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  };

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalController
      .create({ component: CreateBookingComponent, componentProps: { selectedPlace: this.place, selectedMode: mode } })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
      });
  }
}
