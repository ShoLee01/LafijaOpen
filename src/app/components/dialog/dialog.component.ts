import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  challengeForm !: FormGroup;
  actionBtn: String = "Save"
  status :String = "Add Challenge Form";
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.challengeForm = this.formBuilder.group({
      "title": ['', Validators.required],
      "businessId": ['', Validators.required],
      "urlToImage": ['', Validators.required],
      "challengeType": ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = "Update"
      this.status = "Update Challenge Form"
      this.challengeForm.patchValue(this.editData)
    }
  }

  addChallenge() {
    if (!this.editData) {
      if (this.challengeForm.value) {
        this.api.postChallenge(this.challengeForm.value).subscribe({
          next: Response => {
            alert("Challenge added successfully")
            this.challengeForm.reset()
            this.dialogRef.close('save')
          }, error: err => {
            console.log(err)
          }
        })
      }
    } else {
      this.api.updateChallenge(this.challengeForm.value, this.editData.id).subscribe({
        next: response => {
          alert("Challenge updated successfully")
          this.challengeForm.reset()
          this.dialogRef.close('update')
        }, error: err => {
          console.log(err)
        }
      })
    }
  }

}
