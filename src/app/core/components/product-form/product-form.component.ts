import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { reponseToProduct } from 'src/app/global/models/joyaGold.factory';
import { IArchetype, IMaterial, IProduct } from 'src/app/global/models/joyaGold.model';
import { ApiService } from 'src/app/global/service/api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent  implements OnInit {

  @Output('saved') saved: EventEmitter<boolean> = new EventEmitter();

  private formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService);
  private modalService = inject(NgbModal);

  public loading: boolean = false;
  public submitted: boolean = false;
  public _productForm: FormGroup = new FormGroup({});

  public materialList:IMaterial[] = [];
  public archetypeList:IArchetype[] = [];
  
  
  ngOnInit(): void {
    const getMaterials = this.apiService.getMaterials();
    const getArchetypes = this.apiService.getArchetypes();

    const Observables = forkJoin({
      getMaterials,
      getArchetypes
    });

    Observables.subscribe( values => {
      this.materialList = values['getMaterials'];
      this.archetypeList = values['getArchetypes'];
    })

    this._productForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      price: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      materialId: new FormControl('', [Validators.required]),
      archetypeId: new FormControl('', Validators.required)
    });
  }

  onSubmitForm(){
    this.submitted = true;
    
    if(!this._productForm.valid){
      return
    }

    this.loading = true;
    let product:IProduct = reponseToProduct( this._productForm.getRawValue());

    this.apiService.saveProduct( product).subscribe( () => {
      this.loading = false;
      this.submitted = false;
      this.resetForm();
      this.closeModal();
      this.saved.emit(true);
    });
  }

  private resetForm(){
    this._productForm.reset();
    this._productForm.controls['materialId'].setValue("");
    this._productForm.controls['archetypeId'].setValue("");
  }

  private closeModal(){
    if( this.modalService.hasOpenModals() ){
      this.modalService.dismissAll();
    }
  }

}
