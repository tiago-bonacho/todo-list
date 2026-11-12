const formulario = document.getElementById("formulario");
const entradaTarefa = document.getElementById("entradaTarefa");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const apresentarTarefas = document.getElementById("apresentarTarefas");


let grupoTarefas = [];
let idInicial = 1;

// Inserir tarefas e validação de entradas

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    if(entradaTarefa.value.trim() === "") {
        alert("O campo de tarefa não pode ficar em branco");
        return;
    }

    if(entradaTarefa.value.trim().length < 3) {
        alert("Insira uma tarefa com mais do que 2 caracteres");
        return;
    }

    const tarefa = {
        id: idInicial++,
        titulo: entradaTarefa.value.trim(),
        concluida: false
    }

    grupoTarefas.push(tarefa);

    mostrarTarefas();

    entradaTarefa.value = "";
    entradaTarefa.focus();

})

// Construir o bloco de tarefas

function mostrarTarefas() {

    apresentarTarefas.textContent = "";

    grupoTarefas.forEach(function(tarefa) {

        const itemTarefa = document.createElement("div");

        const tituloTarefa = document.createElement("p");
        tituloTarefa.textContent = tarefa.titulo;
        itemTarefa.appendChild(tituloTarefa);

        const botaoEliminar = document.createElement("button");
        botaoEliminar.textContent = `Eliminar`;
        itemTarefa.appendChild(botaoEliminar);

        const botaoConcluirRetomar = document.createElement("button");
        botaoConcluirRetomar.textContent = "Concluir";
        itemTarefa.appendChild(botaoConcluirRetomar);

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        itemTarefa.appendChild(botaoEditar);

        // Botão Concluir/Retomar

        botaoConcluirRetomar.addEventListener("click", function() {
            
            tarefa.concluida = !tarefa.concluida;

            if(tarefa.concluida === true) {

                botaoConcluirRetomar.textContent = "Retomar";
                tituloTarefa.classList.add("concluida");

            } else if (tarefa.concluida === false) {

                botaoConcluirRetomar.textContent = "Concluir";
                tituloTarefa.classList.remove("concluida");
            }
        })

        // Botão Eliminar

        botaoEliminar.addEventListener("click", function() {

            eliminar(tarefa.id);          
        })

        // Verificar o estado da tarefa de forma a manter a formatação correta sempre que o bloco das tarefas é contruído

        if(tarefa.concluida === true) {

            botaoConcluirRetomar.textContent = "Retomar";
            tituloTarefa.classList.add("concluida");

        } else if (tarefa.concluida === false) {

            botaoConcluirRetomar.textContent = "Concluir";
            tituloTarefa.classList.remove("concluida");
        }

        // Botão Editar

        botaoEditar.addEventListener("click", function() {

            const entradaEditar = document.createElement("input");
            entradaEditar.value = tarefa.titulo;
            itemTarefa.appendChild(entradaEditar);

            const botaoConfirmarEdicao = document.createElement("button");
            botaoConfirmarEdicao.textContent = "Confirmar edição";
            itemTarefa.appendChild(botaoConfirmarEdicao);

            const botaoCancelarEdicao = document.createElement("button");
            botaoCancelarEdicao.textContent = "Cancelar edição";
            itemTarefa.appendChild(botaoCancelarEdicao);

            // Botão Confirmar Edição

            botaoConfirmarEdicao.addEventListener("click", function () {

                if(entradaEditar.value.trim() === "") {
                    alert("O campo de tarefa não pode ficar em branco");
                    return;
                }

                if(entradaEditar.value.trim().length < 3) {
                    alert("Insira uma tarefa com mais do que 2 caracteres");
                    return;
                }

                if(entradaEditar.value.trim() === tarefa.titulo) {
                    alert("O novo nome não pode ser igual ao anterior");
                    return;
                }
                
                tarefa.titulo = entradaEditar.value.trim();

                mostrarTarefas();
            })

            botaoEditar.disabled = true;

            // Botão cancelar edição

            botaoCancelarEdicao.addEventListener("click", function() {

                entradaEditar.remove();
                botaoConfirmarEdicao.remove();
                botaoCancelarEdicao.remove();
                botaoEditar.disabled = false;
            })
        })

        apresentarTarefas.appendChild(itemTarefa);
    })
}

// Eliminar uma tarefa

function eliminar(id) {

    grupoTarefas = grupoTarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    })

    mostrarTarefas();
}