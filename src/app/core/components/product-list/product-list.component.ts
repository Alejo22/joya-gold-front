import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from 'src/app/global/models/joyaGold.model';
import { AlertService, ICON_SWAL } from 'src/app/global/service/alert.service';
import { ApiService } from 'src/app/global/service/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent  implements OnInit {

  /* Service */
  private apiSerivice = inject(ApiService);
  private alertService = inject(AlertService)
  
  /* Variables */
  productList:IProduct[] = [];


  ngOnInit(): void {
    this.reloadProductList();
  }

  public detailsProduct(product:IProduct){
    console.log("detailsProduct");
  }

  public editProduct(product:IProduct){
    console.log("editProduct");
  }

  public deleteProduct(product:IProduct){
    this.alertService.createAlert("Confirmación", "¿Deseas eliminar el producto?", true, ICON_SWAL.QUESTION).then( resolve => {
      if(resolve.isConfirmed){
        this.apiSerivice.deleteProducts(product.id).subscribe( () => {
          this.alertService.createAlert("Información", "Producto eliminado correctamente", false, ICON_SWAL.SUCCESS);
          this.reloadProductList();
        });
      }
    });
  }

  private reloadProductList(){
    this.apiSerivice.getProducts().subscribe( response => {
      this.productList = response;
    })
  }

}
