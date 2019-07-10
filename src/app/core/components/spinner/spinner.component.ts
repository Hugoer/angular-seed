import { Component, Input } from '@angular/core';
import { SvsEventManager } from '@app/core/handlers/eventmanager.service';
import { environment } from '@environment/environment';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['spinner.component.scss']
})

export class SpinnerComponent {

    @Input() isVisible: boolean;
    lastTime: Date;
    counter = 0;

    constructor(
        private eventManager: SvsEventManager
    ) {
        this.counter = 0;
        this.eventManager.subscribe('httpStart', () => {
            this.counter++;
            setTimeout(() => {
                if (this.counter > 0) {
                    this.isVisible = true;
                }
            }, environment.spinner);
        });
        this.eventManager.subscribe('httpStop', () => {
            this.counter--;
            if (this.counter <= 0) {
                this.isVisible = false;
                this.counter = 0;
            } // else if (this.counter < 0) {
            //     this.counter = 0;
            //     this.isVisible = false;
            // }
        });
    }

}
