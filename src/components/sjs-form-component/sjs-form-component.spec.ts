import { SjsFormComponent } from './sjs-form-component';

it('should set disabledState to "False" when the input is present in formData', ()=> {
    const formEle = new SjsFormComponent();
    expect(formEle.disabledState).toBe(true);
     // @ts-ignore
    const event: CustomEvent<any> = {
        detail : '900.00'
    }
    formEle.onInputChange(event);
    expect(formEle.disabledState).toBe(false);
});