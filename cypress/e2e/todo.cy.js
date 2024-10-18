describe('Todo Application Integration Test', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the app and display the title', () => {
      cy.get('.title').should('contain', 'To-Do List');
        cy.get('.todo-item').should('not.exist');
    });
  
    it('should add a new todo', () => {
      cy.get('input.todo-input').should('be.visible');
      cy.get('select.priority-select').should('be.visible');
      
      cy.get('input.todo-input').type('New Task');
      cy.get('select.priority-select').select('optional');
      cy.contains('Add To-Do').click();
  
      cy.get('.todo-item').should('have.length', 1);
      cy.get('.todo-item .todo-text').should('contain', 'New Task');
      cy.get('.todo-item .todo-priority').should('contain', 'optional');
    });
  
    it('should edit a todo', () => {
      cy.get('input.todo-input').type('Task to Edit');
      cy.get('select.priority-select').select('moderate');
      cy.contains('Add To-Do').click();
  
      cy.get('.edit-button').first().click();
  
      cy.window().then((win) => {
        cy.stub(win, 'prompt')
          .onFirstCall().returns('Edited Task')
          .onSecondCall().returns('critical');
      });
  
      cy.get('.todo-item .todo-text').should('contain', 'Edited Task');
      cy.get('.todo-item .todo-priority').should('contain', 'critical');
    });
  
    it('should remove a todo', () => {
      cy.get('input.todo-input').type('Task to Remove');
      cy.get('select.priority-select').select('moderate');
      cy.contains('Add To-Do').click();
  
      cy.get('.delete-button').first().click();
  
      cy.get('.todo-item').should('not.exist');
    });
  
    it('should clear all todos', () => {
      cy.get('input.todo-input').type('Task 1');
      cy.get('select.priority-select').select('critical');
      cy.contains('Add To-Do').click();
  
      cy.get('input.todo-input').type('Task 2');
      cy.get('select.priority-select').select('moderate');
      cy.contains('Add To-Do').click();
  
      cy.get('.todo-item').should('have.length', 2);
  
      cy.contains('Clear All').click();
  
      cy.get('.todo-item').should('not.exist');
    });
  
    it('should persist todos in localStorage', () => {
      cy.get('input.todo-input').type('Persistent Task');
      cy.get('select.priority-select').select('optional');
      cy.contains('Add To-Do').click();
  
      cy.reload();
  
      cy.get('.todo-item').should('have.length', 1);
      cy.get('.todo-item .todo-text').should('contain', 'Persistent Task');
      cy.get('.todo-item .todo-priority').should('contain', 'optional');
    });
  });
  