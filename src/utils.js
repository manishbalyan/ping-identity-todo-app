// Generate a unique ID for each todo
export function generateId() {
    return Date.now()+Math.random();
  }
  
  // Sort todos by priority
  export function sortTodosByPriority(todos) {
    const priorities = { critical: 1, moderate: 2, optional: 3 };
    return todos.slice().sort((a, b) => priorities[a.priority] - priorities[b.priority]);
  }
  