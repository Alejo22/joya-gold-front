import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/global/models/joyaGold.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  @Input("product")
  product!: IProduct;

}
