export default function Filters({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="filters">
      <input
        type="search"
        placeholder="Search gear..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />
      <button
        className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
