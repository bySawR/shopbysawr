document.addEventListener('DOMContentLoaded', function () {
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

  // Function to collapse all categories and subcategories
  function collapseAll() {
    categories.forEach(category => {
      category.collapsible.forEach(index => {
        const item = ulElement.children[index - 1]; // Adjust for nth-child
        item.style.display = 'none'; // Hide all collapsible items
      });
    });
  }

  // Function to add chevron and toggle functionality
  function addChevronAndToggle(mainCategoryIndex, collapsibleIndexes) {
    const mainCategoryItem = ulElement.children[mainCategoryIndex - 1]; // Adjust index since nth-child is 1-based

    // Add chevron inside a div wrapper to ensure full spacing
    const mainCategoryLink = mainCategoryItem.querySelector('a');
    const chevronWrapper = document.createElement('div');
    chevronWrapper.style.flexShrink = '0'; // Prevent shrinking
    chevronWrapper.style.marginLeft = 'auto'; // Align chevron to the far right
    chevronWrapper.style.display = 'flex';
    chevronWrapper.style.alignItems = 'center';
    chevronWrapper.style.justifyContent = 'center';

    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.innerHTML = '<iconify-icon icon="tabler:chevron-down" width="1.5em" height="1.5em" style="color: #a4a2ab;"></iconify-icon>'; // Set color here

    chevronWrapper.appendChild(chevron);

    // Append chevron wrapper to the main category link
    mainCategoryLink.appendChild(chevronWrapper);

    // Adjust flex properties for consistent spacing
    mainCategoryLink.style.display = 'flex';
    mainCategoryLink.style.alignItems = 'center';

    // Add click event to the chevron to toggle visibility of collapsible items
    chevron.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the default link behavior

      const isExpanded = chevronWrapper.getAttribute('data-expanded') === 'true';

      // Collapse all categories and subcategories before expanding the clicked one
      collapseAll();

      // Only expand the current category if it wasn't already expanded
      if (!isExpanded) {
        collapsibleIndexes.forEach(index => {
          const collapsibleItem = ulElement.children[index - 1]; // Adjust index since nth-child is 1-based
          collapsibleItem.style.display = 'list-item'; // Show the collapsible items
        });
      }

      // Update the expanded state for the current chevron
      chevronWrapper.setAttribute('data-expanded', !isExpanded);

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
      child.style.display = 'none'; // Hide collapsible items
    } else {
      child.style.display = 'list-item'; // Ensure all main categories are visible
    }
  });
});
