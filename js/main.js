async function startWindows(
  mainFooter,
  searchInput,
  searchFiltersList,
  filteredKeys,
  additionalSearchFilters,
  dataKeyNames,
  jsonUrl
) {
  const jsonData = await importData(jsonUrl);
  const sortedData = sortData(jsonData);
  //   new QWebChannel(qt.webChannelTransport, function (channel) {
  //     interfaceModule = channel.objects.bridge;
  //     interfaceModule.sendJsCommand.connect(function (command) {
  //       eval(command);
  //     });
  //   });
  // preloadStatsData(sortedData);
  loadLoadButtons(sortedData, searchInput, mainFooter);
  createFilterSearchElements(
    searchFiltersList,
    filteredKeys,
    additionalSearchFilters,
    window.searchKeys,
    window.searchSubKeys,
    dataKeyNames,
    searchInput,
    sortedData,
    mainFooter
  );
  window.loadSearch(sortedData, searchInput, mainFooter);
  setSearchInputEvents(
    searchInput,
    sortedData,
    window.searchKeys,
    window.searchSubKeys,
    mainFooter
  );
}

function loadLoadButtons(sortedData, searchInput, mainFooter) {
  document.querySelectorAll('.search-button').forEach((button) => {
    button.addEventListener('mousedown', () => {
      clearAllPageLoadingIntervals();
      window[`load${button.getAttribute('loadKey')}`](
        sortedData,
        searchInput,
        mainFooter
      );
    });
  });
}

setHoverEvents(searchInput, searchSection, mainFooter);
startWindows(
  mainFooter,
  searchInput,
  searchFiltersList,
  filteredKeys,
  additionalSearchFilters,
  dataKeyNames,
  './data.json'
);
