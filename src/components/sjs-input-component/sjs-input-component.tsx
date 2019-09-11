import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { SjsInputSignComponent } from '../sjs-input-sign-component/sjs-input-sign-component';

interface inputValueType {
  value: string,
  isValid: boolean
}

@Component({
  tag: 'sjs-input-component',
  styleUrl: 'sjs-input-component.css',
  scoped: false,
  shadow: true,
})

export class SjsFormComponent {
  
  @State() mainField: inputValueType = {value: '', isValid: false};
  @State() additionalField: inputValueType = {value: '', isValid: false};
  @Prop() inputSignValue: string;
  @Prop() allowOnlyNumbers: boolean = true;
  @Prop() enableInputRequiredValidation: boolean = true;
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
    const computedResult = {
      // @ts-ignore
      value: this.getCombinedValue(this.mainField.value, this.additionalField.value),
      // @ts-ignore
      isValid: this.mainField.isValid
    }
    this.computedInputValue.emit(computedResult); 
     
  }

  onHandleChange(event : any) {
    const {target} = event;
    const value = target.value.replace(/,/g,'');
    switch(target.id) {
      case 'mainField' : {
        const mainField = {
          value : value,
          isValid: target.validity.valid
        }
        this.mainField = {...mainField};
        break;
      }   
      case 'additionalField' : {
        const additionalField = {
          value : event.target.value,
          isValid: event.target.validity.valid
        };
        this.additionalField = {...additionalField};
        break;
      }
      default: {
          break;
      }
    }
  }

  onKeyPress(evt: any) {
    if(this.allowOnlyNumbers) {
      const {key, target} = evt;
      if((key === ',' || key === '.') && target.id === 'mainField') {
        target.nextElementSibling.focus();
      }
      return /^[0-9]*$/.test(key);
    }
  }


  onBlurEvent(e: any) {
    e.preventDefault();
    const obj = {...this.mainField};
   
    if(obj.value && obj.value.indexOf(',')=== -1) {
      obj.value += ',';
    }
    this.mainField = {...obj};
  }
  
  getCombinedValue = (mainField: string, additionalField: string) => {
    let computedValue = '';
    mainField = mainField ? mainField.replace(/,/g,'') : mainField;
    if(mainField && additionalField) {
      computedValue = `${mainField}.${additionalField}`
    }
    else if(mainField) {
      computedValue = mainField;
    }
    else if(additionalField) {
      computedValue = `0.${additionalField}`;
    }
    
    return computedValue;

  }

  render() {
    return <div class="inputFieldsGroup">
        <SjsInputSignComponent sign = {this.inputSignValue}/>
        <input type="text" id= "mainField" placeholder= '0 ,' 
              maxlength = {this.mainFieldMaxLength} 
              value= {this.mainField.value}
              onInput={event => this.onHandleChange(event)} 
              disabled= {this.disableInputFieldGroupFlag}
              required= {this.enableInputRequiredValidation}
              onkeypress = {(event: any) => this.onKeyPress(event)}
              onBlur= {(e:any) => this.onBlurEvent(e)}
              />
        <input type="text" id= "additionalField" 
              placeholder= '00' 
              maxlength = {this.additionalFieldMaxLength} 
              onInput={(event) => this.onHandleChange(event)}
              disabled= {this.disableInputFieldGroupFlag}
              onkeypress = {(event: any) => this.onKeyPress(event)} />
  </div>;
  }
}

