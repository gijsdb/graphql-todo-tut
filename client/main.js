console.log("waguan")

const GRAPHQL_API = 'http://localhost:4000/'
const todolist = document.querySelector('#todo-list')
const form = document.querySelector('form')
const titleInput = document.querySelector('#title')

const query = `
    query {
        allTodos{
        id
        title
        done
        }
    }
`

fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
        query
    }),
    headers: {
        'content-type': 'application/json'
    }
})
    .then(response => response.json())
    .then(result => {
        const todos = result.data.allTodos;

        todolist.innerHTML = todos.reduce((html, todo) => {
            return html + `<li>${todo.title}</li>`;
        }, '');
    });

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value
    const query = `
    mutation {
        createTodo(title: "${title}", done: false) {
            id
            title
            done
        }
    }`;


    fetch(GRAPHQL_API, {
        method: 'POST',
        body: JSON.stringify({
            query
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(result => {
        todolist.innerHTML += `<li>${title}</li>`;
    });
})