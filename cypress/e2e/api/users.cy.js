import 'cypress-plugin-api'


describe('Testes de Usuários - Serverest API', () => {

    it('Should successfully create user', () => {
        const email = `usuario_${Date.now()}@teste.com`
        cy.request({
            method: 'POST',
            url: '/usuarios',
            body: {
                nome: 'Usuário Teste',
                email,
                password: '1234',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        })
    })

    it('Should fail when creating a user with a duplicate email', () => {
        cy.request({
            method: 'POST',
            url: '/usuarios',
            failOnStatusCode: false,
            body: {
                nome: 'Usuário Existente',
                email: 'fulano@qa.com',
                password: 'teste',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('Este email já está sendo usado')
        })
    })
})
