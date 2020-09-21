import { AnimationTriggerMetadata, trigger, state, style, transition, animate } from '@angular/animations';

export const inOutAnimation: AnimationTriggerMetadata =
  trigger('inOutAnimation', [
    state('void', style({height: 0, opacity: 0 })),
    transition(':enter', [
      style({ height: 0, opacity: 0 }),
      animate('.3s ease-out', style({ height: 52, opacity: 1}))
    ]),
    transition(':leave', [
      style({ height: 52, opacity: 1 }),
      animate('.3s ease-in', style({ height: 0, opacity: 0 }))
    ])
  ]);
