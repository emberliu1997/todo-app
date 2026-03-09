import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_LABELS: Record<Todo['priority'], string> = {
  low: 'Low',
  medium: 'Med',
  high: 'High',
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(dueDate: string, completed: boolean): boolean {
  if (completed) return false;
  const [year, month, day] = dueDate.split('-').map(Number);
  const due = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  const overdue = todo.dueDate ? isOverdue(todo.dueDate, todo.completed) : false;

  return (
    <li className={`todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`}>
      <button
        className={`check-btn ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
        <div className="todo-meta">
          <span className={`priority-badge priority-${todo.priority}`}>
            {PRIORITY_LABELS[todo.priority]}
          </span>
          {todo.dueDate && (
            <span className={`due-date ${overdue ? 'overdue' : ''}`}>
              {overdue ? '⚠ ' : ''}Due {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        ✕
      </button>
    </li>
  );
}
