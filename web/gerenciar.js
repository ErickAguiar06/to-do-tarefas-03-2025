async function exibirTarefas() {
    // Busca as tarefas do banco de dados via API
    let tarefas = [];
    try {
        const resp = await fetch('http://localhost:3000/tarefas');
        tarefas = await resp.json();
    } catch {
        document.getElementById('aFazer').innerHTML = "<h2>A Fazer</h2><p>Erro ao carregar tarefas</p>";
        document.getElementById('fazendo').innerHTML = "<h2>Fazendo</h2>";
        document.getElementById('pronto').innerHTML = "<h2>Pronto</h2>";
        return;
    }

    const colunas = {
        "A_FAZER": document.getElementById('aFazer'),
        "FAZENDO": document.getElementById('fazendo'),
        "PRONTO": document.getElementById('pronto')
    };

    // Limpa as colunas
    for (const key in colunas) {
        colunas[key].innerHTML = `<h2>${key.replace('_', ' ')}</h2>`;
    }

    tarefas.forEach((tarefa) => {
        const card = document.createElement('div');
        card.className = 'card-tarefa';
        card.innerHTML = `
            <b>Descrição:</b> ${tarefa.descricao}<br>
            <b>Setor:</b> ${tarefa.setor}<br>
            <b>Prioridade:</b> ${tarefa.prioridade}<br>
            <b>Vinculado a:</b> ${tarefa.usuario ? tarefa.usuario.nome : ''}<br>
            <button class="editar">Editar</button>
            <button class="excluir">Excluir</button>
            <br>
            <input type="radio" name="status${tarefa.id}" value="A_FAZER" ${tarefa.status === 'A_FAZER' ? 'checked' : ''}> A fazer
            <input type="radio" name="status${tarefa.id}" value="FAZENDO" ${tarefa.status === 'FAZENDO' ? 'checked' : ''}> Fazendo
            <input type="radio" name="status${tarefa.id}" value="PRONTO" ${tarefa.status === 'PRONTO' ? 'checked' : ''}> Pronto
            <br>
            <button class="alterar-status">Alterar Status</button>
        `;

        // Excluir tarefa
        card.querySelector('.excluir').onclick = async function() {
            if (confirm('Deseja excluir esta tarefa?')) {
                await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, { method: 'DELETE' });
                exibirTarefas();
            }
        };

        // Editar tarefa (redireciona para cadastro.html com id)
        card.querySelector('.editar').onclick = function() {
            window.location.href = `cadastro.html?id=${tarefa.id}`;
        };

        // Alterar status
        card.querySelector('.alterar-status').onclick = async function() {
            const radios = card.querySelectorAll(`input[type="radio"][name="status${tarefa.id}"]`);
            let novoStatus = tarefa.status;
            radios.forEach(radio => {
                if (radio.checked) novoStatus = radio.value;
            });
            await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: novoStatus })
            });
            exibirTarefas();
        };

        colunas[tarefa.status].appendChild(card);
    });
}

window.onload = exibirTarefas;