import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';
import { NewOfferPageModule } from './new-offer/new-offer.module';
import { NewOfferPageRoutingModule } from './new-offer/new-offer-routing.module';
import { OfferItemComponent } from './offer-item/offer-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersPageRoutingModule,
    NewOfferPageModule,
    NewOfferPageRoutingModule
  ],
  declarations: [OffersPage, OfferItemComponent]
})
export class OffersPageModule {}
