import { Component, Prop, Event, State, h, EventEmitter } from '@stencil/core';
import { setMaxListeners } from 'cluster';

@Component({
  tag: 'sjs-form-component',
  styleUrl: 'sjs-form-component.css',
  shadow: true
})
export class SjsFormComponent {
  
  @State() formData: object = {};
  @State() disabledState: boolean = false;
  @Prop() enableValidation: boolean = true;
  @Prop({reflect: false}) disableInputFieldGroup: boolean = false;
  @Prop() signValue: string;
  @Prop() formErrorMessage: string;
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
    // @ts-ignore
    const {id} = e.target;
    if(id) {
      const {detail} = e;
      if( detail && detail.value && detail.value !== '' && detail.value !== '0.00') {
        this.formData[id] = e.detail;
      }
      else {
        // @ts-ignore
        const {[id]: removedKey, ...rest} = this.formData;
        this.formData = rest;
      }
    }
    this.formValidator(id);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.onFormSubmitHandler.emit(this.formData);
  }

  formValidator(keyToFind: any) {
    if(this.enableValidation) {
      this.disabledState = (this.formData[keyToFind] === undefined || !this.formData[keyToFind]['isValid']);
    }
    else {
      this.disabledState = false;
    }
  }

  render() {
    return <form onSubmit={(e: any) => this.handleSubmit(e)}>
      {//<!-- Error can be moved to separate component -->
      }
      {this.disabledState ? 
        <strong class='error'>{this.formErrorMessage}</strong> :
        null
      }
      <sjs-input-component id = "amountInput" input-sign-value = {this.signValue}  
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
