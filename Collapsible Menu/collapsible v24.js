document.addEventListener('DOMContentLoaded', function () {
  const ulElement = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  // Define the hierarchy
  const hierarchy = [
    {
      main: 38,
      collapsible: [
        { main: 39, collapsible: [40, 41, 42] },
        { main: 43, collapsible: [44, 45, 46, 47] },
        { main: 48, collapsible: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66] },
        { items: [67, 68, 69, 70, 71, 72, 73, 74] }, // Non-collapsible sub-items
        { main: 75, collapsible: [76, 77] },
        { main: 79, collapsible: [80, 81] },
        { main: 82, collapsible: [83, 84] },
        { main: 85, collapsible: [86, 87, 88] },
        { main: 89, collapsible: [90, 91] },
        { main: 92, collapsible: [93, 94, 95, 96] },
        { main: 98, collapsible: [99] },
        { main: 100, collapsible: [101, 102] },
        { items: [103, 104, 105, 106, 107] } // Non-collapsible sub-items
      ]
    },
    { main: 108, collapsible: [{ items: [109, 110] }] }
  ];

  // Initialize chevrons for main items
  function addChevron(mainIndex) {
    const mainItem = ulElement.children[mainIndex - 1];
    const mainLink = mainItem.querySelector('a');

    const chevronWrapper = document.createElement('div');
    chevronWrapper.className = 'chevron-wrapper';
    Object.assign(chevronWrapper.style, {
      flexShrink: '0',
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5em',
      cursor: 'pointer',
      borderRadius: '9999px'
    });
    chevronWrapper.setAttribute('role', 'button');
    chevronWrapper.setAttribute('aria-expanded', 'false');
    chevronWrapper.setAttribute('data-expanded', 'false');
    chevronWrapper.setAttribute('data-index', mainIndex);

    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.innerHTML = '<iconify-icon icon="tabler:chevron-down" width="1.5em" height="1.5em" style="color: #a4a2ab;"></iconify-icon>';

    chevronWrapper.appendChild(chevron);
    mainLink.appendChild(chevronWrapper);
    mainLink.style.display = 'flex';
    mainLink.style.alignItems = 'center';

    // Hover effects
    chevronWrapper.addEventListener('mouseenter', () => {
      chevronWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });
    chevronWrapper.addEventListener('mouseleave', () => {
      chevronWrapper.style.backgroundColor = 'transparent';
    });
  }

  // Initialize all main items with chevrons
  function initializeChevrons() {
    const mainIndexes = [];
    hierarchy.forEach(parent => {
      mainIndexes.push(parent.main);
      parent.collapsible.forEach(child => {
        if (child.main) mainIndexes.push(child.main);
      });
    });
    mainIndexes.forEach(addChevron);
  }

  // Hide all items initially
  function initializeVisibility() {
    Array.from(ulElement.children).forEach((child, index) => {
      const itemIndex = index + 1;
      let isMain = false;
      hierarchy.forEach(parent => {
        if (parent.main === itemIndex) isMain = true;
        parent.collapsible.forEach(child => {
          if (child.main === itemIndex) isMain = true;
        });
      });
      child.style.display = isMain ? 'list-item' : 'none';
    });
  }

  // Get all collapsible indices under a main
  function getCollapsibleIndices(mainIndex) {
    let collapsible = [];
    const parent = hierarchy.find(p => p.main === mainIndex);
    if (parent) {
      parent.collapsible.forEach(child => {
        if (child.main) {
          collapsible.push(child.main);
          if (child.collapsible) collapsible.push(...child.collapsible);
        } else if (child.items) {
          collapsible.push(...child.items);
        }
      });
    }
    return collapsible;
  }

  // Get immediate children to show when a main is expanded
  function getImmediateChildren(mainIndex) {
    let immediate = [];
    const parent = hierarchy.find(p => p.main === mainIndex);
    if (parent) {
      parent.collapsible.forEach(child => {
        if (child.main) immediate.push(child.main);
        else if (child.items) immediate.push(...child.items);
      });
    }
    return immediate;
  }

  // Collapse all items under a main
  function collapseAllUnder(mainIndex) {
    const indices = getCollapsibleIndices(mainIndex);
    indices.forEach(index => {
      const item = ulElement.children[index - 1];
      item.style.display = 'none';
    });
    const wrapper = ulElement.querySelector(`.chevron-wrapper[data-index="${mainIndex}"]`);
    if (wrapper) {
      wrapper.setAttribute('data-expanded', 'false');
      wrapper.setAttribute('aria-expanded', 'false');
      const icon = wrapper.querySelector('iconify-icon');
      if (icon) icon.setAttribute('icon', 'tabler:chevron-down');
    }
    // Collapse nested mains
    hierarchy.find(p => p.main === mainIndex)?.collapsible.forEach(child => {
      if (child.main) {
        const nestedWrapper = ulElement.querySelector(`.chevron-wrapper[data-index="${child.main}"]`);
        if (nestedWrapper) {
          nestedWrapper.setAttribute('data-expanded', 'false');
          nestedWrapper.setAttribute('aria-expanded', 'false');
          const icon = nestedWrapper.querySelector('iconify-icon');
          if (icon) icon.setAttribute('icon', 'tabler:chevron-down');
        }
      }
    });
  }

  // Event delegation for click handling
  ulElement.addEventListener('click', function (event) {
    const chevronWrapper = event.target.closest('.chevron-wrapper');
    if (!chevronWrapper) return;

    event.preventDefault();
    const mainIndex = parseInt(chevronWrapper.getAttribute('data-index'));
    const isExpanded = chevronWrapper.getAttribute('data-expanded') === 'true';

    if (isExpanded) {
      // Collapse
      collapseAllUnder(mainIndex);
    } else {
      // Expand
      const immediateChildren = getImmediateChildren(mainIndex);
      immediateChildren.forEach(index => {
        const item = ulElement.children[index - 1];
        item.style.display = 'list-item';
      });
      chevronWrapper.setAttribute('data-expanded', 'true');
      chevronWrapper.setAttribute('aria-expanded', 'true');
      const icon = chevronWrapper.querySelector('iconify-icon');
      if (icon) icon.setAttribute('icon', 'tabler:chevron-up');
    }
  });

  // Initialize
  initializeChevrons();
  initializeVisibility();
});