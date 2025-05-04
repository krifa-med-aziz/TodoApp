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
const todoitem = document.querySelectorAll('.todo-item');
const itemLeft = document.querySelector('.items_left');
const checkbox = document.querySelectorAll('.todo-checkbox');
const newTodoInput = document.querySelector('#new_todo');
const todoForm = document.querySelector('#todoForm');
const filterBtns = document.querySelectorAll('.filter_btn');
const btns = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('#clear_btn');
const btnToggle = document.querySelector('.toggle_theme');
const themeIcon = document.querySelector('#theme_icon');
const todoList = document.querySelector('.todo_list');
const remove_btns = document.querySelectorAll('.remove_btn');

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
            <li class="todo-item ${
              themeIcon.dataset.theme === 'light' ? 'light' : ''
            }" data-id=${todo.id}>
                <div class="todo-checkbox ${
                  todo.completed ? 'completed' : ''
                }"></div>
                <div class="todoText_Conatiner">
                <span class='todoText ${
                  todo.completed
                    ? themeIcon.dataset.theme === 'light'
                      ? 'completedLight'
                      : 'completed'
                    : ''
                }'>${todo.text}</span
                >
                <button class="remove_btn"><i class="fa-solid fa-xmark"></i></button>
                </div>
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
filterBtns.forEach(filterbtn => {
  filterbtn.addEventListener('click', function (e) {
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

// Toggle theme btn
btnToggle.addEventListener('click', function (e) {
  e.preventDefault();
  setTimeout(function () {
    if (themeIcon.dataset.theme === 'dark') {
      themeIcon.src = '/src/img/icon-sun.svg';
      themeIcon.alt = 'sun';
      themeIcon.dataset.theme = 'light';
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      todoForm.classList.toggle('light');
      todoList.classList.toggle('light');
      todoitem.forEach(item => {
        item.classList.toggle('light');
      });
      renderTodos(data);
    } else {
      themeIcon.src = '/src/img/icon-moon.svg';
      themeIcon.alt = 'moon';
      themeIcon.dataset.theme = 'dark';
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      todoForm.classList.toggle('light');
      todoList.classList.toggle('light');
      todoitem.forEach(item => {
        item.classList.remove('light');
      });
      renderTodos(data);
    }
  }, 1500);
});

// Remove Item button
todoListContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const removeBtn = e.target.closest('.remove_btn');
  if (!removeBtn) return;
  const btnItem = removeBtn.closest('.todo-item ');
  if (!btnItem) return;
  data = data.filter(item => item.id !== parseInt(btnItem.dataset.id));
  saveToLocalStorage();
  renderTodos(data);
});
