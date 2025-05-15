document.body.innerHTML = '<h1>Hello, world!</h1>';

if (module.hot) {
  module.hot.accept();
}

async function fetchTodos() {
  try {
    const response = await fetch('/todos');
    if (!response.ok) throw new Error('Ошибка сети');
    const todos = await response.json();

    const ul = document.createElement('ul');
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = `${todo.text} - ${todo.completed ? 'Выполнено' : 'В процессе'}`;
      ul.appendChild(li);
    });
    document.body.appendChild(ul);
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

fetchTodos();