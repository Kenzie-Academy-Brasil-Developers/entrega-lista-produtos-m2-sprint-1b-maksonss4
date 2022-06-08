const divCarVazio = document.querySelector(".carrinhoVazio")
const btnDoInput = document.querySelector(".btnDoInput")
let qt = 0
let pt = 0

const tagDivPeQ = document.createElement("div")
const tagPquantidadeDivPeQ = document.createElement("p")
const tagSpanQuantidade = document.createElement("span")
const tagPprecoDivPeQ = document.createElement("p")
const tagSpanPreco = document.createElement("span")

tagDivPeQ.classList.add("divQeP")
tagPquantidadeDivPeQ.innerText = "Quantidade"
tagPquantidadeDivPeQ.classList.add("pQuantidade")
tagPprecoDivPeQ.innerText = "Total"
tagSpanPreco.classList.add("spanPreco")
tagSpanQuantidade.classList.add("spanQuantidade")
tagPquantidadeDivPeQ.append(tagSpanQuantidade)
tagPprecoDivPeQ.append(tagSpanPreco)
tagDivPeQ.append(tagPquantidadeDivPeQ, tagPprecoDivPeQ)

function criarCard (produto) {
    const ul = document.querySelector(".containerCards")
    const li = document.createElement("li")
    const img = document.createElement("img")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    const ol = criarOl(produto)
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")

    li.classList.add("liDaUl")
    img.src = produto.img
    img.alt = produto.nome
    h3.innerText = produto.nome
    span.classList.add("colorCinza")
    span.innerText = produto.secao
    p.innerText = parseInt(produto.preco).toLocaleString("pt-br", {style:"currency", currency:"BRL"})
    button.innerText = "Comprar"
    button.addEventListener("click", (p) => {
        addAoCarrinho(produto)
    })

    div.append(p, button)
    li.append(img, h3, span, ol, div)    

    return ul.append(li)
}

function criarOl (produto) {
    const ol = document.createElement("ol")
    ol.classList.add("colorCinza")
    produto.componentes.forEach(element => {
        const li = document.createElement("li")
        li.innerText = element
        return ol.append(li)
    })
    return ol
}

function listarProdutos (listaDeProdutos) {
    listaDeProdutos.forEach(produto => {
        return criarCard(produto)
    })
}
listarProdutos(produtos)

function addAoCarrinho (produto) {
    const divCarrinho = document.querySelector(".carrinho")
    const divContainerCarrinho = document.querySelector(".containerCarrinho")    
    divCarVazio.remove()
    divContainerCarrinho.append(tagDivPeQ)
    qt += 1
    pt += parseInt(produto.preco)
    tagSpanPreco.innerText = pt.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
    tagSpanQuantidade.innerText = qt

    const divConteiner = document.createElement("div")
    const divImgEinf = document.createElement("div")
    const img = document.createElement("img")
    const divInf = document.createElement("div")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    const p = document.createElement("p")
    const imgButton = document.createElement("img")

    imgButton.src = "./src/img/lixeira.png"
    imgButton.classList.add("imgButtonRemov")
    imgButton.addEventListener("click", (event) => {
        return removerDoCarrinho(event.target.parentNode, produto)
    })
    p.innerText = parseInt(produto.preco).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
    span.classList.add("colorCinza")
    span.innerText = produto.secao
    h3.innerText = produto.nome
    divInf.classList.add("divInfItemCar")
    img.src = produto.img
    img.alt = produto.nome
    divImgEinf.classList.add("divImgDiv")
    divConteiner.classList.add("itemDoCarrinho")

    divInf.append(h3, span, p)
    divImgEinf.append(img, divInf)
    divConteiner.append(divImgEinf, imgButton)

    return divCarrinho.insertAdjacentElement("afterbegin" ,divConteiner)
}

function removerDoCarrinho (itemDoCarrinho, produto) {
    const divCarrinho = document.querySelector(".carrinho")
    qt -= 1
    pt -= parseInt(produto.preco)

    if(qt < 1){
        tagDivPeQ.remove()
        divCarrinho.append(divCarVazio)
    }else{
        tagSpanPreco.innerText = pt.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
        tagSpanQuantidade.innerText = qt
    }

    return itemDoCarrinho.remove()
}

// GERANDO CARDS POR SEÇÃO

const btTodos = document.querySelector(".btTodos")
const btHortifruti = document.querySelector(".btHortifruti")
const btPanificadora = document.querySelector(".btPanificadora")
const btLaticinios = document.querySelector(".btLaticinios")

btTodos.addEventListener("click", (event) => {
    return criarCardPorSecao(produtos, event.target.innerHTML)
})
btHortifruti.addEventListener("click", (event) => {
    return criarCardPorSecao(produtos, event.target.innerHTML)
})
btPanificadora.addEventListener("click", (event) => {
    return criarCardPorSecao(produtos, event.target.innerHTML)
})
btLaticinios.addEventListener("click", (event) => {
    return criarCardPorSecao(produtos, event.target.innerHTML)
})

function criarCardPorSecao (listaDeProdutos, string) {    
    const liDaUl = document.querySelectorAll(".liDaUl")
    liDaUl.forEach(li => {
        return li.remove()
    })

    if("TODOS PRODUTOS" === string.toUpperCase()){            
            return listarProdutos(listaDeProdutos)
        }

    listaDeProdutos.forEach(produto => {
        if(produto.secao.toUpperCase() === string.toUpperCase()){
            return criarCard(produto)
        }
    })
}

//gerando cards pelo input

btnDoInput.addEventListener("click", (p) => {
    const input = document.querySelector("#input")

    const liDaUl = document.querySelectorAll(".liDaUl")
    liDaUl.forEach(li => {
        return li.remove()
    })

    criarCardPorSecao(produtos, input.value)
    criarCardPeloNome(produtos, input.value)
    criarCardPelaCategoria(produtos, input.value)    
})

function criarCardPeloNome (listaDeProdutos, inputValue) {
    listaDeProdutos.forEach(produto => {
        if(produto.nome.toUpperCase() === inputValue.toUpperCase()){
            return criarCard(produto)
        }
        
    })
}

function criarCardPelaCategoria (listaDeProdutos, inputValue) {
    listaDeProdutos.forEach(produto => {
        if(produto.categoria.toUpperCase() === inputValue.toUpperCase() && inputValue.toUpperCase() !== produto.nome.toUpperCase()){
            return criarCard(produto)
        }
    })
}