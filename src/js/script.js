'use strict';
let data = [
  { id: 1, text: 'Complete online JavaScript course', completed: true },
  { id: 2, text: 'Jog around the park 3x', completed: false },
  { id: 3, text: '10 minutes meditation', completed: false },
  { id: 4, text: 'Read for 1 hour', completed: false },
  { id: 5, text: 'Pick up groceries', completed: false },
  { id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false },
];

const todoListContainer = document.querySelector('.todo-items');
const itemLeft = document.querySelector('.items_left');
const checkbox = document.querySelectorAll('.todo-checkbox');
const newTodoInput = document.querySelector('#new_todo');
const todoForm = document.querySelector('#todoForm');
const filterBtns = document.querySelector('.filter_btn');
const btns = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('#clear_btn');

//Local storage
const savedData = JSON.parse(localStorage.getItem('TodoData'));
if (savedData) data = savedData;

const saveToLocalStorage = () => {
  localStorage.setItem('TodoData', JSON.stringify(data));
};

// Render todos
const renderTodos = function (list) {
  list.sort((a, b) => a.id - b.id);
  todoListContainer.innerHTML = '';
  let markup = '';
  list.forEach(todo => {
    markup += `
            <li class="todo-item" data-id=${todo.id}>
                <div class="todo-checkbox ${
                  todo.completed ? 'completed' : ''
                }"></div>
                <span class='todoText ${todo.completed ? 'completed' : ''}'>${
      todo.text
    }</span
                >
            </li>`;
  });
  itemLeft.innerHTML = `${list.length} items left`;
  todoListContainer.innerHTML = markup;
};
saveToLocalStorage();
renderTodos(data);

// Toggle todo completion
todoListContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.todo-checkbox');
  if (!clicked) return;
  const todoItem = clicked.closest('.todo-item');
  data = data.map(item => {
    if (item.id === parseInt(todoItem.dataset.id)) {
      return {
        id: item.id,
        text: item.text,
        completed: !item.completed,
      };
    }
    return item;
  });
  saveToLocalStorage();
  renderTodos(data);
});

// Create new todo
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (newTodoInput.value !== '') {
    const newTodoItem = {
      id: 1,
      text: newTodoInput.value.trim(),
      completed: false,
    };
    data.forEach(item => item.id++);
    data.push(newTodoItem);
    saveToLocalStorage();
    renderTodos(data);
    newTodoInput.value = '';
  }
});

// filter todos
filterBtns.addEventListener('click', function (e) {
  const clicked = e.target.closest('.btn');
  if (!clicked) return;
  btns.forEach(btn => btn.classList.remove('active'));
  clicked.classList.add('active');
  const filterBy = clicked.textContent;
  const filteredData = data.filter(item => {
    if (filterBy === 'Active') return item.completed === false;
    if (filterBy === 'Completed') return item.completed === true;
    return item;
  });
  saveToLocalStorage();
  renderTodos(filteredData);
});

// Clear completed
clearBtn.addEventListener('click', function (e) {
  e.preventDefault();
  data = data.filter(item => {
    if (item.completed === false) return item;
  });
  saveToLocalStorage();
  renderTodos(data);
});
