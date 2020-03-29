import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if (!placeId) {
        this.navCtrl.navigateBack('/places/tabs/offers');
      }
      this.place = this.placesService.getPlace(placeId);
      this.initForm();
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

  onEditOffer(form: NgForm) {
    console.log(form);
  }
}
