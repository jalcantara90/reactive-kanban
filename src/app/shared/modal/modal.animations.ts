import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
  keyframes
} from '@angular/animations';

export const modalAnimations: AnimationTriggerMetadata =
  trigger('modalAnimations', [
    state('enter', style({ transform: 'none' })),
    transition(
      '* => enter',
      animate('450ms',
        keyframes([
          style({ transform: 'scaleY(.005) scaleX(0)', offset: 0 }),
          style({ transform: 'scaleY(.015) scaleX(1)', offset: .6}),
          style({ transform: 'scaleY(1) scaleX(1)', offset: .8 }),
        ])
      )
    ),
    transition(
      '* => void, * => exit',
      animate(
        '200ms',
        keyframes([
          style({ transform: 'scaleY(1) scaleX(1)'}),
          style({ transform: 'scaleY(.005) scaleX(1)' }),
          style({ transform: 'scaleY(.005) scaleX(0)'}),
        ])
      )
    )
]);

