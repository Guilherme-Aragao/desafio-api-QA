import { obterToken } from '../../support/apiHelper'

describe('Testes de Carrinhos - Serverest API', () => {

    // 🔹 Antes de cada teste, garante que o carrinho do usuário esteja limpo
    beforeEach(() => {
        obterToken().then((token) => {
            cy.request({
                method: 'DELETE',
                url: '/carrinhos/cancelar-compra',
                headers: { Authorization: token },
                failOnStatusCode: false, // ignora erro se não houver carrinho ativo
            })
        })
    })

    it('Should create cart successfully', () => {
        obterToken().then((token) => {

            // 1️⃣ Cria produto válido
            cy.request({
                method: 'POST',
                url: '/produtos',
                headers: { Authorization: token },
                body: {
                    nome: `CarProduct_${Date.now()}`,
                    preco: 120,
                    descricao: 'Cart product',
                    quantidade: 5
                }
            }).then((prodResponse) => {
                expect(prodResponse.status).to.eq(201)
                const produtoId = prodResponse.body._id

                // 2️⃣ Cria carrinho com o produto recém-criado
                cy.request({
                    method: 'POST',
                    url: '/carrinhos',
                    headers: { Authorization: token },
                    body: {
                        produtos: [
                            {
                                idProduto: produtoId,
                                quantidade: 1
                            }
                        ]
                    }
                }).then((cartResponse) => {
                    expect(cartResponse.status).to.eq(201)
                    expect(cartResponse.body.message).to.contain('Cadastro realizado com sucesso')
                })
            })
        })
    })

    it('Should fail when creating a cart with a nonexistent product', () => {
        obterToken().then((token) => {
            cy.request({
                method: 'POST',
                url: '/carrinhos',
                headers: { Authorization: token },
                failOnStatusCode: false,
                body: {
                    produtos: [
                        {
                            idProduto: '123456789012345678901234', // ID inválido
                            quantidade: 1
                        }
                    ]
                }
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.match(/Produto não encontrado|Não é permitido possuir produto duplicado|Produto não possui quantidade suficiente/)
            })
        })
    })
})
