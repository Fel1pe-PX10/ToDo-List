import { todoList } from "..";
import { Todo } from "../classes";

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const btnFiltros    = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {
    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed':'' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked':''}>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}

// Eventos
txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo(nuevoTodo)
        //console.log(todoList);

        // Agregar a la lista de html
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
   
});

divTodoList.addEventListener('click', (evento) => {
    const nombreElemento    = evento.target.localName; // input, label, button
    const todoElemento      = evento.target.parentElement.parentElement; // <li ...
    const todoId            = todoElemento.getAttribute('data-id'); // id del elemento

    if( nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }
    
    if( nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElemento );

    }
});

btnBorrar.addEventListener('click', (evento) => {

    todoList.eliminadosCompletados();


    for (let index = divTodoList.children.length-1; index >= 0; index--) {
        
        const elemento = divTodoList.children[index];
        
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
    
   // console.log(todoList);

});

ulFiltros.addEventListener( 'click', (event) => {

    const filtro = event.target.text;

    if( !filtro ) return;

    btnFiltros.forEach(element => element.classList.remove('selected'));

    event.target.classList.add('selected');

    for (const elemento of divTodoList.children ) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed')

        switch (filtro) {
            case 'Pendientes':
                if( completado )
                    elemento.classList.add('hidden');
            break;

            case 'Completados':
                if( !completado )
                    elemento.classList.add('hidden');
            break;
        }
    }

} )