/* tslint:disable:no-bitwise */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Base64Service {
    private keyStr: string = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';

    encode(input: any) {
        let output = '';
        let enc1: any = '';
        let enc2: any = '';
        let enc3: any = '';
        let enc4: any = '';
        let chr1: any = '';
        let chr2: any = '';
        let chr3: any = '';
        let i = 0;

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        }

        return output;
    }

    decode(input: any) {
        return decodeURIComponent(escape(window.atob(input)));
    }
}
