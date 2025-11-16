import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import ActiveFilters from "@/components/ActiveFilters";
import MealCard from "@/components/MealCard";
import Pagination from "@/components/Pagination";
import {useEffect, useReducer, useState} from "react";
import {getAreas, getCategories, searchMeals, filterByCategory} from "@/lib/api";
import {Area, Category, Meal, MealSummary} from "@/types/meal";
import {filterReducer, initialFilterState} from "@/reducers/filterReducer";

/**
 * Home Page Component
 *
 * This is a mock layout demonstrating how to integrate all the provided components.
 * Candidates should:
 * 1. Replace mock data with real API calls to TheMealDB - DONE
 * 2. Implement actual state management (useState/useReducer) - DONE
 * 3. Connect handlers to update state and trigger API calls
 * 4. Implement caching strategy for API responses
 * 5. Add error handling and loading states
 * 6. Complete the FilterPanel component implementation
 */
export default function Home() {

  // State management
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getAreas().then(setAreas);
  }, []);

  // Filter state
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);
  const {categories: selectedCategories, areas: selectedAreas} = state;

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    const fetchFilteredMeals = async () => {
      let categoryResults: any[] = [];

      if (selectedCategories.length > 0) {
        categoryResults = await filterByCategory(selectedCategories);
      }

      const all = [...categoryResults];

      setMeals(all);
    }

    fetchFilteredMeals();
  }, [selectedCategories, selectedAreas]);

    // Mock handlers
  const handleSearch = async (query: string): Promise<void> => {
    const result = await searchMeals(query);
    setMeals(result);
  };

  const handleRemoveCategory = (category: string) => {
    dispatch({ type: "REMOVE_CATEGORY", payload: category });
  };

  const handleRemoveArea = (area: string) => {
    dispatch({ type: "REMOVE_AREA", payload: area });
  };

  const handleCategoryToggle = (category: string) => {
    dispatch({ type: "TOGGLE_CATEGORY", payload: category });
  };

  const handleAreaToggle = (area: string) => {
    dispatch({ type: "TOGGLE_AREA", payload: area });
  };

  const handlePageChange = (page: number) => {
    console.log("Change to page:", page);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Recipe Finder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search and discover delicious meals from around the world
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            placeholder="Search for meals..."
            onSearch={handleSearch}
          />
        </div>

        {/* Layout: Filters on left, content on right */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterPanel
              categories={categories}
              areas={areas}
              selectedCategories={selectedCategories}
              selectedAreas={selectedAreas}
              onCategoryToggle={handleCategoryToggle}
              onAreaToggle={handleAreaToggle}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters */}
            <ActiveFilters
              selectedCategories={selectedCategories}
              selectedAreas={selectedAreas}
              onRemoveCategory={handleRemoveCategory}
              onRemoveArea={handleRemoveArea}
            />

            {/* Meal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  id={meal.idMeal}
                  name={meal.strMeal}
                  thumbnail={meal.strMealThumb}
                  category={meal.strCategory}
                  area={meal.strArea}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={1}
              totalPages={5}
              onPageChange={handlePageChange}
            />

            {/* <EmptyState
              title="No meals found"
              message="Try adjusting your search or filters"
            /> */}
          </main>
        </div>
      </div>
    </div>
  );
}
