import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'img'
})
export class ImgPipe {

  constructor(private sanitizer: DomSanitizer){}

  transform(html: string): unknown {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }

}


