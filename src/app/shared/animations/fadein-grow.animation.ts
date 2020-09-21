import { AnimationTriggerMetadata, trigger, transition, query, style, stagger, animate } from '@angular/animations';

export const fadeInGrow: AnimationTriggerMetadata =
  trigger('fadeInGrow', [
    transition(':enter', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)'}),
        stagger('50ms', [
          animate('100ms', style({ opacity: 1, transform: 'translateY(0px)' }))
        ])
      ])
    ])
  ]);
