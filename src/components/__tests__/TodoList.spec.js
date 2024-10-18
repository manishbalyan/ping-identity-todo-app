import { mount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue'; // Adjust path if necessary
import { describe, it, expect, vi } from 'vitest';

describe('TodoList.vue', () => {
  const TEXTS = {
    BUTTON_EDIT: 'Edit',
    BUTTON_REMOVE: 'Remove',
    BUTTON_CLEAR_ALL: 'Clear All',
  };

  const todos = [
    { id: 1, text: 'Task 1', priority: 'critical' },
    { id: 2, text: 'Task 2', priority: 'moderate' },
    { id: 3, text: 'Task 3', priority: 'optional' },
  ];

  it('renders a list of todos', () => {
    const wrapper = mount(TodoList, {
      props: { todos },
      data() {
        return { TEXTS };
      },
    });

    const todoItems = wrapper.findAll('.todo-item');
    expect(todoItems).toHaveLength(todos.length);

    todos.forEach((todo, index) => {
      expect(todoItems[index].find('.todo-text').text()).toBe(todo.text);
      expect(todoItems[index].find('.todo-priority').text()).toBe(todo.priority);
    });
  });

  it('emits "removeTodo" when delete button is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: { todos },
      data() {
        return { TEXTS };
      },
    });

    await wrapper.findAll('.delete-button')[0].trigger('click');

    expect(wrapper.emitted('removeTodo')).toHaveLength(1);
    expect(wrapper.emitted('removeTodo')[0]).toEqual([1]);
  });

  it('emits "editTodo" with updated values when edit button is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: { todos },
      data() {
        return { TEXTS };
      },
    });

    global.prompt = vi.fn()
      .mockReturnValueOnce('Updated Task 1')  // First prompt for text
      .mockReturnValueOnce('moderate');       // Second prompt for priority

    await wrapper.findAll('.edit-button')[0].trigger('click');

    expect(wrapper.emitted('editTodo')).toHaveLength(1);
    expect(wrapper.emitted('editTodo')[0]).toEqual([{
      id: 1,
      text: 'Updated Task 1',
      priority: 'moderate',
    }]);
  });

  it('emits "clearTodos" when the Clear All button is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: { todos },
      data() {
        return { TEXTS };
      },
    });

    await wrapper.find('.clear-all-button').trigger('click');

    expect(wrapper.emitted('clearTodos')).toHaveLength(1);
  });
});
