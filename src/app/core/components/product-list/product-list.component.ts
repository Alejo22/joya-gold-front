import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  private alertService = inject(AlertService);
  private modalService = inject(NgbModal);
  
  /* Variables */
  productList:IProduct[] = [];

  selectedProduct:IProduct | undefined;


  ngOnInit(): void {
    this.reloadProductList();
  }

  public detailsProduct(content: TemplateRef<any>, product:IProduct){
    this.selectedProduct = product;
    this.openModal(content);
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

  private openModal(content: TemplateRef<any>){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg'  }).result.then(
			(result) => {
				console.log(`Closed with: ${result}`);
			},
			(reason) => {
				console.log(`Dismissed ${reason}`);
			},
		);
  }

}
