  window.onload = async function () {
            // Carregar usuários do banco
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
        };

        async function validarFormulario() {
            const descricao = document.getElementById('descricao').value;
            const setor = document.getElementById('setor').value;
            const usuarioId = document.getElementById('usuario').value;
            const prioridade = document.getElementById('prioridade').value.toUpperCase();

            try {
                const resposta = await fetch('http://localhost:3000/tarefas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ descricao, setor, prioridade, usuarioId: Number(usuarioId) })
                });

                if (resposta.ok) {
                    document.getElementById('mensagem').innerText = "Cadastro concluído com sucesso";
                    document.getElementById('cadastroTarefa').reset();
                } else {
                    const erro = await resposta.json();
                    document.getElementById('mensagem').innerText = erro.erro || "Erro ao cadastrar";
                }
            } catch (e) {
                document.getElementById('mensagem').innerText = "Erro ao conectar com o servidor";
            }
            return false;
        }