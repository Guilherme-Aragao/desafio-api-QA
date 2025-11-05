export function obterToken() {
    return cy.request({
        method: 'POST',
        url: '/login',
        body: {
            email: 'fulano@qa.com',
            password: 'teste'
        }
    }).then((response) => {
        return response.body.authorization
    })
}
