document.addEventListener('DOMContentLoaded', function () {
  const ulElement = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  const mainCategories = [
    { main: 9, collapsible: [10, 11, 12, 13] },
    { main: 14, collapsible: [15, 16, 17, 18, 19] },
    { main: 20, collapsible: [21, 22, 23, 24, 25, 26, 27, 28] },
    { main: 38, collapsible: [39, 43, 48, 75, 79, 82, 85, 89, 92, 98, 100, 108] }, 
    { main: 108, collapsible: [109, 110] }
  ];

  const subCategories = [
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
    { main: 100, collapsible: [101, 102] }
  ];

  function collapseItems(collapsibleIndexes) {
    collapsibleIndexes.forEach(index => {
      const item = ulElement.children[index - 1];
      if (item) item.style.display = 'none';
    });
  }

  function expandItems(collapsibleIndexes) {
    collapsibleIndexes.forEach(index => {
      const item = ulElement.children[index - 1];
      if (item) item.style.display = 'list-item';
    });
  }

  function addChevron(mainIndex, collapsibleIndexes, isSubCategory = false) {
    const mainItem = ulElement.children[mainIndex - 1];
    const mainLink = mainItem.querySelector('a');

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
    mainLink.appendChild(chevronWrapper);

    mainLink.style.display = 'flex';
    mainLink.style.alignItems = 'center';

    chevronWrapper.addEventListener('mouseenter', () => {
      chevronWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });
    chevronWrapper.addEventListener('mouseleave', () => {
      chevronWrapper.style.backgroundColor = 'transparent';
    });

    chevronWrapper.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const isExpanded = chevronWrapper.getAttribute('data-expanded') === 'true';

      if (isExpanded) {
        collapseItems(collapsibleIndexes);
        chevronWrapper.setAttribute('data-expanded', 'false');
        chevronWrapper.setAttribute('aria-expanded', 'false');
        chevron.querySelector('iconify-icon').setAttribute('icon', 'tabler:chevron-down');
      } else {
        expandItems(collapsibleIndexes);
        chevronWrapper.setAttribute('data-expanded', 'true');
        chevronWrapper.setAttribute('aria-expanded', 'true');
        chevron.querySelector('iconify-icon').setAttribute('icon', 'tabler:chevron-up');

        if (!isSubCategory) {
          // If opening 38's children, add chevrons for subCategories
          subCategories.forEach(sub => {
            const subItem = ulElement.children[sub.main - 1];
            if (subItem && !subItem.querySelector('.chevron-wrapper')) {
              addChevron(sub.main, sub.collapsible, true);
            }
          });
        }
      }
    });

    collapseItems(collapsibleIndexes);
  }

  mainCategories.forEach(category => {
    addChevron(category.main, category.collapsible);
  });

  const allCollapsibles = [
    ...mainCategories.flatMap(c => c.collapsible),
    ...subCategories.flatMap(c => c.collapsible)
  ];

  Array.from(ulElement.children).forEach((child, index) => {
    const itemIndex = index + 1;
    if (allCollapsibles.includes(itemIndex)) {
      child.style.display = 'none';
    }
  });
});
