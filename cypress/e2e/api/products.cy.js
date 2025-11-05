import 'cypress-plugin-api'

import { obterToken } from '../../support/apiHelper'

describe('Testes de Produtos - Serverest API', () => {

    it('Should create product successfully (authenticated)', () => {
        obterToken().then((token) => {
            cy.request({
                method: 'POST',
                url: '/produtos',
                headers: { Authorization: token },
                body: {
                    nome: `Product ${Date.now()}`,
                    preco: 150,
                    descricao: 'Automated test product',
                    quantidade: 10
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            })
        })
    })

    it('Should prevent product creation without authentication', () => {
        cy.request({
            method: 'POST',
            url: '/produtos',
            failOnStatusCode: false,
            body: {
                nome: 'Product without token',
                preco: 100,
                descricao: 'Test without authentication',
                quantidade: 10
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Token de acesso ausente')
        })
    })
})
