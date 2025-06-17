window.onload = async function () {
    
            try {
                const resp = await fetch('http://localhost:3000/usuarios');
                const usuarios = await resp.json();
                const select = document.getElementById('usuario');
                select.innerHTML = "";
                usuarios.forEach(u => {
                    const opt = document.createElement('option');
                    opt.value = u.id;
                    opt.textContent = u.nome;
                    select.appendChild(opt);
                });
            } catch {
                document.getElementById('mensagem').innerText = "Erro ao carregar usuários";
            }
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (id) {
                try {
                    const resp = await fetch(`http://localhost:3000/tarefas`);
                    const tarefas = await resp.json();
                    const tarefa = tarefas.find(t => t.id == id);
                    if (tarefa) {
                        document.getElementById('descricao').value = tarefa.descricao;
                        document.getElementById('setor').value = tarefa.setor;
                        document.getElementById('usuario').value = tarefa.usuarioId;
                        document.getElementById('prioridade').value = tarefa.prioridade.toLowerCase();
                        // Troca o texto do botão para "Atualizar"
                        document.querySelector('button[type="submit"]').textContent = "Atualizar";
                    }
                } catch {
                    document.getElementById('mensagem').innerText = "Erro ao carregar tarefa para edição";
                }
            }
        };

        async function validarFormulario() {
            const descricao = document.getElementById('descricao').value;
            const setor = document.getElementById('setor').value;
            const usuarioId = document.getElementById('usuario').value;
            const prioridade = document.getElementById('prioridade').value.toUpperCase();

            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');

            try {
                let resposta;
                if (id) {
                    const tarefaResp = await fetch(`http://localhost:3000/tarefas`);
                    const tarefas = await tarefaResp.json();
                    const tarefa = tarefas.find(t => t.id == id);
                    const status = tarefa ? tarefa.status : "A_FAZER";

                    resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ descricao, setor, prioridade, usuarioId: Number(usuarioId), status })
                    });
                } else {
                    resposta = await fetch('http://localhost:3000/tarefas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ descricao, setor, prioridade, usuarioId: Number(usuarioId) })
                    });
                }

                if (resposta.ok) {
                    document.getElementById('mensagem').innerText = id ? "Tarefa atualizada com sucesso" : "Cadastro concluído com sucesso";
                    document.getElementById('cadastroTarefa').reset();
                    setTimeout(() => window.location.href = "gerenciar.html", 1000);
                } else {
                    const erro = await resposta.json();
                    document.getElementById('mensagem').innerText = erro.erro || "Erro ao cadastrar/atualizar";
                }
            } catch (e) {
                document.getElementById('mensagem').innerText = "Erro ao conectar com o servidor";
            }
            return false;
        }