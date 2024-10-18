import { mount } from '@vue/test-utils';
import TodoForm from '@/components/TodoForm.vue';
import { describe, it, expect, vi } from 'vitest';

describe('TodoForm.vue', () => {
  it('renders the form inputs correctly', () => {
    const wrapper = mount(TodoForm);
    
    const inputField = wrapper.find('input.todo-input');
    expect(inputField.exists()).toBe(true);

    const selectField = wrapper.find('select.priority-select');
    expect(selectField.exists()).toBe(true);

    const addButton = wrapper.find('button');
    expect(addButton.exists()).toBe(true);
  });

  it('clears the input field after adding a todo', async () => {
    const wrapper = mount(TodoForm);

    const inputField = wrapper.find('input.todo-input');
    await inputField.setValue('Test Todo Item');

    await wrapper.find('button').trigger('click');

    expect(inputField.element.value).toBe('');
  });

  it('does not emit "addTodo" if the input text is empty', async () => {
    const wrapper = mount(TodoForm);

    const inputField = wrapper.find('input.todo-input');
    await inputField.setValue('');

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('addTodo')).toBeUndefined();
  });
});
