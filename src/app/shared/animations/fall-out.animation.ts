import { AnimationTriggerMetadata, trigger, transition, query, style, stagger, animate } from '@angular/animations';

export const fallOutAnimation: AnimationTriggerMetadata =
  trigger('fallOutAnimation', [
    transition(':enter', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px) scale(1.1)' }),
        stagger('100ms', [
          animate('400ms', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
        ])
      ])
    ])
  ]);
