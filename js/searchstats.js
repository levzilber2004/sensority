window.loadStats = (sortedData, searchInput, mainFooter) => {
  searchInput.disabled = true;
  searchInput.classList.add('disabled');
  mainFooter.innerHTML = '';
  // const stringsToRemove = new Set([
  //   'ak09918',
  //   'ak09918c',
  //   'ak0991x',
  //   'akm09918',
  //   'akm09918c',
  //   'mmc5603',
  //   'mmc56x3x',
  //   'akm09911',
  //   'yas537',
  //   'qmc6308',
  //   'ak09911',
  //   'ak09911c',
  //   'ak09916',
  //   'ak09916c',
  //   'yas539',
  //   'ak09915',
  //   'akm09915',
  //   'yas532',
  //   'af6133',
  //   'af6133e',
  //   'mxg4300',
  //   'qmc6308',
  //   'qmc630x',
  //   'bmm150',
  //   'ak8963',
  //   'ak8963c',
  //   'mmc3630kj',
  //   'mmc3530kj',
  //   'bmc150',
  //   'akm09919',
  //   'akm00918',
  //   'akm09912',
  //   'st480',
  //   'ak8975',
  //   'ak8975c',
  //   'lis2mdl',
  //   'mmc3680kj',
  //   'mmc5633',
  //   'gmc306',
  //   'mmc3416x',
  //   'mmc3416pj',
  //   'mmc34160pj',
  //   'bmm050',
  //   'af8133j',
  //   'yas530',
  //   'yas533',
  //   'af6837',
  //   'af9133',
  //   'akm8963',
  //   'bmc056',
  //   'bmm056',
  //   'hscdtd008a',
  //   'mmc3524xpj',
  //   'mmc5616',
  //   'mxg232x',
  //   'ak8972',
  //   'akm8975',
  //   'k303c',
  //   'qmcx983',
  //   'yamaha530',
  //   'afx133',
  //   'ak8973',
  // ]); // List of strings to remove

  // magnetometerList = magnetometerList.filter(
  //   (name) => !stringsToRemove.has(name)
  // );

  loadStatsData(sortedData, mainFooter);
};

function preloadStatsData(sortedData) {
  Object.keys(statsObject).forEach((key) => {
    const usageCounts = sortSensorByCount(
      sortedData,
      key,
      statsObject[key].list
    );
    statsObject[key].data = usageCounts;
  });
}

async function loadStatsData(jsonData, mainFooter) {
  let listMap;
  let columnMap;
  let absoluteContainer;
  const clearFooter = (mainFooter) => {
    // Clear any existing content in the footer
    mainFooter.innerHTML = '';
    listMap = {};
    columnMap = {};
    Object.keys(statsObject).forEach((key) => {
      const id = `${key}-column`;
      const columnObject = statsObject[key];
      const columnName = columnObject.name;
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
      list.setAttribute('start', 1);
      absoluteContainer = document.createElement('div');
      absoluteContainer.classList.add('absolute-container');
      listMap[key] = list;
      columnMap[key] = column;
      column.appendChild(list);
      mainFooter.appendChild(absoluteContainer);
    });
  };

  const loadElements = () => {
    let index = 0;
    pageLoadingIntervals.add(
      setInterval(() => {
        let hasMoreData = false;
        Object.keys(statsObject).forEach((key) => {
          if (statsObject[key].data.length > index) {
            hasMoreData = true;
            const keyName = statsObject[key].name;
            const count = statsObject[key].data[index].usageCount;
            const dataName = statsObject[key].data[index].name || '';
            const name = `${dataName.toUpperCase()} ${keyName
              .charAt(0)
              .toUpperCase()}${keyName.slice(1)}`;
            const itemId = `item-${key}-${index}`;
            const listItem = document.createElement('li');
            listItem.id = itemId;
            listItem.classList.add('section-item');
            listItem.innerHTML = `<div class='section-stats-item'><span>${name} </span><span style="color: green">IN ${count} DEVICE/S</span></div>`;
            // listItem.textContent = textContent;
            listMap[key].appendChild(listItem);
            columnMap[key].style.height = `calc(${index + 20}vh*3.069)`;
            listItem.addEventListener('click', () => {
              clearAllPageLoadingIntervals();

              const filteredData = jsonData.filter(
                (item) =>
                  (item[key].name &&
                    item[key].name.toLowerCase().includes(dataName)) ||
                  (item[key].manufacturer &&
                    item[key].manufacturer.toLowerCase().includes(dataName))
              );
              searchInput.disabled = false;
              searchInput.classList.remove('disabled');
              searchInput.value = `&${dataName}&`;
              //sets the checkbox enabled for the manufacturer and the sensor itself
              const label = document.getElementById(`checkbox-${key}`);
              label.querySelector('input').checked = true;
              const searchObject = label.getAttribute('searchObject');
              const searchKey = label.getAttribute('searchKey');
              window[searchObject].add(searchKey);
              document
                .getElementById(`checkbox-manufacturer`)
                .querySelector('input').checked = true;
              window.searchSubKeys.add('manufacturer');
              loadData(filteredData, mainFooter);
            });
          }
        });
        if (!hasMoreData) {
          clearAllPageLoadingIntervals();
        }
        index++;
      }, 0)
    );
  };
  clearFooter(mainFooter);
  loadElements();
}

function sortSensorByCount(data, searchKey, searchList) {
  searchList.sort(
    (a, b) =>
      countSensorsByString(data, searchKey, b) -
      countSensorsByString(data, searchKey, a)
  );

  return searchList
    .map((name) => {
      let usageCount = countSensorsByString(data, searchKey, name);

      return { name, usageCount };
    })
    .sort((a, b) => b.usageCount - a.usageCount);
}

function countSensorsByString(data, searchKey, searchString) {
  let count = 0;
  searchString = searchString.toLowerCase();

  data.forEach((entry) => {
    if (entry[searchKey]) {
      let name = entry[searchKey].name || '';
      let manufacturer = (entry[searchKey].manufacturer || '').replace(
        / |_|-/g,
        ''
      );

      if (
        name.replace(/ |_|-/g, '').toLowerCase().includes(searchString) ||
        manufacturer.toLowerCase().includes(searchString)
      ) {
        count++;
      }
    }
  });

  return count;
}

statsObject.accelerometer.list = [
  'bma050',
  'bma056',
  'bma222',
  'bma222e',
  'bma250',
  'bma253',
  'bma254',
  'bma255',
  'bma25x',
  'bma2x2',
  'bma2xy',
  'bma4',
  'bma420',
  'bma422',
  'bma4xy',
  'bma510',
  'bmc056',
  'bmc150',
  'bmi055',
  'bmi120',
  'bmi160',
  'bmi220',
  'bmi22x',
  'bmi260',
  'bmi26x',
  'bmi2xy',
  'bmi320',
  'bmi3x0',
  'bmi3xy',
  'bml160',
  'da218',
  'dmard06',
  'icm20600',
  'icm20602',
  'icm20607',
  'icm20608',
  'icm20610',
  'icm20626',
  'icm20645',
  'icm20690',
  'icm40605',
  'icm40607',
  'icm42605',
  'icm42605m',
  'icm42607',
  'icm42628',
  'icm42631',
  'icm42632m',
  'icm4263x',
  'icm45621',
  'icm45631',
  'icm456xx',
  'icm456xy',
  'icm4n607',
  'icm4x607',
  'icm4x6xa',
  'icm4x6xx',
  'k2dh',
  'k2hh',
  'k303c',
  'k330',
  'k3dh',
  'k3dsh',
  'k6ds3tr',
  'kionixkxtj3',
  'kr3dm',
  'kx021',
  'kx022',
  'kx023',
  'kx02x',
  'kx120',
  'kxcj',
  'kxcjk',
  'kxtf9',
  'kxtik1004',
  'kxtj2',
  'kxtj3',
  'kxtj9',
  'lis2de12',
  'lis2dh',
  'lis2dlc12',
  'lis2doc',
  'lis2ds',
  'lis2ds12',
  'lis2dw12',
  'lis2dwl',
  'lis2hh',
  'lis2hh12',
  'lis331dlh',
  'lis3dh',
  'lis3dhtr',
  'lis3dsh',
  'lsm330',
  'lsm330d',
  'lsm330dlc',
  'lsm6db0',
  'lsm6ds3',
  'lsm6ds3c',
  'lsm6ds3trc',
  'lsm6dsl',
  'lsm6dsm',
  'lsm6dso',
  'lsm6dsoetr3',
  'lsm6dsoq',
  'lsm6dsotr',
  'lsm6dsr',
  'lsm6dsv',
  'lsm6dsvq',
  'lsm6dsvtr',
  'mc316',
  'mc3210',
  'mc32x0',
  'mc3413',
  'mc3416',
  'mc3419',
  'mc34x9',
  'mc34xx',
  'mc3xxx',
  'mcubemc3xxx',
  'mi3da',
  'mir3d',
  'mir3da',
  'mma8452q',
  'mpu6050',
  'mpu60x0',
  'mpu6500',
  'mpu6515',
  'mpu6880',
  'mpu6k',
  'mxc4005',
  'mxc4005x',
  'mxc4005xc',
  'mxc400x',
  'mxc6655',
  'n2dm',
  'qmi8658',
  'qstqmax981',
  'sc7660',
  'sc7a20',
  'sh3001',
  'silansc7a20',
  'smb380',
  'stk8312',
  'stk8321',
  'stk832x',
  'stk83xx',
  'stk8ba50',
  'stk8ba53',
  'stk8baxx',
  'stk8xxx',
  'stlis3dh',
  'stmc34xx',
  'stmc3xxx',
  't1000',
  'u2dh',
];

statsObject.pressure.list = [
  'bm1383',
  'bme280',
  'bmp085',
  'bmp180',
  'bmp182',
  'bmp280',
  'bmp285',
  'bmp2866',
  'bmp380',
  'bmp380o',
  'bmp390',
  'bmp5',
  'bmp580',
  'gmp102',
  'hsppad038',
  'hsppad042a',
  'icp10100',
  'icp10101',
  'icp101xx',
  'icp20100',
  'icp20100l',
  'icp201xx',
  'lgeun',
  'lps22bh',
  'lps22df',
  'lps22dftr',
  'lps22h',
  'lps22hb',
  'lps22hh',
  'lps22hhtr',
  'lps25h',
  'lps25hb',
  'lps331ap',
  'omron2smpbomron2smpb02a',
  'spl06',
  'spl06001',
  'spl07',
  'spl07001',
  'spl0x',
];

statsObject.gyroscope.list = [
  'ak09911',
  'ak09918',
  'akm8963',
  'bmg160',
  'bmi055',
  'bmi120',
  'bmi160',
  'bmi220',
  'bmi22x',
  'bmi260',
  'bmi26x',
  'bmi2xy',
  'bmi320',
  'bmi3x0',
  'bmi3xy',
  'hscdtd007a',
  'icm20600',
  'icm20602',
  'icm20607',
  'icm20608',
  'icm20610',
  'icm20626',
  'icm20645',
  'icm20690',
  'icm40605',
  'icm40605',
  'icm40607',
  'icm42605',
  'icm42605m',
  'icm42607',
  'icm42607p',
  'icm42628',
  'icm42631',
  'icm42632m',
  'icm4263x',
  'icm45621',
  'icm45631',
  'icm456xx',
  'icm456xy',
  'icm4n607',
  'icm4x607',
  'icm4x6xa',
  'icm4x6xx',
  'k330',
  'k3g',
  'k6ds3tr',
  'l3g3200d',
  'l3g4200',
  'l3g4200d',
  'l3g4200g',
  'l3gd20',
  'lsm330',
  'lsm330d',
  'lsm330dlc',
  'lsm6db0',
  'lsm6ds3',
  'lsm6ds3c',
  'lsm6dsl',
  'lsm6dsm',
  'lsm6dso',
  'lsm6dsoe',
  'lsm6dsr',
  'lsm6dsv',
  'lsm6dsvq',
  'lsm6dsvtr',
  'mmc3630kj',
  'mpu3050',
  'mpu3050c',
  'mpu6050',
  'mpu6500',
  'mpu6515',
  'mpu6880',
  'mpu6k',
  'qmi8658',
  'r3gd20',
  'sh3001',
  'yas533',
  'yas537',
];

statsObject.magnetometer.list = [
  'af6133',
  'af6133e',
  'af6837',
  'af8133j',
  'af9133',
  'afx133',
  'ak09911',
  'ak09911c',
  'ak09915',
  'ak09916',
  'ak09916c',
  'ak09918',
  'ak09918c',
  'ak0991x',
  'ak8963',
  'ak8963c',
  'ak8972',
  'ak8973',
  'ak8975',
  'ak8975c',
  'akm0019',
  'akm00918',
  'akm09911',
  'akm09912',
  'akm09915',
  'akm09918',
  'akm09918c',
  'akm09919',
  'akm099xx',
  'akm8963',
  'akm8975',
  'bmc056',
  'bmc150',
  'bml160',
  'bmm050',
  'bmm056',
  'bmm150',
  'gmc306',
  'hscdtd007a',
  'hscdtd008a',
  'k303c',
  'lis2mdl',
  'lsm6db0',
  'lsm6ds3',
  'mmc34160pj',
  'mmc3416pj',
  'mmc3416x',
  'mmc3516xpj',
  'mmc3524xpj',
  'mmc3530kj',
  'mmc3630kj',
  'mmc3680kj',
  'mmc5603',
  'mmc5616',
  'mmc5633',
  'mmc56x3x',
  'ms3c',
  'mxg232x',
  'mxg4300',
  'qmc6308',
  'qmc630x',
  'qmcx983',
  'st350mc',
  'st480',
  'yamaha530',
  'yas530',
  'yas532',
  'yas532b',
  'yas533',
  'yas537',
  'yas539',
];
