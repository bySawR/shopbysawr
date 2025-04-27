document.addEventListener('DOMContentLoaded', function () { 
  const ulElement = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  const categories = [
    { main: 9, collapsible: [10, 11, 12, 13] },
    { main: 14, collapsible: [15, 16, 17, 18, 19] },
    { main: 20, collapsible: [21, 22, 23, 24, 25, 26, 27, 28] },
    { main: 38, collapsible: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107] },
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

  function collapseAll() {
    categories.forEach(category => {
      category.collapsible.forEach(index => {
        const item = ulElement.children[index - 1];
        item.style.display = 'none';
      });
    });

    // Reset all chevrons
    document.querySelectorAll('.chevron-wrapper').forEach(wrapper => {
      wrapper.setAttribute('data-expanded', 'false');
      wrapper.setAttribute('aria-expanded', 'false');
      const icon = wrapper.querySelector('iconify-icon');
      if (icon) icon.setAttribute('icon', 'tabler:chevron-down');
    });
  }

  function addChevronAndToggle(mainCategoryIndex, collapsibleIndexes) {
    const mainCategoryItem = ulElement.children[mainCategoryIndex - 1];
    const mainCategoryLink = mainCategoryItem.querySelector('a');

    // Create chevron wrapper
    const chevronWrapper = document.createElement('div');
    chevronWrapper.className = 'chevron-wrapper';
    chevronWrapper.style.flexShrink = '0';
    chevronWrapper.style.marginLeft = 'auto';
    chevronWrapper.style.display = 'flex';
    chevronWrapper.style.alignItems = 'center';
    chevronWrapper.style.justifyContent = 'center';
    chevronWrapper.style.padding = '0.5em';
    chevronWrapper.style.cursor = 'pointer';
    chevronWrapper.style.borderRadius = '9999px'; // SUPER round
    chevronWrapper.setAttribute('role', 'button');
    chevronWrapper.setAttribute('aria-expanded', 'false');
    chevronWrapper.setAttribute('data-expanded', 'false');

    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.innerHTML = '<iconify-icon icon="tabler:chevron-down" width="1.5em" height="1.5em" style="color: #a4a2ab;"></iconify-icon>';

    chevronWrapper.appendChild(chevron);
    mainCategoryLink.appendChild(chevronWrapper);

    mainCategoryLink.style.display = 'flex';
    mainCategoryLink.style.alignItems = 'center';

    // Hover effect: subtle dark shade
    chevronWrapper.addEventListener('mouseenter', () => {
      chevronWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });
    chevronWrapper.addEventListener('mouseleave', () => {
      chevronWrapper.style.backgroundColor = 'transparent';
    });

    // Toggle functionality
    chevronWrapper.addEventListener('click', function (event) {
      event.preventDefault();

      const isExpanded = chevronWrapper.getAttribute('data-expanded') === 'true';

      // Only toggle for the clicked category
      if (!isExpanded) {
        // Show collapsible items only for this category
        collapsibleIndexes.forEach(index => {
          const collapsibleItem = ulElement.children[index - 1];
          collapsibleItem.style.display = 'list-item';
        });

        chevronWrapper.setAttribute('data-expanded', 'true');
        chevronWrapper.setAttribute('aria-expanded', 'true');
        const icon = chevron.querySelector('iconify-icon');
        icon.setAttribute('icon', 'tabler:chevron-up');
      } else {
        // Collapse this category only
        collapsibleIndexes.forEach(index => {
          const collapsibleItem = ulElement.children[index - 1];
          collapsibleItem.style.display = 'none';
        });

        chevronWrapper.setAttribute('data-expanded', 'false');
        chevronWrapper.setAttribute('aria-expanded', 'false');
        const icon = chevron.querySelector('iconify-icon');
        icon.setAttribute('icon', 'tabler:chevron-down');
      }
    });

    // Initially hide collapsible items
    collapsibleIndexes.forEach(index => {
      const collapsibleItem = ulElement.children[index - 1];
      collapsibleItem.style.display = 'none'; // Ensure everything is collapsed initially
    });
  }

  categories.forEach(category => {
    addChevronAndToggle(category.main, category.collapsible);
  });

  const collapsibleItemIndexes = categories.flatMap(category => category.collapsible);
  Array.from(ulElement.children).forEach((child, index) => {
    const itemIndex = index + 1;
    // Here, we ensure that only items that are not part of any collapsible category remain visible.
    child.style.display = collapsibleItemIndexes.includes(itemIndex) ? 'none' : 'list-item';
  });

  // Add initial collapse for category 38
  const category38 = categories.find(category => category.main === 38);
  if (category38) {
    category38.collapsible.forEach(index => {
      const collapsibleItem = ulElement.children[index - 1];
      collapsibleItem.style.display = 'none'; // Make sure the items are collapsed on load.
    });
  }
});
