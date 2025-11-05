import 'cypress-plugin-api'


describe('Testes de Login - Serverest API', () => {

    it('Deve realizar login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                email: 'fulano@qa.com',
                password: 'teste'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', 'Login realizado com sucesso')
            expect(response.body.authorization).to.exist
        })
    })

    it('Deve falhar ao tentar login com senha incorreta', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            failOnStatusCode: false,
            body: {
                email: 'fulano@qa.com',
                password: 'senhaerrada'
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.eq('Email e/ou senha inválidos')
        })
    })
})
