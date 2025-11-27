
(function () {
  const STORAGE_KEY = 'tasks';
  let currentEditId = null;

  function getTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function displayTasks() {
    const tbody = document.getElementById('taskTableBody');
    
    const tableBody = tbody || document.querySelector('table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const tasks = getTasks();

    tasks.forEach((t) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.name}</td>
        <td>${t.description}</td>
        <td>${t.date}</td>
        <td>${t.status || ''}</td>
        <td>
          <button data-action="edit" data-id="${t.id}">Éditer</button>
          <button data-action="delete" data-id="${t.id}">Supprimer</button>
        </td>
      `;

      
      const editBtn = row.querySelector('button[data-action="edit"]');
      const delBtn = row.querySelector('button[data-action="delete"]');

      if (editBtn) editBtn.addEventListener('click', () => editTask(t.id));
      if (delBtn) delBtn.addEventListener('click', () => {
        showConfirmModal('Voulez-vous vraiment supprimer cette tâche ?', () => deleteTask(t.id));
      });

      tableBody.appendChild(row);
    });
  }

  function createOrUpdateTask(event) {
    if (event) event.preventDefault();
    const form = document.querySelector('form');
    if (!form) return;

    const name = document.getElementById('taskName')?.value?.trim();
    const description = document.getElementById('description')?.value?.trim();
    const date = document.getElementById('dueDate')?.value;
    const status = document.getElementById('status')?.value;

    if (!name || !description || !date) {
      showNotification('Veuillez remplir les champs obligatoires.', 'warning', 2500);
      return;
    }

    const tasks = getTasks();

    if (currentEditId) {
      const idx = tasks.findIndex(t => t.id === currentEditId);
      if (idx === -1) { showNotification('Tâche introuvable !', 'danger'); return; }
      tasks[idx] = { ...tasks[idx], name, description, date, status };
      currentEditId = null;
      saveTasks(tasks);
      form.reset();
      displayTasks();
      showNotification('Tâche mise à jour', 'success');
      const submit = form.querySelector('button[type="submit"]');
      if (submit) submit.textContent = 'Ajouter la tâche';
      return;
    }

    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name, description, date, status
    };

    tasks.push(newTask);
    saveTasks(tasks);
    form.reset();
    displayTasks();
    showNotification('Tâche créée', 'success');
  }

  function editTask(id) {
    const tasks = getTasks();
    const t = tasks.find(x => x.id === id);
    if (!t) { showNotification('Tâche introuvable !', 'danger'); return; }

    document.getElementById('taskName').value = t.name || '';
    document.getElementById('description').value = t.description || '';
    document.getElementById('dueDate').value = t.date || '';
    if (document.getElementById('status')) document.getElementById('status').value = t.status || '';

    const form = document.querySelector('form');
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.textContent = 'Mettre à jour';
    currentEditId = id;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    displayTasks();
    showNotification('Tâche supprimée', 'success');
  }

  document.addEventListener('DOMContentLoaded', function () {
    displayTasks();
    const form = document.querySelector('form');
    if (form) form.addEventListener('submit', createOrUpdateTask);
  });

  
  window.taskApp = { displayTasks, createOrUpdateTask, editTask, deleteTask };
})();
