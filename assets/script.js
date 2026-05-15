function irParaTela(numeroTela) {
    document.querySelectorAll('.tela').forEach(t => t.classList.add('hidden'));
    document.getElementById(`tela${numeroTela}`).classList.remove('hidden');
}

// --- VALIDAÇÃO EM TEMPO REAL TELA 1 ---
const inputAmor = document.getElementById('input-amor');
const btnAvancar = document.getElementById('btn-avancar');
const msgErro = document.getElementById('msg-erro');

const nomeCerto = "douglas";

inputAmor.addEventListener('input', (e) => {
    const valor = e.target.value.trim().toLowerCase();
    
    if (valor === "") {
        inputAmor.style.borderColor = '#ddd';
        msgErro.innerText = '';
        btnAvancar.disabled = true;
        
    } else if (valor.includes(nomeCerto)) {
        inputAmor.style.borderColor = '#2ecc71';
        msgErro.innerText = 'Autenticação concluída! Acesso liberado ❤️';
        msgErro.style.color = '#2ecc71';
        btnAvancar.disabled = false;
        
    } else if (nomeCerto.startsWith(valor)) {
        inputAmor.style.borderColor = '#f39c12';
        msgErro.innerText = "Isso... você está no caminho certo! Quase lá...";
        msgErro.style.color = '#f39c12';
        btnAvancar.disabled = true;
        
    } else {
        inputAmor.style.borderColor = '#e74c3c';
        msgErro.innerText = "Epa, falha de segurança! Essa não é a resposta.";
        msgErro.style.color = '#e74c3c';
        btnAvancar.disabled = true; 
    }
});

// Função chamada pelo botão quando o nome "Douglas" é validado
function avancarParaQuiz() {
    const selectAmor = document.getElementById('select-nivel-amor');
    const nivelEscolhido = selectAmor.value;

    if (nivelEscolhido === "maximo") {
        // Resposta certa! Avança para o quiz.
        irParaTela(2);
        carregarPergunta();
        
    } else if (nivelEscolhido === "") {
        // Caso ela tente avançar sem responder essa pergunta
        alert("Alerta: O campo 'Nível de amor' é obrigatório!");
        
    } else {
        // Ela escolheu qualquer opção que não seja a máxima (A pegadinha!)
        // O programa trava e substitui a tela inteira por uma mensagem de erro fatal
        const tela1 = document.getElementById('tela1');
        tela1.innerHTML = `
            <div style="text-align: center; color: #e74c3c;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">⚠️ SISTEMA BLOQUEADO ⚠️</h2>
                <p style="font-size: 1.2rem; color: #333; margin-bottom: 2rem;">
                    <strong>ERRO FATAL:</strong> Nível de amor insuficiente detectado.<br>
                    O sistema não pode continuar a operação por motivos de segurança do coração do desenvolvedor.
                </p>
                <p style="font-size: 0.9rem; color: #7f8c8d;">
                    *Infelizmente não foi possível continuar.*
                </p>
            </div>
        `;
    }
}

// --- LÓGICA DO QUIZ TELA 2 ---
const perguntas = [
    {
        texto: "O que você mais acha bonito nele?",
        opcoes: [
                    "Barriguinha", 
                    "Olhos", 
                    "Nariz", 
                    "Orelhas"
                ], 
        correta: 1 
    },
    {
        texto: "Quando foi o primeiro beijo de vocês?",
        opcoes: [
                    "23/06/2025", 
                    "23/05/2025", 
                    "15/05/2026", 
                    "23/06/2023"
                ], 
        correta: 0 
    },
    {
        texto: "O que vocês mais gostam de fazer juntos?",
        opcoes: [
                    "Assistir filmes e séries", 
                    "Dormir agarradinhos", 
                    "Passear e conhecer lugares novos", 
                    "Todas as alternativas estão corretas"
                ],
        correta: 3 
    }
];

let perguntaAtual = 0;

function carregarPergunta() {
    if (perguntaAtual >= perguntas.length) {
        // Fim do quiz: Mostra a tela de loading
        irParaTela('loading');
        
        // Espera 3 segundos e manda para a Tela 3 (A Frase)
        setTimeout(() => {
            irParaTela(3);
        }, 5000); 
        return;
    }

    const p = perguntas[perguntaAtual];
    document.getElementById('pergunta-titulo').innerText = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById('pergunta-texto').innerText = p.texto;
    
    const container = document.getElementById('opcoes-container');
    container.innerHTML = ''; 

    const letras = ['A) ', 'B) ', 'C) ', 'D) '];
    
    p.opcoes.forEach((opcao, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn-opcao';
        btn.innerText = letras[index] + opcao;
        btn.onclick = () => verificarResposta(index, btn);
        container.appendChild(btn);
    });
}

function verificarResposta(indexEscolhido, botaoElemento) {
    const correta = perguntas[perguntaAtual].correta;
    
    if (indexEscolhido === correta) {
        document.querySelectorAll('.btn-opcao').forEach(b => b.disabled = true);
        
        gerarChuva(); 
        
        setTimeout(() => {
            perguntaAtual++;
            carregarPergunta();
        }, 3000);
    } else {
        botaoElemento.classList.add('erro');
        setTimeout(() => botaoElemento.classList.remove('erro'), 500);
    }
}

// --- EFEITO DE CHUVA ---
function gerarChuva() {
    const container = document.getElementById('chuva-container');
    container.innerHTML = ''; 
    
    // COLOQUE AS FOTOS DA CHUVA AQUI TAMBÉM
    const itens = ['❤️', '😍', '✨', '🥰', '<img src="assets/img/img1.jpeg" alt="Foto">', '<img src="assets/img/img2.jpeg" alt="Foto">', '<img src="assets/img/img3.jpeg" alt="Foto">', '<img src="assets/img/img4.jpeg" alt="Foto">', '<img src="assets/img/img5.jpeg" alt="Foto">']; 

    const quantidade = 30;

    for (let i = 0; i < quantidade; i++) {
        const div = document.createElement('div');
        div.className = 'chuva-item';
        div.innerHTML = itens[Math.floor(Math.random() * itens.length)];
        div.style.left = Math.random() * 100 + 'vw';
        const duracao = Math.random() * 2 + 2;
        div.style.animationDuration = duracao + 's';
        container.appendChild(div);
    }

    setTimeout(() => {
        container.innerHTML = '';
    }, 4000);
}

// --- ANIMAÇÃO DO CORAÇÃO ---
function mostrarAnimacao() {
    // Mostra a tela com o coração pulsando
    irParaTela('animacao'); 

    // TEMPO TOTAL AUMENTADO: Agora espera 6 segundos (6000ms) antes de ir pro pedido.
    // Isso dá: 
    // 1s (delay inicial) + 3s (viagem lenta da flecha) + 2s (suspense final com a flecha cravada)
    setTimeout(() => {
        irParaTela(4); 
    }, 6000); 
}

// --- TELA 4: BOTÃO FUJÃO ---
const btnNao = document.getElementById('btn-nao');

btnNao.addEventListener('mouseenter', fugir);
btnNao.addEventListener('touchstart', fugir); 

function fugir(e) {
    e.preventDefault(); 
    const maxX = window.innerWidth - btnNao.offsetWidth - 20;
    const maxY = window.innerHeight - btnNao.offsetHeight - 20;

    const aleatorioX = Math.floor(Math.random() * maxX);
    const aleatorioY = Math.floor(Math.random() * maxY);

    btnNao.style.position = 'fixed'; 
    btnNao.style.left = aleatorioX + 'px';
    btnNao.style.top = aleatorioY + 'px';
}