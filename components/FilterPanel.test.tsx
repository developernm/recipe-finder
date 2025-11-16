import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterPanel from "@/components/FilterPanel";

describe("FilterPanel", () => {
  const mockCategories = [
    { strCategory: "Dessert" } as any,
    { strCategory: "Beef" } as any,
  ];

  const mockAreas = [
    { strArea: "American" } as any,
    { strArea: "Italian" } as any,
  ];

  const setup = (overrideProps: Partial<React.ComponentProps<typeof FilterPanel>> = {}) => {
    const onCategoryToggle = jest.fn();
    const onAreaToggle = jest.fn();
    const onClearClick = jest.fn();

    const utils = render(
      <FilterPanel
        categories={mockCategories}
        areas={mockAreas}
        selectedCategories={[]}
        selectedAreas={[]}
        onCategoryToggle={onCategoryToggle}
        onAreaToggle={onAreaToggle}
        onClearClick={onClearClick}
        {...overrideProps}
      />
    );

    return {
      ...utils,
      onCategoryToggle,
      onAreaToggle,
      onClearClick,
    };
  };


  it("should render without crashing", () => {
    // mock all event handlers
    const mockCategoryToggle = jest.fn();
    const mockAreaToggle = jest.fn();
    const mockClearClick = jest.fn();

    const { container } = render(
      <FilterPanel
        categories={[]}
        areas={[]}
        selectedCategories={[]}
        selectedAreas={[]}
        onCategoryToggle={mockCategoryToggle}
        onAreaToggle={mockAreaToggle}
        onClearClick={mockClearClick}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("renders category and area options", (): void => {
    setup();

    // check category labels exist in html
    expect(screen.getByText("Dessert")).toBeInTheDocument();
    expect(screen.getByText("Beef")).toBeInTheDocument();


    // check that area labels exxist in html
    expect(screen.getByText("American")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
  });

  it("check category and area checkboxes based on selected props", () => {
    // set categories and areas
    setup({
      selectedCategories: ["Dessert"],
      selectedAreas: ["American"],
    });

    // grabs the checkboxes for category selected and not selected
    const dessertCheckbox = screen.getByLabelText("Dessert") as HTMLInputElement;
    const beefCheckbox = screen.getByLabelText("Beef") as HTMLInputElement;


    // grabs the checkboxes for area selected and not selected
    const americanCheckbox = screen.getByLabelText("American") as HTMLInputElement;
    const italianCheckbox = screen.getByLabelText("Italian") as HTMLInputElement;

    // ensure one is set to true and other is set to false
    expect(dessertCheckbox.checked).toBe(true);
    expect(beefCheckbox.checked).toBe(false);

    // ensure one is set to true and other is set to false
    expect(americanCheckbox.checked).toBe(true);
    expect(italianCheckbox.checked).toBe(false);
  });

  it("calls onCategoryToggle when a category checkbox is clicked", () => {
    // get the category toggle function from the setup
    const { onCategoryToggle } = setup();

    // grab the desert checkbox and click it to fire event
    const dessertCheckbox = screen.getByLabelText("Dessert");
    fireEvent.click(dessertCheckbox);

    // check if onCategoryToggle had been called with teh desert
    expect(onCategoryToggle).toHaveBeenCalledTimes(1);
    expect(onCategoryToggle).toHaveBeenCalledWith("Dessert");
  });

  it("calls onAreaToggle when an area checkbox is clicked", (): void => {
    const { onAreaToggle } = setup();


    const americanCheckbox = screen.getByLabelText("American");
    fireEvent.click(americanCheckbox);

    expect(onAreaToggle).toHaveBeenCalledTimes(1);
    expect(onAreaToggle).toHaveBeenCalledWith("American");
  });
});
