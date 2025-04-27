document.addEventListener('DOMContentLoaded', function () {
  const ulElement = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  if (!ulElement) {
    console.error('Expected UL element not found. Check your selector.');
    return;
  }

  // Top-level categories
  const mainCategories = [
    { main: 9, collapsible: [10, 11, 12, 13] },
    { main: 14, collapsible: [15, 16, 17, 18, 19] },
    { main: 20, collapsible: [21, 22, 23, 24, 25, 26, 27, 28] },
    { main: 38, collapsible: [39, 43, 48, 75, 79, 82, 85, 89, 92, 98, 100, 108] },
    { main: 108, collapsible: [109, 110] }
  ];

  // Nested sub-categories under 38
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

  // Orphan items under 67-74 and 103-107 should always remain hidden until their parent opens
  const alwaysHidden = [...Array(8).keys()].map(i => 67 + i).concat([...Array(5).keys()].map(i => 103 + i));

  /**
   * Hides a list of items by index.
   */
  function collapseItems(indexes) {
    indexes.forEach(i => {
      const el = ulElement.children[i - 1];
      if (el) el.style.display = 'none';
    });
  }

  /**
   * Shows a list of items by index.
   */
  function expandItems(indexes) {
    indexes.forEach(i => {
      const el = ulElement.children[i - 1];
      if (el) el.style.display = 'list-item';
    });
  }

  /**
   * Attaches a chevron toggle to a main item.
   * @param {number} mainIndex - 1-based index in UL
   * @param {number[]} collapsibleIndexes - indexes to toggle
   * @param {boolean} isSub - whether this is a nested sub-category
   */
  function addChevron(mainIndex, collapsibleIndexes, isSub = false) {
    const mainItem = ulElement.children[mainIndex - 1];
    if (!mainItem) return;
    const link = mainItem.querySelector('a');
    if (!link) return;

    // Prevent duplicate chevrons
    if (link.querySelector('.chevron-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'chevron-wrapper';
    Object.assign(wrapper.style, {
      flexShrink: '0',
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5em',
      cursor: 'pointer',
      borderRadius: '9999px'
    });
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('aria-expanded', 'false');

    const icon = document.createElement('iconify-icon');
    icon.setAttribute('icon', 'tabler:chevron-down');
    icon.style.width = '1.5em';
    icon.style.height = '1.5em';
    icon.style.color = '#a4a2ab';

    wrapper.appendChild(icon);
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.appendChild(wrapper);

    wrapper.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const expanded = wrapper.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        collapseItems(collapsibleIndexes);
        wrapper.setAttribute('aria-expanded', 'false');
        icon.setAttribute('icon', 'tabler:chevron-down');
      } else {
        expandItems(collapsibleIndexes);
        wrapper.setAttribute('aria-expanded', 'true');
        icon.setAttribute('icon', 'tabler:chevron-up');

        // On first-level open, attach sub-category chevrons
        if (!isSub) {
          subCategories.forEach(sub => addChevron(sub.main, sub.collapsible, true));
        }
      }
    });

    // Hide targets initially
    collapseItems(collapsibleIndexes);
  }

  // Initialize all chevrons
  mainCategories.forEach(cat => addChevron(cat.main, cat.collapsible));

  // Hide all collapsibles and orphans initially
  const allHide = mainCategories.flatMap(c => c.collapsible)
    .concat(subCategories.flatMap(c => c.collapsible))
    .concat(alwaysHidden);
  allHide.forEach(i => {
    const el = ulElement.children[i - 1];
    if (el) el.style.display = 'none';
  });
});
