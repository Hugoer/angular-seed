import { Directive, HostListener, OnInit } from '@angular/core';
import { SvsEventManager } from '@app/core/handlers/eventmanager.service';

@Directive({
  selector: '[appClosemenu]',
})
export class CloseMenuDirective implements OnInit {
  @HostListener('click')
  clickEvent() {
    this.eventManager.broadcast({
      name: 'closeSideNav',
    });
  }

  constructor(private eventManager: SvsEventManager) {}

  ngOnInit() {}
}
