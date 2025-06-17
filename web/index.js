async function validarFormulario() {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;

            try {
                const resposta = await fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email })
                });

                if (resposta.ok) {
                    document.getElementById('mensagem').innerText = "Cadastro concluído com sucesso";
                    document.getElementById('cadastroUsuario').reset();
                } else {
                    const erro = await resposta.json();
                    document.getElementById('mensagem').innerText = erro.erro || "Erro ao cadastrar";
                }
            } catch (e) {
                document.getElementById('mensagem').innerText = "Erro ao conectar com o servidor";
            }
            return false;
        }