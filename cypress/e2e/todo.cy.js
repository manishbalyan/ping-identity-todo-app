describe('Todo Application Integration Test', () => {
    beforeEach(() => {
      // Visit the app's main page before each test
      cy.visit('/');
    });
  
    it('should load the app and display the title', () => {
      // Check if the title is correctly displayed
      cy.get('.title').should('contain', 'To-Do List');
  
      // Ensure there are no todos initially
      cy.get('.todo-item').should('not.exist');
    });
  
    it('should add a new todo', () => {
      // Wait for the form elements to load
      cy.get('input.todo-input').should('be.visible');
      cy.get('select.priority-select').should('be.visible');
      
      // Add a new todo
      cy.get('input.todo-input').type('New Task');
      cy.get('select.priority-select').select('optional');
      cy.contains('Add To-Do').click();
  
      // Verify the new todo is added
      cy.get('.todo-item').should('have.length', 1);
      cy.get('.todo-item .todo-text').should('contain', 'New Task');
      cy.get('.todo-item .todo-priority').should('contain', 'optional');
    });
  
    it('should edit a todo', () => {
      // Add a new todo first
      cy.get('input.todo-input').type('Task to Edit');
      cy.get('select.priority-select').select('moderate');
      cy.contains('Add To-Do').click();
  
      // Click the edit button on the first todo
      cy.get('.edit-button').first().click();
  
      // Mock the window.prompt and simulate user inputs
      cy.window().then((win) => {
        cy.stub(win, 'prompt')
          .onFirstCall().returns('Edited Task')
          .onSecondCall().returns('critical');
      });
  
      // Verify the todo is edited correctly
      cy.get('.todo-item .todo-text').should('contain', 'Edited Task');
      cy.get('.todo-item .todo-priority').should('contain', 'critical');
    });
  
    it('should remove a todo', () => {
      // Add a todo first
      cy.get('input.todo-input').type('Task to Remove');
      cy.get('select.priority-select').select('moderate');
      cy.contains('Add To-Do').click();
  
      // Remove the todo
      cy.get('.delete-button').first().click();
  
      // Verify the todo is removed
      cy.get('.todo-item').should('not.exist');
    });
  
    it('should clear all todos', () => {
      // Add multiple todos
      cy.get('input.todo-input').type('Task 1');
      cy.get('select.priority-select').select('critical');
      cy.contains('Add To-Do').click();
  
      cy.get('input.todo-input').type('Task 2');
      cy.get('select.priority-select').select('moderate');
      cy.contains('Add To-Do').click();
  
      // Ensure both todos are added
      cy.get('.todo-item').should('have.length', 2);
  
      // Clear all todos
      cy.contains('Clear All').click();
  
      // Verify all todos are cleared
      cy.get('.todo-item').should('not.exist');
    });
  
    it('should persist todos in localStorage', () => {
      // Add a todo
      cy.get('input.todo-input').type('Persistent Task');
      cy.get('select.priority-select').select('optional');
      cy.contains('Add To-Do').click();
  
      // Reload the page
      cy.reload();
  
      // Verify the todo is persisted
      cy.get('.todo-item').should('have.length', 1);
      cy.get('.todo-item .todo-text').should('contain', 'Persistent Task');
      cy.get('.todo-item .todo-priority').should('contain', 'optional');
    });
  });
  