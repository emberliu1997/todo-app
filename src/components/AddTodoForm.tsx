import { useState } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority, dueDate: string | null) => void;
}

export function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority, dueDate || null);
    setText('');
    setPriority('medium');
    setDueDate('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="text-input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <div className="form-row">
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <input
          className="date-input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          title="Due date"
        />
        <button className="add-btn" type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
}
