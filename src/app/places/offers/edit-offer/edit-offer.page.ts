import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;
  placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if (!placeId) {
        this.navCtrl.navigateBack('/places/tabs/offers');
      }
      this.placeSub = this.placesService.getPlace(placeId).subscribe(place => {
        this.place = place;
        this.initForm();
      });
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.place.title, { updateOn: 'blur', validators: [Validators.required] }),
      description: new FormControl(this.place.description, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      })
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) return;
    const { title, description } = this.form.value;
    this.loadingController.create({ message: 'Updating place' }).then(loadingEl => {
      loadingEl.present();
      this.placesService.updatePlace(this.place.id, title, description).subscribe(places => {
        console.log(places);
        loadingEl.dismiss();
        this.form.reset();
        this.navCtrl.navigateBack('/places/tabs/offers');
      });
    });
  }
}
