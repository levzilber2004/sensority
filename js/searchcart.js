window.loadCart = (sortedData, searchInput, mainFooter) => {
  searchInput.disabled = false;
  searchInput.classList.remove('disabled');
  loadCartData(cartItems, mainFooter);
};

async function loadCartData(cartItems, mainFooter) {
  let listMap;
  let columnMap;
  let absoluteContainer;
  const createAbsoluteContainerButton = (textContent) => {
    const absButton = document.createElement('button');
    absButton.classList.add('section-button');
    absButton.classList.add('element-shadow');
    absButton.classList.add('pop-button');
    absButton.textContent = textContent;
    absoluteContainer.appendChild(absButton);
    return absButton;
  };

  const clearFooter = (mainFooter, startCounter, amountOfElements) => {
    // Clear any existing content in the footer
    mainFooter.innerHTML = '';
    listMap = {};
    columnMap = {};
    Object.keys(dataKeyNames).forEach((key) => {
      const id = `${key}-column`;
      const columnName = dataKeyNames[key];
      const slicedColumnName = columnName.toLowerCase().slice(0, 3);
      // Create a new section for the column
      const column = document.createElement('section');
      column.id = id;
      column.classList.add('footer-section');
      column.classList.add(`footer-section-${key.replace('.', '-')}`);
      column.style.backgroundColor = dataKeyColors[slicedColumnName];
      // Add content to the column
      column.innerHTML = `<h3 class='section-title element-shadow'>${columnName}</h3>`;
      mainFooter.appendChild(column);
      const list = document.createElement('ol');
      list.classList.add('section-list');
      list.setAttribute('start', startCounter + 1);
      absoluteContainer = document.createElement('div');
      absoluteContainer.classList.add('absolute-container');
      listMap[key] = list;
      columnMap[key] = column;
      column.appendChild(list);
      mainFooter.appendChild(absoluteContainer);
    });
    const previousStartIndex = startCounter + 1 - amountOfElements;
    if (previousStartIndex > 0) {
      const previousButton = createAbsoluteContainerButton(
        `PREVIOUS PAGE (${previousStartIndex}-${startCounter})`
      );
      previousButton.addEventListener('mousedown', () => {
        clearAllPageLoadingIntervals();
        // Add the fade-out class to trigger the animation
        previousButton.classList.add('fade-out');
        // Wait for the animation to complete
        previousButton.addEventListener(
          'transitionend',
          () => {
            // Remove the element from the DOM
            previousButton.remove();
            clearFooter(mainFooter, previousStartIndex - 1, amountOfElements);
            loadElements(previousStartIndex - 1, amountOfElements);
          },
          { once: true }
        );
      });
    }
    const totalElements = startCounter + amountOfElements;
    if (totalElements < cartItems.length) {
      const listButton = createAbsoluteContainerButton(
        `NEXT PAGE (${totalElements + 1}-${totalElements + amountOfElements})`
      );
      absoluteContainer.appendChild(listButton);
      listButton.addEventListener('mousedown', () => {
        // Add the fade-out class to trigger the animation
        listButton.classList.add('fade-out');
        // Wait for the animation to complete
        listButton.addEventListener(
          'transitionend',
          () => {
            // Remove the element from the DOM
            listButton.remove();
            clearFooter(mainFooter, totalElements, amountOfElements);
            loadElements(totalElements, amountOfElements);
          },
          { once: true }
        );
      });
    }
  };

  const loadElements = (startingIndex, amountOfElements) => {
    let index = startingIndex;
    pageLoadingIntervals.add(
      setInterval(() => {
        const cartItemKey = Object.keys(cartItems)[index];
        const data = cartItems[cartItemKey];
        if (!data) {
          clearAllPageLoadingIntervals();
          return;
        }
        Object.keys(dataKeyNames).forEach((dataKey) => {
          [key, subKey] = dataKey.split('.');
          const itemId = `item-${key}${
            subKey ? `.${subKey.slice(0, 3)}` : ''
          }-${data.id}`;
          const textContent = subKey ? data[key][subKey] : data[key];
          const listItem = document.createElement('li');
          listItem.id = itemId;
          listItem.classList.add('section-item');
          listItem.innerHTML = `<span>${
            textContent == null ? '' : textContent
          }<span>`;
          const alt = cartItems.hasOwnProperty(data.id);
          listItem.setAttribute('alt', !alt);
          listItem.style.backgroundColor = alt ? 'green' : '';
          listItem.querySelector('span').style.color = alt ? 'white' : '';
          listItem.addEventListener('click', () => {
            const alt = listItem.getAttribute('alt') == 'true';
            Object.keys(dataKeyNames).forEach((dataKey) => {
              [key, subKey] = dataKey.split('.');
              const itemId = `item-${key}${
                subKey ? `.${subKey.slice(0, 3)}` : ''
              }-${data.id}`;
              const listElement = document.getElementById(itemId);
              listElement.style.backgroundColor = alt ? 'green' : '';
              listElement.querySelector('span').style.color = alt
                ? 'white'
                : '';
              listElement.setAttribute('alt', !alt);
            });

            if (alt) {
              cartItemsNumber.textContent =
                parseInt(cartItemsNumber.textContent) + 1;
              cartItems[data.id] = data;
            } else {
              cartItemsNumber.textContent =
                parseInt(cartItemsNumber.textContent) - 1;
              delete cartItems[data.id];
            }
          });
          listMap[dataKey].appendChild(listItem);
          columnMap[dataKey].style.height = `calc(${index + 20}vh*3.069)`;
        });
        const totalElements = amountOfElements + startingIndex;
        const hasNextPage = index + 1 >= totalElements;
        if (index + 1 >= cartItems.length || hasNextPage) {
          clearAllPageLoadingIntervals();
        }
        index++;
      }, 0)
    );
  };
  const amountOfElements = 300;
  clearFooter(mainFooter, 0, amountOfElements);
  loadElements(0, amountOfElements);
}
