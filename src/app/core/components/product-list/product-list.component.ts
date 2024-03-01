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

  public savedProduct(event:any){
    if(event){
      this.alertService.createAlert("Información", "Se ha creado el producto correctamente", false, ICON_SWAL.SUCCESS);
      this.reloadProductList();
    }
  }

  public detailsProduct(product:IProduct, content: TemplateRef<any>){
    this.selectedProduct = product;
    this.openModal(content);
  }

  public createProduct(content: TemplateRef<any>){
    this.openModal(content);
  }

  public editProduct(product:IProduct, content: TemplateRef<any>){
    this.alertService.createAlert("Información", "Método en implementación", false, ICON_SWAL.WARNING);
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
    this.apiSerivice.getProducts().subscribe( productList => {
      this.productList = productList.sort( (a , b) => a.name.localeCompare(b.name) );
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
