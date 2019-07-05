import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.scss']
})
export class ConfirmDialogComponent implements OnInit {

    confirm = {
        cancel: '',
        ok: '',
    };
    canClose = true;

    constructor(
        private translateService: TranslateService,
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.translateService.get([
            'global.ok',
            'global.cancel',
            data.positive
        ]).toPromise().then((translation) => {
            this.confirm.cancel = translation['global.cancel'];
            this.confirm.ok = translation[Object.keys(translation)[2]] || translation['global.ok'];
        });
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
