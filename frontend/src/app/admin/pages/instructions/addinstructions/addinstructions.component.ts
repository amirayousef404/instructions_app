import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/admin/service.service';

@Component({
  selector: 'app-addinstructions',
  templateUrl: './addinstructions.component.html',
  styleUrls: ['./addinstructions.component.scss']
})
export class AddinstructionsComponent implements OnInit {

  hide = true;
  result: any = {}
  msgCheck: any = null

  isSubmited: boolean = false
  flag: boolean = false
  headTitle: String = 'Add instructions'
  userId: any = this.router.snapshot.paramMap.get('id')
  
  instructionData : FormGroup = this.fb.group({
    // cat_id: ['',[Validators.required]],
    title: ['',[Validators.required , Validators.minLength(3) , Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
    fileName: ['', [Validators.required]],
    
  })

  constructor(private _Service: ServiceService , private _router:Router, private fb: FormBuilder,private router: ActivatedRoute ) { }

  ngOnInit(): void {}

  
  uploadFile(event:any){
    let file = event.target.files[0] 
    this.instructionData.get('fileName')?.setValue(file)
  }

  addInstructionForm(){
    let formData = new FormData()
    formData.append('user_id', this.userId)
    formData.append('title', this.instructionData.get('title')?.value)
    formData.append('description', this.instructionData.get('description')?.value)
    formData.append('fileName', this.instructionData.get('fileName')?.value)

    this.isSubmited = true

    if (this.instructionData.valid) {
      
      this._Service.addInstruction(formData).subscribe(
        res => { this.result = res },
    
        (e) => { 
          this.flag = false
          this.msgCheck = e.error.message 
        },

        () => {
          if(this.result?.success != "") { 
            this.flag = true
            this.msgCheck = this.result.message
            this.instructionData.reset()
            this.isSubmited = false 
            this._router.navigate(['/instructions'])
          } 
        }
    
      )
    }
  }

  get title() {
    return this.instructionData.get('title')
  }

  get description() {
    return this.instructionData.get('description')
  }
  
}
