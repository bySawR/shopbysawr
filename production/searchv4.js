const collections = [
    { id: "call-of-duty", title: "Call Of Duty", productCount: 1138, url: "https://shop.bysawr.com/collection/call-of-duty" },
    { id: "premade", title: "Premade", productCount: 441, url: "https://shop.bysawr.com/collection/premade" },
    { id: "thumbnails", title: "Thumbnails", productCount: 219, url: "https://shop.bysawr.com/collection/thumbnails" },
    { id: "cutouts", title: "Cutouts", productCount: 183, url: "https://shop.bysawr.com/collection/cutouts" },
    { id: "assets", title: "Assets", productCount: 118, url: "https://shop.bysawr.com/collection/assets" },
    { id: "browse", title: "Browse", productCount: 0, url: "https://shop.bysawr.com/collection/all" },
    { id: "most-popular", title: "Most popular", productCount: 20, url: "https://shop.bysawr.com/collection/most-popular" },
    { id: "templates", title: "Templates", productCount: 7, url: "https://shop.bysawr.com/collection/templates" },
    { id: "3d-renders", title: "3D Renders", productCount: 5, url: "https://shop.bysawr.com/collection/3d-renders" },
    { id: "mascot-logos", title: "Mascot Logos", productCount: 38, url: "https://shop.bysawr.com/collection/mascot-logos" },
    { id: "assets", title: "Assets", productCount: 118, url: "https://shop.bysawr.com/collection/assets" },
    { id: "free", title: "Free", productCount: 30, url: "https://shop.bysawr.com/collection/free" },
    { id: "renders-pngs", title: "Renders/PNGs", productCount: 43, url: "https://shop.bysawr.com/collection/renders-pngs" },
    { id: "graphics", title: "Graphics", productCount: 23, url: "https://shop.bysawr.com/collection/graphics" },
    { id: "layer-styles", title: "Layer Styles", productCount: 2, url: "https://shop.bysawr.com/collection/layer-styles" },
    { id: "hand-packs", title: "Hand Packs", productCount: 18, url: "https://shop.bysawr.com/collection/hand-packs" },
    { id: "emotes", title: "Emotes", productCount: 8, url: "https://shop.bysawr.com/collection/emotes" },
    { id: "editing", title: "Editing", productCount: 59, url: "https://shop.bysawr.com/collection/editing" },
    { id: "subtitle-packs", title: "Subtitle Packs", productCount: 7, url: "https://shop.bysawr.com/collection/subtitle-packs" },
    { id: "green-screen", title: "Green Screen", productCount: 9, url: "https://shop.bysawr.com/collection/green-screen" },
    { id: "animations", title: "Animations", productCount: 45, url: "https://shop.bysawr.com/collection/animations" },
    { id: "youtube", title: "YouTube", productCount: 21, url: "https://shop.bysawr.com/collection/youtube" },
    { id: "kick", title: "Kick", productCount: 9, url: "https://shop.bysawr.com/collection/kick" },
    { id: "threads", title: "Threads", productCount: 1, url: "https://shop.bysawr.com/collection/threads" },
    { id: "x-twitter", title: "X/Twitter", productCount: 7, url: "https://shop.bysawr.com/collection/x-twitter" },
    { id: "tiktok", title: "TikTok", productCount: 4, url: "https://shop.bysawr.com/collection/tiktok" },
    { id: "instagram", title: "Instagram", productCount: 1, url: "https://shop.bysawr.com/collection/instagram" },
    { id: "twitch", title: "Twitch", productCount: 6, url: "https://shop.bysawr.com/collection/twitch" },
    { id: "transitions", title: "Transitions", productCount: 20, url: "https://shop.bysawr.com/collection/transitions" },
    { id: "bundles", title: "Bundles", productCount: 3, url: "https://shop.bysawr.com/collection/bundles" },
    { id: "minecraft", title: "Minecraft", productCount: 1, url: "https://shop.bysawr.com/collection/minecraft" },
    { id: "counter-strike", title: "Counter Strike", productCount: 36, url: "https://shop.bysawr.com/collection/counter-strike" },
    { id: "grand-theft-auto", title: "Grand Theft Auto", productCount: 5, url: "https://shop.bysawr.com/collection/grand-theft-auto" },
    { id: "valorant", title: "Valorant", productCount: 16, url: "https://shop.bysawr.com/collection/valorant" },
    { id: "among-us", title: "Among Us", productCount: 6, url: "https://shop.bysawr.com/collection/among-us" },
    { id: "apex-legends", title: "Apex Legends", productCount: 9, url: "https://shop.bysawr.com/collection/apex-legends" },
    { id: "fortnite", title: "Fortnite", productCount: 10, url: "https://shop.bysawr.com/collection/fortnite" },
    { id: "rocket-league", title: "Rocket League", productCount: 2, url: "https://shop.bysawr.com/collection/rocket-league" },
    { id: "xdefiant", title: "XDefiant", productCount: 11, url: "https://shop.bysawr.com/collection/xdefiant" },
    { id: "bo6", title: "Black Ops 6 / BO6", productCount: 227, url: "https://shop.bysawr.com/collection/black-ops-6" },
    { id: "mwiii", title: "Modern Warfare III / MWIII", productCount: 305, url: "https://shop.bysawr.com/collection/mwiii" },
    { id: "mwii", title: "Modern Warfare II / MWII", productCount: 105, url: "https://shop.bysawr.com/collection/mwii" },
    { id: "vanguard", title: "Vanguard", productCount: 6, url: "https://shop.bysawr.com/collection/vanguard" },
    { id: "coldwar", title: "Cold War", productCount: 6, url: "https://shop.bysawr.com/collection/cold-war" },
    { id: "mw2019", title: "Modern Warfare / MW2019", productCount: 9, url: "https://shop.bysawr.com/collection/mw2019" },
    { id: "bo4", title: "Black Ops 4 / BO4", productCount: 4, url: "https://shop.bysawr.com/collection/bo4" },
    { id: "ww2", title: "World War 2 / WW2", productCount: 4, url: "https://shop.bysawr.com/collection/ww2" },
    { id: "iw", title: "Infinite Warfare", productCount: 3, url: "https://shop.bysawr.com/collection/iw" },
    { id: "mwr", title: "Modern Warfare Remastered / MWR", productCount: 9, url: "https://shop.bysawr.com/collection/mwr" },
    { id: "bo3", title: "Black Ops 3 / BO3", productCount: 13, url: "https://shop.bysawr.com/collection/bo3" },
    { id: "cod4", title: "Call of Duty 4: Modern Warfare", productCount: 18, url: "https://shop.bysawr.com/collection/cod4" },
    { id: "waw", title: "World at War / WAW", productCount: 4, url: "https://shop.bysawr.com/collection/waw" },
    { id: "mw2", title: "Modern Warfare 2 / MW2", productCount: 151, url: "https://shop.bysawr.com/collection/modern-warfare-2" },
    { id: "intervention", title: "Intervention", productCount: 104, url: "https://shop.bysawr.com/search?q=intervention" },
    { id: "barrett", title: "Barrett 50cal", productCount: 27, url: "https://shop.bysawr.com/search?q=barrett" },
    { id: "dsr50", title: "DSR50", productCount: 114, url: "https://shop.bysawr.com/search?q=dsr50" },
    { id: "bo1", title: "Black Ops / BO1", productCount: 23, url: "https://shop.bysawr.com/collection/black-ops-1" },
    { id: "mw3", title: "Modern Warfare 3 / MW3", productCount: 46, url: "https://shop.bysawr.com/collection/modern-warfare-3" },
    { id: "bo2", title: "Black Ops 2 / BO2", productCount: 181, url: "https://shop.bysawr.com/collection/black-ops-2" },
    { id: "ghosts", title: "Ghosts", productCount: 12, url: "https://shop.bysawr.com/collection/ghosts" },
    { id: "ballista", title: "Ballista", productCount: 20, url: "https://shop.bysawr.com/collection/ballista" },
    { id: "mobile", title: "Call Of Duty Mobile", productCount: 5, url: "https://shop.bysawr.com/collection/call-of-duty-mobile" },
    { id: "msr", title: "MSR", productCount: 26, url: "https://shop.bysawr.com/collection/msr" },
    { id: "l118a", title: "L118A", productCount: 14, url: "https://shop.bysawr.com/collection/l118a" },
    { id: "svg", title: "SVG", productCount: 5, url: "https://shop.bysawr.com/collection/svg" },
    { id: "locus", title: "Locus", productCount: 3, url: "https://shop.bysawr.com/collection/locus" },
    { id: "usr", title: "USR", productCount: 4, url: "https://shop.bysawr.com/collection/usr" },
    { id: "lynx", title: "Lynx", productCount: 2, url: "https://shop.bysawr.com/collection/lynx" },
    { id: "gold", title: "Gold Camo", productCount: 104, url: "https://shop.bysawr.com/search?q=gold" },
    { id: "red-tiger", title: "Red Tiger Camo", productCount: 13, url: "https://shop.bysawr.com/search?q=red tiger" },
    { id: "blue-tiger", title: "Blue Tiger Camo", productCount: 14, url: "https://shop.bysawr.com/search?q=blue tiger" },
    { id: "interstellar", title: "Interstellar Camo", productCount: 59, url: "https://shop.bysawr.com/search?q=interstellar" },
    { id: "diamond", title: "Diamond Camo", productCount: 26, url: "https://shop.bysawr.com/search?q=diamond" },
    { id: "weaponized-115", title: "Weaponized 115 Camo", productCount: 9, url: "https://shop.bysawr.com/search?q=weaponized 115" },
    { id: "katt-amr", title: "KATT-AMR", productCount: 60, url: "https://shop.bysawr.com/search?q=KATT-AMR" },
    { id: "lr-762", title: "LR 7.62", productCount: 9, url: "https://shop.bysawr.com/search?q=lr%207.62" },
    { id: "lw3a1-frostline", title: "LW3A1 Frostline", productCount: 9, url: "https://shop.bysawr.com/search?q=LW3A1+Frostline" },
    { id: "cyborg", title: "Cyborg Camo", productCount: 3, url: "https://shop.bysawr.com/search?q=cyborg" },
    { id: "borealis", title: "Borealis Camo", productCount: 9, url: "https://shop.bysawr.com/search?q=borealis" },
    { id: "darkmatter", title: "Dark Matter Camo", productCount: 58, url: "https://shop.bysawr.com/search?q=dark matter" },
    { id: "aw", title: "Advanced Warfare / AW", productCount: 5, url: "https://shop.bysawr.com/collection/aw" },
        { id: "interstellar", title: "Interstellar Camo", productCount: 59, url: "https://shop.bysawr.com/search?q=interstellar" },
    { id: "dark-spine", title: "Dark Spine Camo", productCount: 5, url: "https://shop.bysawr.com/search?q=dark%20spine" },
    { id: "obsidian", title: "Obsidian Camo", productCount: 2, url: "https://shop.bysawr.com/search?q=obsidian" },
    { id: "ghoulie", title: "Ghoulie Camo", productCount: 5, url: "https://shop.bysawr.com/search?q=ghoulie" },
    { id: "ax-50", title: "AX-50", productCount: 3, url: "https://shop.bysawr.com/search?q=AX-50" },
    { id: "svd", title: "SVD", productCount: 5, url: "https://shop.bysawr.com/search?q=SVD" },
    { id: "hdr", title: "HDR", productCount: 5, url: "https://shop.bysawr.com/search?q=HDR" },
    { id: "mors", title: "MORS", productCount: 5, url: "https://shop.bysawr.com/search?q=MORS" },
    { id: "callsign", title: "Callsign Camo", productCount: 3, url: "https://shop.bysawr.com/search?q=callsign" },
    { id: "killcam", title: "Killcam Camo", productCount: 3, url: "https://shop.bysawr.com/search?q=killcam" },
    { id: "character-render", title: "Character Render", productCount: 0, url: "https://shop.bysawr.com/search?q=character%20render" },
    { id: "xpr50", title: "XPR50", productCount: 6, url: "https://shop.bysawr.com/search?q=XPR50" },
    { id: "svu-as", title: "SVU-AS", productCount: 5, url: "https://shop.bysawr.com/search?q=SVU-AS" }
];

// Function to round productCount and add "+"
const roundProductCount = (count) => {
    if (count < 10) {
        return `+${count}`;
    }
    // Round to nearest 5 for numbers 10-99
    if (count >= 10 && count < 100) {
        return `+${Math.round(count / 5) * 5}`;
    }
    // Round to nearest 10 for numbers >= 100
    return `+${Math.round(count / 10) * 10}`;
};

// Map over collections to update productCount
const updatedCollections = collections.map(collection => ({
    ...collection,
    productCount: roundProductCount(collection.productCount)
}));

// Output the updated collections
console.log(updatedCollections);

    const popularSearches = [
        {
            query: "Premade Thumbnails",
            type: "collection",
            url: "https://shop.bysawr.com/collection/premade",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></g></svg>`
        },
        {
            query: "Black Ops 6",
            type: "search",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 11h4M8 9v4m7-1h.01M18 10h.01m-.69-5H6.68a4 4 0 0 0-3.978 3.59l-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258q-.01-.075-.017-.151A4 4 0 0 0 17.32 5"></path></svg>`
        },
        {
            query: "Dark Matter",
            type: "search",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"></path><path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7m0-4h.01"></path><path d="m11 8l2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"></path></g></svg>`
        },
        {
            query: "YouTube Subscribe Tag",
            type: "product",
            url: "https://shop.bysawr.com/b/youtube-subscribe-tag-2025",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zm1 .27V12"></path><path d="m3.3 7l7.703 4.734a2 2 0 0 0 1.994 0L20.7 7M7.5 4.27l9 5.15"></path></g></svg>`
        },
        {
            query: "Freebies",
            type: "collection",
            url: "https://shop.bysawr.com/collection/free",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="4" x="3" y="8" rx="1"></rect><path d="M12 8v13m7-9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5"></path></g></svg>`
        },
        {
            query: "Ultimate Subtitle Pack",
            type: "product",
            url: "https://shop.bysawr.com/b/ultimate-subtitle-pack",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zm1 .27V12"></path><path d="m3.3 7l7.703 4.734a2 2 0 0 0 1.994 0L20.7 7M7.5 4.27l9 5.15"></path></g></svg>`
        }
    ];

    // DOM elements
    const searchInput = document.getElementById('search-input');
    const searchDialog = document.getElementById('search-dialog');
    const commandInput = document.getElementById('command-input');
    const closeDialog = document.getElementById('close-dialog');
    const popularSearchesContainer = document.getElementById('popular-searches-container');
    const topCollectionsContainer = document.getElementById('top-collections-container');
    const allCollectionsContainer = document.getElementById('all-collections-container');
    const noResults = document.getElementById('no-results');

    // Sort collections by product count
    const sortedCollections = collections.sort((a, b) => b.productCount - a.productCount);
    const topCollections = sortedCollections.slice(0, 5);

    // Open/close dialog with fade effect
    function toggleDialog() {
        if (searchDialog.classList.contains('hidden')) {
            searchDialog.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setTimeout(() => commandInput.focus(), 100);
        } else {
            searchDialog.classList.add('hidden');
            document.body.style.overflow = '';
            commandInput.value = '';
            filterResults();
        }
    }

    function performSearch(query) {
        if (query.trim()) {
            window.location.href = `https://shop.bysawr.com/search?q=${encodeURIComponent(query.trim())}`;
        }
    }

    // Handle selection with proper routing
    function handleSelection(item) {
        let url;
        if (item.type === 'product' || item.type === 'collection') {
            url = item.url;
        } else {
            performSearch(item.query || item);
            return;
        }
        window.location.href = url;
    }

    // Render popular searches with icons and hover effect
    function renderPopularSearches() {
        popularSearchesContainer.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${popularSearches.map(search => `
                    <button class="search-item group flex items-center space-x-3 w-full text-left p-2 rounded-lg text-sm" 
                        role="option">
                        <span class="flex-none text-lg">${search.icon}</span>
                        <span class="flex-1 truncate group-hover:text-blue-600 transition-colors duration-200">${search.query}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Add click handlers for popular searches
        popularSearchesContainer.querySelectorAll('.search-item').forEach((button, index) => {
            button.addEventListener('click', () => handleSelection(popularSearches[index]));
        });
    }

    // Render top collections with enhanced styling
    function renderTopCollections() {
        topCollectionsContainer.innerHTML = `
            <div class="space-y-1">
                ${topCollections.map(collection => `
                    <button class="search-item flex items-center justify-between w-full p-2 rounded-lg text-sm group" 
                        role="option" 
                        data-url="${collection.url}">
                        <span class="group-hover:text-blue-600 transition-colors duration-200">${collection.title}</span>
                        <span class="product-count text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-200">${collection.productCount}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Add click handlers for collections
        topCollectionsContainer.querySelectorAll('.search-item').forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = button.dataset.url;
            });
        });
    }

    // Render all collections (initially hidden)
    function renderAllCollections() {
        allCollectionsContainer.innerHTML = `
            <div class="space-y-1 max-h-60 overflow-y-auto">
                ${sortedCollections.map(collection => `
                    <button class="search-item flex items-center justify-between w-full p-2 rounded-lg text-sm group" 
                        role="option" 
                        data-url="${collection.url}">
                        <span class="group-hover:text-blue-600 transition-colors duration-200">${collection.title}</span>
                        <span class="product-count text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-200">${collection.productCount}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Add click handlers for all collections
        allCollectionsContainer.querySelectorAll('.search-item').forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = button.dataset.url;
            });
        });
    }

    // Filter results with improved UX
    function filterResults() {
        const query = commandInput.value.toLowerCase();
        let hasResults = false;

        if (query) {
            popularSearchesContainer.classList.add('hidden');
            topCollectionsContainer.classList.add('hidden');
            allCollectionsContainer.classList.remove('hidden');

            const items = allCollectionsContainer.querySelectorAll('.search-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'flex';
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            popularSearchesContainer.classList.remove('hidden');
            topCollectionsContainer.classList.remove('hidden');
            allCollectionsContainer.classList.add('hidden');
            hasResults = true;
        }

        noResults.classList.toggle('hidden', hasResults);
    }

    // Event listeners
    searchInput.addEventListener('click', toggleDialog);
    closeDialog.addEventListener('click', toggleDialog);
    commandInput.addEventListener('input', filterResults);

    // Add Enter key handler for main search input
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `https://shop.bysawr.com/search?q=${encodeURIComponent(query)}`;
            }
        }
    });

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(commandInput.value);
        }
    });


    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            toggleDialog();
        } else if (e.key === 'Escape' && !searchDialog.classList.contains('hidden')) {
            toggleDialog();
        }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!searchDialog.classList.contains('hidden') &&
            !e.target.closest('.search-content') &&
            !e.target.closest('#search-input')) {
            toggleDialog();
        }
    });

    // Initial render
    renderPopularSearches();
    renderTopCollections();
    renderAllCollections();
