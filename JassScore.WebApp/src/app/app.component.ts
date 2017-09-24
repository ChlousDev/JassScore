import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public cardList: string[]=[];
  public showScanner: boolean = true;

  constructor(private changeDetectorRef: ChangeDetectorRef){

  }

  public cardScanned(scannedText:string){
    this.cardList.push(scannedText);
    //24.09.2017 NJ: Hack reinit qrcode reader, as it stops scanning after one ore two codes
    this.showScanner=false;
    this.changeDetectorRef.detectChanges();
    this.showScanner=true;
    this.changeDetectorRef.detectChanges();
  }
  
}


