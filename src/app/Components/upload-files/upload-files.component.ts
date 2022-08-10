import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UploadFileService } from 'src/app/Service/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})

export class UploadFilesComponent implements OnInit {

  //liste des files 
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
   
  }
  
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
         
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  
  onFileChanged(event: any) {
      for (var i = 0; i <= event.target.files.length - 1; i++) {
        var selectedFile = event.target.files[i];
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name)
    }
  
    this.attachment.nativeElement.value = '';
  }
  
  
  
  removeSelectedFile(index:any) {
   // Delete the item from fileNames list
   this.listOfFiles.splice(index, 1);
   // delete file from FileList
   this.fileList.splice(index, 1);
  }
}