import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { FilterBar, type Filter } from './components/FilterBar';
import './App.css';

export default function App() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    const sorted = [...todos].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    if (filter === 'active') return sorted.filter((t) => !t.completed);
    if (filter === 'completed') return sorted.filter((t) => t.completed);
    return sorted;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Tasks</h1>
        <p className="subtitle">Stay organized, get things done.</p>
      </header>

      <main className="app-main">
        <AddTodoForm onAdd={addTodo} />

        <FilterBar
          filter={filter}
          onChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        {filtered.length === 0 ? (
          <div className="empty-state">
            {filter === 'completed'
              ? 'No completed tasks yet.'
              : filter === 'active'
              ? "No active tasks — you're all caught up!"
              : 'Add a task above to get started.'}
          </div>
        ) : (
          <ul className="todo-list">
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
