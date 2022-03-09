import './styles.css';

import {Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// console.log(todoList.todos[1].id);

todoList.todos.forEach( todo => crearTodoHtml( todo ) );

// Esta linea es igual que la anterior solo que en la función flecha del forEach si el mismo argumento es el que se retona se puede dejar de la siguiente manera... anulando el llmado del callback y el parametro que va dentro de los parentesis
// todoList.todos.forEach( crearTodoHtml );

// const tarea = new Todo('Aprender JS');
/* todoList.nuevoTodo(tarea);
console.log(todoList);
crearTodoHtml( tarea );
 */
