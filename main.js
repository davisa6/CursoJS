var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector ('#app input');
var buttonElement = document.querySelector ('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];
function renderTodos () {
        listElement.innerHTML = '';
        for (todo of todos) {
                var todoElement = document.createElement('li');
                var todoText = document.createTextNode(todo);
                var linkElement = document.createElement('a');
                linkElement.href = '#';
                var pos = todos.indexOf(todo);
                var linkText = document.createTextNode(' Excluir');
                linkElement.setAttribute('onclick','deleteTodo(' + pos + ')');
                linkElement.appendChild(linkText); 
                todoElement.appendChild(todoText);
                todoElement.appendChild(linkElement);
                listElement.appendChild(todoElement);
        }
}
function addTodo() {
        var todoText = axios.get('https://api.github.com/users/' + inputElement.value + '/repos')
        .then(response => (todos.push(response.data)))
        .catch(error => console.log(error));
        inputElement.value = '';
        renderTodos();
}
buttonElement.onclick = addTodo;
function deleteTodo (pos) {
        todos.splice(pos, 1);
        renderTodos();
        saveToStorage();
}
function saveToStorage() {
        localStorage.setItem('list_todos', JSON.stringify(todos));
}