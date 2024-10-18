<template>
    <div class="list-container">
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <div class="todo-details">
            <span class="todo-text">{{ todo.text }}</span>
            <span class="todo-priority" :class="todo.priority">{{ todo.priority }}</span>
          </div>
          <div class="action-buttons">
            <button @click="editItem(todo)" class="edit-button">{{ TEXTS.BUTTON_EDIT }}</button>
          <button @click="removeItem(todo.id)" class="delete-button">{{ TEXTS.BUTTON_REMOVE }}</button>
          </div>
        </li>
      </ul>
      <button @click="$emit('clearTodos')" class="clear-all-button">
      {{ TEXTS.BUTTON_CLEAR_ALL }}
    </button>
    </div>
  </template>
  
  <script>
  import { TEXTS } from '../constants.js';

  export default {
    props: ['todos'],
    data() {
    return {
      TEXTS,
    };
  },
    methods: {
      removeItem(id) {
        this.$emit('removeTodo', id);
      },
      editItem(todo) {
        const updatedText = prompt('Edit the task:', todo.text);
        const updatedPriority = prompt('Edit the priority:', todo.priority);
        if (updatedText && updatedPriority) {
          this.$emit('editTodo', { ...todo, text: updatedText, priority: updatedPriority });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .list-container {
    margin-top: 1.5rem;
  }
  
  .todo-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;
    margin-bottom: 1rem;
    border-radius: 5px;
  }
  
  .todo-details {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-right: 0.75rem;
  }
  
  .todo-text {
    flex-grow: 1;
    font-size: 1rem;
    color: #333;
  }
  
  .todo-priority {
    text-transform: capitalize;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0.2rem 0.6rem;
    border-radius: 5px;
    color: white;
  }
  
  .todo-priority.critical {
    background-color: #e74c3c;
  }
  
  .todo-priority.moderate {
    background-color: #f39c12;
  }
  
  .todo-priority.optional {
    background-color: #2ecc71;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  
  button {
    background-color: #3498db;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  .delete-button {
    background-color: #e74c3c;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
  }
  
  .clear-all-button {
    background-color: #e67e22;
    margin-top: 1rem;
  }
  
  .clear-all-button:hover {
    background-color: #d35400;
  }
  </style>
  