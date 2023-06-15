/// <reference types ="cypress"/>

import Ajv from "ajv";
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

describe('Contrato de API com cypress', () => {
    
    it('Faz requisição para API de cadastro de produto', () => {
        cy.request({
            method: 'GET',
            url: 'http://165.227.93.41/lojinha/v2/produtos/11378',
            headers: { token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvaWQiOiIyNTI2IiwidXN1YXJpb2xvZ2luIjoicm9zYW5nZWxhLmNvc3RhIiwidXN1YXJpb25vbWUiOiJSb3NhbmdlbGEifQ.Z5BDbgyuFOwJkSH8Zsl5wqsEQzxqRm8i4UJ9BkWho-s'},
        }).then((response) => {
            cy.fixture('productSchema').then((productSchema) => {
                const validate = ajv.compile(productSchema)
                const valid = validate(response.body)
                if (!valid) cy.log(validate.errors).then(() => {
                    throw new Error('Falha do contrato')
                }) 
              });
        });
    });

    
      
      
      
           
      
      

});