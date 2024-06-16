document.addEventListener('DOMContentLoaded', function() {
  const ulElement = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  // Define main categories and their associated collapsible items
  const categories = [
    { main: 39, collapsible: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57] },
    { main: 66, collapsible: [67, 68] },
    { main: 70, collapsible: [71, 72] },
    { main: 73, collapsible: [74, 75] },
    { main: 76, collapsible: [77, 78, 79] },
    { main: 80, collapsible: [81, 82] },
    { main: 83, collapsible: [84, 85, 86, 87] },
    { main: 89, collapsible: [90] },
    { main: 91, collapsible: [92, 93] }
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
    mainCategoryLink.style.justifyContent = 'space-between'; // Adjust flex properties

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

  // Special handling for items 40
  // No chevron added for item 40 explicitly

  // Initially hide item 40
  ulElement.children[39].style.display = 'none';
});