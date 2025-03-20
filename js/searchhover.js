const clearSearchFiltersInterval = () => {
  clearInterval(searchFiltersInterval);
  searchFiltersInterval = -1;
};

function setHoverEvents(searchInput, searchSection, mainFooter) {
  ['mouseover', 'click'].forEach((eventType) => {
    searchInput.addEventListener(eventType, () => {
      if (searchInput.disabled) return;
      searchSection.classList.remove('fade-out');
      clearSearchFiltersInterval();
    });

    searchSection.addEventListener(eventType, () => {
      if (searchInput.disabled) return;
      searchSection.classList.remove('fade-out');
      clearSearchFiltersInterval();
    });
    const isInstant = eventType === 'click';
    const elements = [...document.querySelectorAll('.search-button')];
    elements.push(mainFooter);

    elements.forEach((element) => {
      element.addEventListener(eventType, () => {
        if (isInstant) {
          searchSection.classList.add('fade-out');
          return;
        }

        if (
          searchFiltersInterval == -1 &&
          !searchSection.classList.contains('fade-out')
        ) {
          const now = new Date().getTime() / 1000;
          searchFiltersInterval = setInterval(() => {
            if (new Date().getTime() / 1000 - now >= 2) {
              searchSection.classList.add('fade-out');
              clearSearchFiltersInterval();
            }
          }, 100);
        }
      });
    });
  });
}
