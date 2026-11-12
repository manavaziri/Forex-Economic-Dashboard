
function Sidebar({ items, activeItem, onSelect }) {
  return (
    <aside className="sidebar">
      <nav>
        {items.map((item) => (
          <button
            key={item.id}
            className={
              activeItem === item.id ? "sidebar-item active" : "sidebar-item"
            }
            onClick={() => onSelect(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
