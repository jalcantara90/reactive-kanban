import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const sidebarAnimation: {
  readonly toogleOpenClose: AnimationTriggerMetadata;
} = {
  toogleOpenClose: trigger('toogleOpenClose', [
    state('open', style({
      width: '260px'
    })),
    state('close', style({
      width: '60px'
    })),
    transition('open => close', animate('500ms ease-in-out')),
    transition('close => open', animate('500ms ease-in-out')),
  ])
};
