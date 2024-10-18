<template>
    <div class="form-container">
      <input
        v-model="newTodo.text"
        class="todo-input"
        :placeholder="TEXTS.PLACEHOLDER_TODO_INPUT"
      />
      <select v-model="newTodo.priority" class="priority-select">
        <option :value="'critical'">{{ TEXTS.PRIORITY_CRITICAL }}</option>
      <option :value="'moderate'">{{ TEXTS.PRIORITY_MODERATE }}</option>
      <option :value="'optional'">{{ TEXTS.PRIORITY_OPTIONAL }}</option>
      </select>
      <button @click="handleAddTodo">{{ TEXTS.BUTTON_ADD_TODO }}</button>
    </div>
  </template>
  
  <script>
  import { TEXTS } from '../constants.js';

  export default {
    data() {
      return {
        newTodo: {
          text: '',
          priority: 'critical',
        },
        TEXTS,
      };
    },
    methods: {
      handleAddTodo() {
        if (this.newTodo.text) {
          this.$emit('addTodo', this.newTodo);
          this.newTodo.text = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 10px;
  }
  
  .todo-input {
    flex-grow: 1;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .priority-select {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    background-color: #2ecc71;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  </style>
  