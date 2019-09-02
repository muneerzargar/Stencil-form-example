import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { SjsInputSignComponent } from '../sjs-input-sign-component/sjs-input-sign-component';

@Component({
  tag: 'sjs-input-component',
  styleUrl: 'sjs-input-component.css',
  scoped: true,
  shadow: false,
})
export class SjsFormComponent {
  
  @State() mainFieldValue: string;
  @State() additionalFieldValue: string;
  @Prop() inputSignValue: string;
  @Prop() allowOnlyNumbers: boolean = true;
  @Prop() disableInputFieldGroupFlag: boolean;
  @Prop({reflect: false}) mainFieldMaxLength: string = '8';
  @Prop({reflect: false}) additionalFieldMaxLength: string = '2'
  @Prop({reflect: false}) decimalPosition: number = 2

   @Event({
    eventName: 'computedInputValue',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) computedInputValue: EventEmitter;

  componentWillUpdate() {
    const combinedValue = this.getCombinedValue(this.mainFieldValue, this.additionalFieldValue);
    this.computedInputValue.emit(combinedValue); 
     
  }

  onHandleChange(event : any) {
    switch(event.target.id) {
        case 'mainField' : {
            this.mainFieldValue = (event.target.value!== '') ? parseFloat(event.target.value).toString() : '';
            break;
        }
        case 'additionalField' : {
            this.additionalFieldValue = event.target.value;
            break;
        }
        default: {
            break;
        }
    }
  }

  onKeyPress(evt: any) {
    if(this.allowOnlyNumbers) {
      return /^[0-9]*$/.test(evt.key);
    }
  }
  
  getCombinedValue = (mainFieldValue: string, additionalFieldValue: string) => {
    let computedValue = '';

    if(mainFieldValue) {
      computedValue = mainFieldValue;
    }

    if(additionalFieldValue) {
      computedValue = `0.${additionalFieldValue}`;
    }

    if(mainFieldValue && additionalFieldValue) {
      computedValue = `${mainFieldValue}.${additionalFieldValue}`
    }

    return parseFloat(computedValue).toFixed(this.decimalPosition);

  }

  render() {
    return <div class="inputFieldsGroup">
        <SjsInputSignComponent sign = {this.inputSignValue}/>
        <input type="text" id= "mainField" placeholder= '0 ,' 
              maxlength = {this.mainFieldMaxLength} 
              value= {this.mainFieldValue}
              onInput={event => this.onHandleChange(event)} 
              disabled= {this.disableInputFieldGroupFlag}
              onkeypress = {(event: any) => this.onKeyPress(event)}/>
        <input type="text" id= "additionalField" 
              placeholder= '00' 
              maxlength = {this.additionalFieldMaxLength} 
              onInput={(event) => this.onHandleChange(event)}
              disabled= {this.disableInputFieldGroupFlag}
              onkeypress = {(event: any) => this.onKeyPress(event)} />
  </div>;
  }
}

