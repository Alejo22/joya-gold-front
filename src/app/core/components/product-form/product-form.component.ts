import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { IArchetype, IMaterial } from 'src/app/global/models/joyaGold.model';
import { ApiService } from 'src/app/global/service/api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent  implements OnInit {

  private formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService);

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

    console.log( this._productForm.getRawValue());

    if(!this._productForm.valid){
      return
    }

  }

}
