import { describe, it, expect } from 'vitest';

import { generateId, sortTodosByPriority } from '../../utils.js';

describe('utils', () => {
  it('should generate a unique ID', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should sort todos by priority', () => {
    const todos = [
      { text: 'Low priority', priority: 'optional' },
      { text: 'Critical task', priority: 'critical' },
      { text: 'Moderate task', priority: 'moderate' },
    ];

    const sortedTodos = sortTodosByPriority(todos);
    expect(sortedTodos[0].priority).toBe('critical');
    expect(sortedTodos[1].priority).toBe('moderate');
    expect(sortedTodos[2].priority).toBe('optional');
  });
});
