<script>
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('.collection-vertical-wrapper');
    if (!wrapper) return;

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search collections...';
    searchInput.style.padding = '16px';
    searchInput.style.width = '100%';
    searchInput.style.borderLeft = '1px solid #e0e0e0';
    searchInput.style.borderBottom = '1px solid #e0e0e0';
    searchInput.style.borderRight = '1px solid #e0e0e0';

    const list = wrapper.querySelector('ul');
    if (list) {
      wrapper.insertBefore(searchInput, list);
    }

    // Categories data (index based on ul children, 1-based)
    const categories = [
      { main: 9, collapsible: [10, 11, 12, 13] },
      { main: 14, collapsible: [15, 16, 17, 18, 19] },
      { main: 20, collapsible: [21, 22, 23, 24, 25, 26, 27, 28] },
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
          const item = list.children[index - 1];
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
      const mainCategoryItem = list.children[mainCategoryIndex - 1];
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
      chevronWrapper.style.borderRadius = '9999px';
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

      // Hover effect
      chevronWrapper.addEventListener('mouseenter', () => {
        chevronWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      });
      chevronWrapper.addEventListener('mouseleave', () => {
        chevronWrapper.style.backgroundColor = 'transparent';
      });

      // Toggle collapsible items on click
      chevronWrapper.addEventListener('click', function (event) {
        event.preventDefault();

        const isExpanded = chevronWrapper.getAttribute('data-expanded') === 'true';

        collapseAll();

        if (!isExpanded) {
          collapsibleIndexes.forEach(index => {
            const collapsibleItem = list.children[index - 1];
            collapsibleItem.style.display = 'list-item';
          });

          chevronWrapper.setAttribute('data-expanded', 'true');
          chevronWrapper.setAttribute('aria-expanded', 'true');
          const icon = chevron.querySelector('iconify-icon');
          icon.setAttribute('icon', 'tabler:chevron-up');
        }
      });

      // Hide collapsible items initially
      collapsibleIndexes.forEach(index => {
        const collapsibleItem = list.children[index - 1];
        collapsibleItem.style.display = 'none';
      });
    }

    categories.forEach(category => {
      addChevronAndToggle(category.main, category.collapsible);
    });

    // Initially hide all collapsible items
    const collapsibleItemIndexes = categories.flatMap(category => category.collapsible);
    Array.from(list.children).forEach((child, index) => {
      const itemIndex = index + 1;
      child.style.display = collapsibleItemIndexes.includes(itemIndex) ? 'none' : 'list-item';
    });

    // Search filtering with parent visibility
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const items = list.querySelectorAll('li');

      // First hide all items
      items.forEach(item => item.style.display = 'none');

      if (searchTerm === '') {
        // Show all main categories, hide collapsible
        Array.from(list.children).forEach((child, index) => {
          const itemIndex = index + 1;
          child.style.display = collapsibleItemIndexes.includes(itemIndex) ? 'none' : 'list-item';
        });
        collapseAll();
        return;
      }

      // Find all matching items
      let matchedParents = new Set();

      items.forEach((item, idx) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          // Show this item
          item.style.display = 'list-item';

          const itemIndex = idx + 1;

          // If item is a collapsible (child), find parent and mark it
          categories.forEach(cat => {
            if (cat.collapsible.includes(itemIndex)) {
              matchedParents.add(cat.main);
            }
            // Also if the main category itself matches
            if (cat.main === itemIndex) {
              matchedParents.add(cat.main);
            }
          });
        }
      });

      // Show matched parents too
      matchedParents.forEach(parentIndex => {
        const parentItem = list.children[parentIndex - 1];
        if (parentItem) parentItem.style.display = 'list-item';

        // Show its matching children
        const cat = categories.find(c => c.main === parentIndex);
        if (cat) {
          cat.collapsible.forEach(childIndex => {
            const childItem = list.children[childIndex - 1];
            // Show child only if it matches search or parent matches
            if (childItem && childItem.style.display === 'list-item') return; // already visible
            const childText = childItem.textContent.toLowerCase();
            if (childText.includes(searchTerm)) {
              childItem.style.display = 'list-item';
            }
          });
        }
      });

      // Optionally, expand parent categories for which children are visible
      document.querySelectorAll('.chevron-wrapper').forEach(wrapper => {
        wrapper.setAttribute('data-expanded', 'false');
        wrapper.setAttribute('aria-expanded', 'false');
        const icon = wrapper.querySelector('iconify-icon');
        if (icon) icon.setAttribute('icon', 'tabler:chevron-down');
      });
      matchedParents.forEach(parentIndex => {
        const mainCategoryItem = list.children[parentIndex - 1];
        const chevronWrapper = mainCategoryItem.querySelector('.chevron-wrapper');
        if (!chevronWrapper) return;

        chevronWrapper.setAttribute('data-expanded', 'true');
        chevronWrapper.setAttribute('aria-expanded', 'true');
        const icon = chevronWrapper.querySelector('iconify-icon');
        if (icon) icon.setAttribute('icon', 'tabler:chevron-up');
      });

    });

  });
})();
</script>
