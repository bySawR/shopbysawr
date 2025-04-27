document.addEventListener('DOMContentLoaded', function () {
  const ulElement = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  const categories = [
    { main: 9, collapsible: [10, 11, 12, 13] },
    { main: 14, collapsible: [15, 16, 17, 18, 19] },
    { main: 20, collapsible: [21, 22, 23, 24, 25, 26, 27, 28] },
    { main: 38, collapsible: [39, 43, 48, 75, 79, 82, 85, 89, 92, 98, 100, 108] }, 
    { main: 39, collapsible: [40, 41, 42] },
    { main: 43, collapsible: [44, 45, 46, 47] },
    { main: 48, collapsible: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66] },
    { main: 75, collapsible: [76, 77] },
    { main: 79, collapsible: [80, 81] },
    { main: 82, collapsible: [83, 84] },
    { main: 85, collapsible: [86, 87, 88] },
    { main: 89, collapsible: [90, 91] },
    { main: 92, collapsible: [93, 94, 95, 96] },
    { main: 98, collapsible: [99] },
    { main: 100, collapsible: [101, 102] },
    { main: 108, collapsible: [109, 110] }
  ];

  function collapseSiblings(mainItem) {
    const ul = mainItem.parentElement;
    ul.querySelectorAll('.chevron-wrapper[data-expanded="true"]').forEach(wrapper => {
      const parentLink = wrapper.parentElement;
      const item = parentLink.parentElement;
      if (item !== mainItem) {
        const expandedCategory = categories.find(category => ulElement.children[category.main - 1] === item);
        if (expandedCategory) {
          expandedCategory.collapsible.forEach(index => {
            const collapsibleItem = ulElement.children[index - 1];
            if (collapsibleItem) collapsibleItem.style.display = 'none';
          });
          wrapper.setAttribute('data-expanded', 'false');
          wrapper.setAttribute('aria-expanded', 'false');
          const icon = wrapper.querySelector('iconify-icon');
          if (icon) icon.setAttribute('icon', 'tabler:chevron-down');
        }
      }
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

    chevronWrapper.addEventListener('mouseenter', () => {
      chevronWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });
    chevronWrapper.addEventListener('mouseleave', () => {
      chevronWrapper.style.backgroundColor = 'transparent';
    });

    chevronWrapper.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation(); // Stop bubbling up

      const isExpanded = chevronWrapper.getAttribute('data-expanded') === 'true';

      collapseSiblings(mainCategoryItem);

      if (!isExpanded) {
        collapsibleIndexes.forEach(index => {
          const collapsibleItem = ulElement.children[index - 1];
          if (collapsibleItem) collapsibleItem.style.display = 'list-item';
        });

        chevronWrapper.setAttribute('data-expanded', 'true');
        chevronWrapper.setAttribute('aria-expanded', 'true');
        const icon = chevron.querySelector('iconify-icon');
        if (icon) icon.setAttribute('icon', 'tabler:chevron-up');
      }
    });

    // Initially hide collapsible items
    collapsibleIndexes.forEach(index => {
      const collapsibleItem = ulElement.children[index - 1];
      if (collapsibleItem) collapsibleItem.style.display = 'none';
    });
  }

  categories.forEach(category => {
    addChevronAndToggle(category.main, category.collapsible);
  });

  const collapsibleItemIndexes = categories.flatMap(category => category.collapsible);
  Array.from(ulElement.children).forEach((child, index) => {
    const itemIndex = index + 1;
    child.style.display = collapsibleItemIndexes.includes(itemIndex) ? 'none' : 'list-item';
  });
});
