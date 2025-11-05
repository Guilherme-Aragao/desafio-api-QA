import 'cypress-plugin-api'

import { obterToken } from '../../support/apiHelper'

describe('Testes de Produtos - Serverest API', () => {

    it('Deve criar produto com sucesso (autenticado)', () => {
        obterToken().then((token) => {
            cy.request({
                method: 'POST',
                url: '/produtos',
                headers: { Authorization: token },
                body: {
                    nome: `Produto ${Date.now()}`,
                    preco: 150,
                    descricao: 'Produto teste automatizado',
                    quantidade: 10
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            })
        })
    })

    it('Deve impedir criação de produto sem autenticação', () => {
        cy.request({
            method: 'POST',
            url: '/produtos',
            failOnStatusCode: false,
            body: {
                nome: 'Produto sem token',
                preco: 100,
                descricao: 'Teste sem autenticação',
                quantidade: 10
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Token de acesso ausente')
        })
    })
})
