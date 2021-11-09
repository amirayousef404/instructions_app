import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/admin/service.service';

@Component({
  selector: 'app-edit-single-instruction',
  templateUrl: './edit-single-instruction.component.html',
  styleUrls: ['./edit-single-instruction.component.scss']
})
export class EditSingleInstructionComponent implements OnInit {

  hide = true;
  result: any = {}
  msgCheck: any = null
  isSubmited: boolean = false
  flag: boolean = false
  headTitle: String = 'Edit instructions'
  checkTypeFile: String = ''
  showFileNameOld: String = ''
  
  id = this.router.snapshot.paramMap.get('id')

  instructionData : FormGroup = this.fb.group({
    title: ['',[Validators.required , Validators.minLength(3) , Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
    fileName: ['', [Validators.required]]
  })
  


  constructor(private _Service: ServiceService, private _router: Router, private fb: FormBuilder, private router: ActivatedRoute) {
   this.getOldDataInstruction()
  }

  ngOnInit(): void {
     
  }

  uploadFile(event:any){
    let file = event.target.files[0]
    if (file.type !== 'image/gif') {
      this.checkTypeFile = `Please enter the correct gif file type`
    } else {
      this.instructionData.get('fileName')?.setValue(file)
      this.showFileNameOld = file.name
      this.checkTypeFile = ""
    }
  }

// Store and show old data before update
getOldDataInstruction () {
  this._Service.showSingleInstruction(this.id).subscribe(
    res => {
      this._Service.singleInstruction = res.success
    },
    (e) => {
      
    },
    ()=>{
      this.instructionData.get('title')?.setValue(`${this._Service.singleInstruction.title}`)
      this.instructionData.get('description')?.setValue(`${this._Service.singleInstruction.description}`)
      this.instructionData.get('fileName')?.setValue(`${this._Service.singleInstruction.fileName}`)
      this.showFileNameOld = this._Service.singleInstruction.fileName
    }
  ) 
}
  

editInstructionForm(){
  let formData = new FormData()
  formData.append('title', this.instructionData.get('title')?.value)
  formData.append('description', this.instructionData.get('description')?.value)
  formData.append('fileName', this.instructionData.get('fileName')?.value)

  this.isSubmited = true
  
  if (this.instructionData.valid) {
   
    this._Service.editSingleInstruction(this.id, formData).subscribe(
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

get fileName() {
  return this.instructionData.get('fileName')
}


}

  
  
  
  
  
  


  