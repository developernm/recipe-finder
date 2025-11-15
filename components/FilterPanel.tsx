import type { Category, Area } from "@/types/meal";

/**
 * Props for the FilterPanel component
 */
interface FilterPanelProps {
  /** Array of available category options */
  categories: Category[];
  /** Array of available area/cuisine options */
  areas: Area[];
  /** Array of currently selected categories */
  selectedCategories: string[];
  /** Array of currently selected areas */
  selectedAreas: string[];
  /** Callback when a category is toggled */
  onCategoryToggle: (category: string) => void;
  /** Callback when an area is toggled */
  onAreaToggle: (area: string) => void;
}

/**
 * FilterPanel Component (Placeholder)
 *
 * Placeholder component for filter functionality.
 * To be implemented with category and area/cuisine filters.
 *
 * The component receives all necessary props for implementation:
 * - categories/areas: Available filter options
 * - selectedCategories/selectedAreas: Currently active filters
 * - onCategoryToggle/onAreaToggle: Callbacks to update filter state
 *
 * This should be implemented with checkboxes or similar UI controls.
 **/
export default function FilterPanel({
  categories,
  areas,
  selectedCategories,
  selectedAreas,
  onCategoryToggle,
  onAreaToggle,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-xs text-gray-400 mb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Category</h3>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <label key={category.strCategory} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.strCategory)}
                  onChange={() => onCategoryToggle(category.strCategory)}
                  className="mr-2"
                />
                {category.strCategory}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Cuisine / Area</h3>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {areas.map((area) => (
              <label key={area.strArea} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAreas.includes(area.strArea)}
                  onChange={() => onAreaToggle(area.strArea)}
                  className="mr-2"
                />
                {area.strArea}
              </label>
            ))}
          </div>
        </div>

        {(selectedCategories.length > 0 || selectedAreas.length > 0) && (
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors duration-200">Clear all</button>
          </div>
        )}
      </div>
    </div>
  );
}
