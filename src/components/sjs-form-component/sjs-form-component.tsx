import { Component, Prop, Event, State, h, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sjs-form-component',
  styleUrl: 'sjs-form-component.css',
  shadow: true
})
export class SjsFormComponent {
  
  @State() formData: object = {};
  @State() disabledState: boolean = true;
  @Prop() enableValidation: boolean = true;
  @Prop({reflect: false}) disableInputFieldGroup: boolean = false;
  @Prop() signValue: string;
  @Prop() formButtonValue: string = 'Submit';
  @Prop() onlyNumbers: boolean;
  @Prop({reflect: false}) mainInputFieldMaxLength: string;
  @Prop({reflect: false}) additionalFieldMaxLength: string;
  @Event({
    eventName: 'formSubmitEvent',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) onFormSubmitHandler: EventEmitter;

  onInputChange(e: CustomEvent<any>) {
    if(e.detail !== '') {
      this.formData['input'] = e.detail;
    }
    else {
      // @ts-ignore
      const {input, ...rest} = this.formData;
      this.formData = rest;
    }
    this.formValidator();
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.onFormSubmitHandler.emit(this.formData);
  }

  formValidator() {
    if(this.enableValidation) {
      this.disabledState = (Object.entries(this.formData).length === 0 && this.formData.constructor === Object);
    }
    else {
      this.disabledState = false;
    }
  }

  render() {
    return <form onSubmit={(e: any) => this.handleSubmit(e)}>
      <sjs-input-component input-sign-value = {this.signValue}  
      onComputedInputValue = {e=> this.onInputChange(e)}
      allowOnlyNumbers={this.onlyNumbers}
      disableInputFieldGroupFlag= {this.disableInputFieldGroup}
      mainFieldMaxLength= {this.mainInputFieldMaxLength}
      additionalFieldMaxLength= {this.additionalFieldMaxLength}
      ></sjs-input-component>
    <input type="submit" value={this.formButtonValue}  disabled = {this.disabledState}/>
  </form>;
  }
}
