const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    return (
      <div className="space-y-5 flex-shrink-0">
        <h3>Filters</h3>
  
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Category</h4>
          <hr />
  
          {filters.categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filtersState.category === category}
                onChange={(e) =>
                  setFiltersState({
                    ...filtersState,
                    category: e.target.value,
                  })
                }
              />
              <span className="ml-1">{category}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  export default ShopFiltering