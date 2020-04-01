import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  placeSub: Subscription;
  isBookable = false;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private bookingService: BookingService,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      const placeId = paramMap.get('placeId');
      this.placeSub = this.placesService.getPlace(placeId).subscribe(place => {
        this.place = place;
        this.isBookable = this.place.userId !== this.authService.userId;
      });
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
        if (resultData.role === 'confirm') {
          const data = resultData.data.bookingData;
          this.loadingController.create({ message: 'Creating new booking' }).then(loadingEl => {
            loadingEl.present();
            this.bookingService
              .addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              )
              .subscribe(() => {
                loadingEl.dismiss();
              });
          });
        }
      });
  }

  ngOnDestroy = () => {
    if (this.placeSub) this.placeSub.unsubscribe();
  };
}
