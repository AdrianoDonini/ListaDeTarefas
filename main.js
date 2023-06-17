
class tarefa {
    constructor(tarefa, data, feito){
        this.tarefa = tarefa;
        this.data = data;
        this.feito = feito;
    }       
}

let vetordados = [];
const btnNovaTarefa = document.getElementById('btnNovatarefa');
const btnSalvar = document.getElementById('btn-salvar');
const btnOrdenarData = document.getElementById('OrdenarPorData');

document.getElementById('btn-cancelar').addEventListener('click', ()=>{
    const formNovaTarefa = document.querySelector('.fundoForm');
    formNovaTarefa.classList.remove('fundoFormAdd');
});

btnOrdenarData.addEventListener('click', ()=>{
    function ordenar(a,b){
        return a.data - b.data;
    }
     vetordados.sort(ordenar);
    
    mostrarListaTarefas();
});
function btnCancelar(e){
       vetordados.splice(e, 1);
    mostrarListaTarefas();
}
function verificaFeitos(){
    const lista = [...document.getElementsByTagName('tr')];
    lista.splice(0,1);
    let cont = 0;
    lista.forEach(e => {
        if (e.cells[0].childNodes[0].checked) {
            e.style.backgroundColor = "#8bf18b";
            e.cells[0].innerHTML = `<input type="checkbox" oninput="verificaFeitos()" onBlurname="feito" id="feito">`;
            e.cells[0].childNodes[0].checked = true;
            vetordados[cont].feito = true;
        }else{
            e.style.backgroundColor = "white";
            e.cells[0].innerHTML = `<input type="checkbox" oninput="verificaFeitos()" onBlurname="feito" id="feito">`;
            vetordados[cont].feito = false;
        }
        cont++;
    });
    mostrarListaTarefas();
}
btnNovaTarefa.addEventListener('click', ()=>{
    const formNovaTarefa = document.querySelector('.fundoForm');
    formNovaTarefa.classList.add('fundoFormAdd');

});

btnSalvar.addEventListener('click', ()=>{
    let tarefatext = document.getElementById('tarefatext').value;
    let datatext = document.getElementById('datatext').value;
    datatext = datatext.replace(/\-/g, '');
    
    const formNovaTarefa = document.querySelector('.fundoForm');
    let novaTarefa = new tarefa(tarefatext, datatext, false);
    vetordados.push(novaTarefa);
    mostrarListaTarefas();
    formNovaTarefa.classList.remove('fundoFormAdd');
});


function mostrarListaTarefas(){
    
    let listaAfazer = document.getElementById('listaAfazer');
    listaAfazer.innerHTML = `<tr>
                                <th></th>
                                <th>Feito?</th>
                                <th>Tarefa</th>
                                <th>Data</th>
                            </tr>`;
    for (const key in vetordados) {
        let ano = vetordados[key].data[0] + vetordados[key].data[1] + vetordados[key].data[2] + vetordados[key].data[3];
        let mes = vetordados[key].data[4] + vetordados[key].data[5];
        let dia = vetordados[key].data[6] + vetordados[key].data[7];
        let dataformt = `${dia}/${mes}/${ano}`;
        listaAfazer.innerHTML += `  <tr>
                                        <td><input type="checkbox" oninput="verificaFeitos()" onBlurname="feito" id="feito"></td>
                                        <td>${vetordados[key].feito}</td>
                                        <td>${vetordados[key].tarefa}</td>
                                        <td>${dataformt}</td>
                                        <td><button class="cancelar" onClick="btnCancelar(${key})">Cancelar</button></td>
                                    </tr>`;          
    }
    const lista = [...document.getElementsByTagName('tr')];
    lista.splice(0,1);
    let cont = 0;
    lista.forEach(element => {
        if(element.cells[1].innerText == 'true'){
            element.style.backgroundColor = "#8bf18b";
            element.cells[0].innerHTML = `<input type="checkbox" oninput="verificaFeitos()" onBlurname="feito" id="feito">`;
            element.cells[0].childNodes[0].checked = true;
        }else{
            element.style.backgroundColor = "white";
            element.cells[0].innerHTML = `<input type="checkbox" oninput="verificaFeitos()" onBlurname="feito" id="feito">`;
        }
    });
    }
