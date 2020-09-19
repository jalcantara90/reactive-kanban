import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-icon-checkbox',
  templateUrl: './icon-checkbox.component.html',
  styleUrls: ['./icon-checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IconCheckboxComponent),
    multi: true
  }]
})
export class IconCheckboxComponent implements ControlValueAccessor {
  public isDisabled: boolean;
  public isChecked: boolean;
  public onChange: any = (_: any) => {};
  public onTouch: any = () => {};

  constructor(
  ) { }

  toogleCheckbox(isChecked: boolean): void {
    this.isChecked = isChecked;
    this.onTouch();
    this.onChange(this.isChecked);
  }

  writeValue(isChecked: boolean): void {
    this.isChecked = isChecked;
    this.onChange(isChecked);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
