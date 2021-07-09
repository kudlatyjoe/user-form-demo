import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ImageProcessService {
    private _acceptedFileTypes = [
        'image/png',
        'image/jpeg'
    ]

    validType = (image: File) => this._acceptedFileTypes.includes(image.type)
    validSize = (image: File) => image.size < 100000
    getBase64Image(image: File): Promise<string> {
        return new Promise((res, rej) => {
            if (!image) return rej("Undefined image!")
            if (!this.validType(image)) return rej("Invalid file format!\n Please provide a .png or .jpeg file.")
            if (!this.validSize(image)) return rej("Image size too large!\n Please provide a <100kB image.")
          
            const reader = new FileReader();  
            reader.readAsDataURL(image);
            reader.onload = () => res(reader.result as string);
        })
      }
}