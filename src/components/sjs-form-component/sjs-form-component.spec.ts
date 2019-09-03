import { SjsFormComponent } from './sjs-form-component';

describe('When Form component is loaded', ()=> {
    let formEle: SjsFormComponent;
    beforeEach(()=> {
         formEle = new SjsFormComponent();
    });

    describe('And formData is Not Empty and isValid is True', ()=> {
        it('should set disabledState to "False"', ()=> {
             // @ts-ignore
            const event: CustomEvent<any> = {
                target: {
                    id : 'foo'
                },
                detail : {
                    value: '90.00',
                    isValid: true
                }
            }
            formEle.onInputChange(event);
            expect(formEle.disabledState).toBe(false);
        });
    });

    describe('And formData is Empty and isValid is False', ()=> {
        it('should set disabledState to "True"', ()=> {
             // @ts-ignore
             const event: CustomEvent<any> = {
                target: {
                    id : 'foo'
                }
            }
            formEle.onInputChange(event);
            expect(formEle.disabledState).toBe(true);
        });
    });

    describe('When event is received from the child component', ()=> {

        describe('And event consists of id and detail object', ()=> {

            it('Should update the formData object with the passed values', ()=> {
                const evt = {
                    target: {
                        id: 'bar'
                    },
                    detail: {
                        value: '200.90',
                        isValid: true
                    }
                }
                expect(formEle.formData).toEqual({});
                formEle.onInputChange(evt);
                expect(formEle.formData).toEqual({bar: {value: '200.90', isValid:true}});
            });
        });

        describe('And event consists of id and detail object with value set to 0.00', ()=> {

            it('Should update the formData object with the passed values', ()=> {
                const evt = {
                    target: {
                        id: 'bar'
                    },
                    detail: {
                        value: '0.00',
                        isValid: true
                    }
                }
                expect(formEle.formData).toEqual({});
                formEle.onInputChange(evt);
                expect(formEle.formData).toEqual({});
            });
        });
    });
});
