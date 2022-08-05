var estado = {quadro: [], jogoAtual: [], jogosSalvos: []}

function comeco () {
    criarQuadro ()
    novoJogo ()

}

function criarQuadro () {
    estado.quadro = []

    for (var i = 1; i <= 60; i++)
    estado.quadro.push(i)
}

function novoJogo () {
    resetarJogo ()
    render ()

    console.log (estado.jogoAtual)
}

function render () {
    renderQuadro ()
    renderBotoes ()
    renderSalvos ()
}

function renderQuadro () {
    var divQuadro = document.querySelector ('#numeros')
    divQuadro.innerHTML = ''

    var ulNumeros = document.createElement ('ul')

    for (var i = 0; i < estado.quadro.length; i++){
    var numeroAtual = estado.quadro [i]

    var liNumero = document.createElement('li')
    liNumero.textContent = numeroAtual

    liNumero.addEventListener ('click', fazendoClique)

    ulNumeros.appendChild (liNumero)
    }

    divQuadro.appendChild (ulNumeros)
}

function fazendoClique (event) {
    var valor = Number (event.currentTarget.textContent)
    
    if (numeroNoJogo(valor)){
    removerNumero (valor)
    } else {
        adicionarNumeroAoJogo (valor)
    }
    console.log (estado.jogoAtual)
}

function renderBotoes() {
    var divBotoes = document.querySelector ('#botoes')
    divBotoes.innerHTML = ''

    var botaoNovoJogo = criarNovoJogoBotao ()
    var botaoJogoAleatorio = criarBotaoJogoAleatorio ()
    var botaoSalvarJogo = criarBotaoSalvarJogo()

    divBotoes.appendChild (botaoNovoJogo)
    divBotoes.appendChild (botaoJogoAleatorio)
    divBotoes.appendChild (botaoSalvarJogo)
}

function criarBotaoJogoAleatorio () {
    var botao = document.createElement ('button')
    botao.textContent = 'Jogo Aleatório'

    botao.addEventListener ('click', jogoAleatorio)

    return botao
}

function criarNovoJogoBotao () {
    var botao = document.createElement ('button')
    botao.textContent = 'Novo Jogo'

    botao.addEventListener ('click', novoJogo)

    return botao
}

function criarBotaoSalvarJogo () {
    var botao = document.createElement ('button')
    botao.textContent = 'Salvar Jogo'

    botao.addEventListener ('click', salvarJogo)

    return botao
}

function renderSalvos () {

}

function adicionarNumeroAoJogo (numeroParaAdicionar) {
    if (numeroParaAdicionar < 1 || numeroParaAdicionar > 60) {
        console.error ('Número inválido.', numeroParaAdicionar)
        return
    }
    if (estado.jogoAtual.length >=6) {
        console.error ('Jogo completo.')
        return
    }
    if (numeroNoJogo (numeroParaAdicionar)) {
        console.error ('Este número já está no jogo.', numeroParaAdicionar)
        return
    }
    estado.jogoAtual.push (numeroParaAdicionar)
}

function removerNumero (numeroParaRemover) {
    if (numeroParaRemover < 1 || numeroParaRemover > 60) {
        console.error ('Número inválido.', numeroParaRemover)
        return
    }
    var novoJogo = []

    for (var i = 0; i < estado.jogoAtual.length; i++) {
        var numeroAtual = estado.jogoAtual [i]

        if (numeroAtual === numeroParaRemover) {
            continue
        }
        novoJogo.push (numeroAtual)
    }
    estado.jogoAtual = novoJogo
}

function numeroNoJogo (checarNumero) {
    return estado.jogoAtual.includes (checarNumero)
}

function salvarJogo () {
    if (jogoCompleto ()) {
        console.error ('O jogo não está completo!')
        return
    }
    estado.jogosSalvos.push (estado.jogoAtual)

    console.log (estado.jogoAtual)
    novoJogo ()
}

function jogoCompleto () {
    return estado.jogoAtual.length === 6
}

function resetarJogo () {
    estado.jogoAtual = []
}

function jogoAleatorio() {
    resetarJogo ()

    while (!jogoCompleto ()) {
    var numeroAleatorio = Math.ceil (Math.random () * 60)
        adicionarNumeroAoJogo (numeroAleatorio)
    }
    console.log (estado.jogoAtual)
}

comeco()
