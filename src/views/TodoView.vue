<template>
    <div id="app">
      <div class="app-container">
        <div class="title">{{ TEXTS.APP_TITLE }}</div>
        <todo-form @addTodo="addTodo"></todo-form>
        <todo-list
          :todos="sortedTodos"
          @editTodo="editTodo"
          @removeTodo="removeTodo"
          @clearTodos="clearTodos"
        ></todo-list>
      </div>
    </div>
  </template>
  
  <script>
  import { TEXTS } from '../constants.js';
  import TodoForm from '../components/TodoForm.vue';
  import TodoList from '../components/TodoList.vue';
  
  export default {
    components: {
      TodoForm,
      TodoList,
    },
    data() {
      return {
        todos: [],
        TEXTS
      };
    },
    computed: {
      sortedTodos() {
        const priorities = { critical: 1, moderate: 2, optional: 3 };
        return this.todos.slice().sort((a, b) => priorities[a.priority] - priorities[b.priority]);
      },
    },
    mounted() {
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      if (savedTodos) {
        this.todos = savedTodos;
      }
    },
    methods: {
      addTodo(newTodo) {
        this.todos.push({ id: Date.now(), ...newTodo });
      },
      removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      clearTodos() {
        this.todos = [];
      },
      editTodo(updatedTodo) {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos.splice(index, 1, updatedTodo);
        }
      },
    },
    watch: {
      todos: {
        handler(todos) {
          localStorage.setItem('todos', JSON.stringify(todos));
        },
        deep: true,
      },
    },
  };
  </script>
  
  <style>
  
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .app-container {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    width: 100%;
  }
  
  .title {
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
    font-weight: 500;
    font-size: 1.7rem;
  }
  
  button {
    cursor: pointer;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  