document.addEventListener('DOMContentLoaded', function() {
  const ulElement = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  // Define main categories and their associated collapsible items
  const categories = [
    { main: 38, collapsible: Array.from({ length: 107 - 39 + 1 }, (_, i) => 39 + i) }, // Main: 38, Collapsible: 39-107
    { main: 39, collapsible: [40, 41, 42, 43, 44, 45, 46, 47] },
    { main: 48, collapsible: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66] },
    { main: 75, collapsible: [76, 77] },
    { main: 79, collapsible: [80, 81] },
    { main: 82, collapsible: [83, 84] },
    { main: 85, collapsible: [86, 87, 88] },
    { main: 89, collapsible: [90, 91] },
    { main: 92, collapsible: [93, 94, 95, 96] },
    { main: 98, collapsible: [99] },
    { main: 100, collapsible: [101, 102] }
  ];

  // Function to add chevron and toggle functionality
  function addChevronAndToggle(mainCategoryIndex, collapsibleIndexes) {
    const mainCategoryItem = ulElement.children[mainCategoryIndex - 1]; // Adjust index since nth-child is 1-based

    // Add chevron to main category item
    const mainCategoryLink = mainCategoryItem.querySelector('a');
    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.innerHTML = '<iconify-icon icon="tabler:chevron-down" width="1.5em" height="1.5em" style="color: #a4a2ab;"></iconify-icon>'; // Set color here

    // Append chevron to the link, placing it on the right
    mainCategoryLink.appendChild(chevron);

    // Adjust flex properties for consistent spacing
    mainCategoryLink.style.display = 'flex';
    mainCategoryLink.style.alignItems = 'center';
    mainCategoryLink.style.justifyContent = 'space-between';

    // Ensure spacing for pseudo-element on 38
    if (mainCategoryIndex === 38) {
      mainCategoryLink.style.paddingRight = '1.5em'; // Adjust to account for pseudo-element
    }

    // Add click event to the chevron to toggle visibility of collapsible items
    chevron.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior
      collapsibleIndexes.forEach(index => {
        const collapsibleItem = ulElement.children[index - 1]; // Adjust index since nth-child is 1-based
        collapsibleItem.style.display = collapsibleItem.style.display === 'none' ? 'list-item' : 'none';
      });

      // Toggle chevron direction
      const icon = chevron.querySelector('iconify-icon');
      icon.style.color = icon.style.color === 'rgb(164, 162, 171)' ? '#a4a2ab' : 'rgb(164, 162, 171)'; // Toggle color
    });

    // Initially hide collapsible items
    collapsibleIndexes.forEach(index => {
      const collapsibleItem = ulElement.children[index - 1]; // Adjust index since nth-child is 1-based
      collapsibleItem.style.display = 'none';
    });
  }

  // Process each main category
  categories.forEach(category => {
    addChevronAndToggle(category.main, category.collapsible);
  });

  // Ensure collapsible items are hidden, but keep other main items visible
  const collapsibleItemIndexes = categories.flatMap(category => category.collapsible);
  Array.from(ulElement.children).forEach((child, index) => {
    const itemIndex = index + 1; // Adjust index for 1-based nth-child
    if (collapsibleItemIndexes.includes(itemIndex)) {
      child.style.display = 'none';
    } else {
      child.style.display = 'list-item'; // Ensure all main categories are visible
    }
  });
});
