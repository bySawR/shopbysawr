document.addEventListener('DOMContentLoaded', function () {
  const ul = document.querySelector('.collection-vertical-wrapper.font-section-collection-collectionTabsLink > ul');

  const categories = [
    { main: 9,   collapsible: [10, 11, 12, 13] },
    { main: 14,  collapsible: [15, 16, 17, 18, 19] },
    { main: 20,  collapsible: [21, 22, 23, 24, 25, 26, 27, 28] },
    { main: 38,  collapsible: [39, 48, 75, 79, 82, 85, 89, 92, 98, 100] },
    { main: 39,  collapsible: [40, 41, 42, 43, 44, 45, 46, 47] },
    { main: 48,  collapsible: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66] },
    { main: 75,  collapsible: [76, 77] },
    { main: 79,  collapsible: [80, 81] },
    { main: 82,  collapsible: [83, 84] },
    { main: 85,  collapsible: [86, 87, 88] },
    { main: 89,  collapsible: [90, 91] },
    { main: 92,  collapsible: [93, 94, 95, 96] },
    { main: 98,  collapsible: [99] },
    { main: 100, collapsible: [101, 102] }
  ];

  function addChevron(mainIdx, childIdxs) {
    const li       = ul.children[mainIdx - 1];
    const link     = li.querySelector('a');
    const wrapper  = document.createElement('div');
    const iconWrap = document.createElement('span');

    // chevron container
    Object.assign(wrapper.style, {
      display:      'flex',
      alignItems:   'center',
      justifyContent:'center',
      marginLeft:   'auto',
      padding:      '0.5em',
      cursor:       'pointer',
      borderRadius: '9999px',
      flexShrink:   '0'
    });
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('data-expanded', 'false');
    wrapper.setAttribute('aria-expanded', 'false');

    // icon
    iconWrap.innerHTML = `<iconify-icon icon="tabler:chevron-down" width="1.5em" height="1.5em" style="color: #a4a2ab;"></iconify-icon>`;
    wrapper.append(iconWrap);
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.append(wrapper);

    // hover
    wrapper.addEventListener('mouseenter', () => wrapper.style.backgroundColor = 'rgba(0,0,0,0.05)');
    wrapper.addEventListener('mouseleave', () => wrapper.style.backgroundColor = 'transparent');

    // toggle
    wrapper.addEventListener('click', e => {
      e.preventDefault();
      const expanded = wrapper.getAttribute('data-expanded') === 'true';

      // Toggle visibility of child items
      childIdxs.forEach(i => {
        const childLi = ul.children[i - 1];
        childLi.style.display = expanded ? 'none' : 'list-item';
      });

      // Update chevron icon and expansion state
      wrapper.setAttribute('data-expanded', String(!expanded));
      wrapper.setAttribute('aria-expanded', String(!expanded));
      const ic = iconWrap.querySelector('iconify-icon');
      ic.setAttribute('icon', expanded ? 'tabler:chevron-down' : 'tabler:chevron-up');
    });

    // hide children at start
    childIdxs.forEach(i => ul.children[i - 1].style.display = 'none');
  }

  // wire up every category
  categories.forEach(cat => addChevron(cat.main, cat.collapsible));

  // also make sure *any* item not in one of those collapsible sets stays visible
  const allColl = new Set(categories.flatMap(c => c.collapsible));
  Array.from(ul.children).forEach((li, i) => {
    const idx = i + 1;
    if (!allColl.has(idx)) li.style.display = 'list-item';
  });

  // Ensure that sub-items of 38 are hidden by default
  const subItems38 = [39, 48, 75, 79, 82, 85, 89, 92, 98, 100];
  subItems38.forEach(i => ul.children[i - 1].style.display = 'none');
});
