export type Filter = 'all' | 'active' | 'completed';

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
}

export function FilterBar({ filter, onChange, activeCount, completedCount }: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {(['all', 'active', 'completed'] as Filter[]).map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => onChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <span className="task-count">
        {activeCount} remaining · {completedCount} done
      </span>
    </div>
  );
}
