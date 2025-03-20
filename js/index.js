let interfaceModule;

let searchInput = document.getElementById('search-input');
let searchSection = document.getElementById('search-section');
let searchFiltersList = document.getElementById('search-filters-list');
let mainFooter = document.getElementById('main-footer');
let cartItemsNumber = document.querySelector('.cart-items-number');
var searchFiltersInterval = -1;
const pageLoadingIntervals = new Set();
const clearAllPageLoadingIntervals = () => {
  pageLoadingIntervals.forEach((intervalId) => clearInterval(intervalId));
  pageLoadingIntervals.clear();
};
window.searchKeys = new Set();
window.searchSubKeys = new Set();

const statsObject = {
  magnetometer: { name: 'Magnetometer', data: [] },
  accelerometer: { name: 'Accelerometer', data: [] },
  gyroscope: { name: 'Gyroscope', data: [] },
  pressure: { name: 'Barometer', data: [] },
};

const dataKeyNames = {
  'model.name': 'Name',
  'magnetometer.name': 'Magnetometer',
  'magnetometer.manufacturer': 'Mag Manufacturer',
  'magnetometer.max_rate_Hz': 'Mag Max Rate (Hz)',
  'magnetometer.sensitivity_16_bit_microtesla/lsb':
    'Mag Sensitivity (16 bit μT/LSB)',
  'magnetometer.rate_Hz': 'Mag Rate (Hz)',
  'magnetometer.resolution_microtesla': 'Mag Resolution (μT)',
  'magnetometer.range_microtesla': 'Mag Range (μT)',
  'magnetometer.noise_microtesla': 'Mag Noise (μT)',

  'accelerometer.name': 'Accelerometer',
  'accelerometer.manufacturer': 'Acc Manufacturer',
  'accelerometer.max_rate_Hz': 'Acc Max Rate (Hz)',
  'accelerometer.sensitivity_lsb/g_+-2g_range':
    'Acc Sensitivity (LSB/g at ±2g range)',
  'accelerometer.rate_Hz': 'Acc Rate (Hz)',
  'accelerometer.resolution_m/s^2': 'Acc Resolution (m/s^2)',
  'accelerometer.range_m/s^2': 'Acc Range (m/s^2)',
  'accelerometer.noise_m/s^2': 'Acc Noise (m/s^2)',
  'accelerometer.average_m/s^2': 'Acc Average (m/s^2)',

  'acceleration_without_g.name': 'Awh Accelorometer No Gravity',
  'acceleration_without_g.manufacturer': 'Awh Manufacturer',
  'acceleration_without_g.max_rate_Hz': 'Awh Max Rate (Hz)',
  'acceleration_without_g.sensitivity_lsb/g_+-2g_range':
    'Acc Sensitivity (LSB/g at ±2g range)',
  'acceleration_without_g.rate_Hz': 'Awh Rate (m/s^2)',
  'acceleration_without_g.range_m/s^2': 'Awh Range (m/s^2)',
  'acceleration_without_g.resolution_m/s^2': 'Awh Resolution (m/s^2)',
  'acceleration_without_g.noise_m/s^2': 'Awh Noise (m/s^2)',

  'gyroscope.name': 'Gyro',
  'gyroscope.manufacturer': 'Gyro Manufacturer',
  'gyroscope.max_rate_Hz': 'Gyro Max Rate (Hz)',
  'gyroscope.sensitivity_lsb/degree/s_+-2000_degree/s':
    'Gyro Sensitivity (LSB/°/s at ±2000°)',
  'gyroscope.rate_Hz': 'Gyro Rate (Hz)',
  'gyroscope.resolution_rad/s': 'Gyro Resolution (rad/s)',
  'gyroscope.range_rad/s': 'Gyro Range (rad/s)',
  'gyroscope.noise_rad/s': 'Gyro Noise (rad/s)',

  'pressure.name': 'Barometer',
  'pressure.manufacturer': 'Baro Manufacturer',
  'pressure.max_rate_Hz': 'Baro Max Rate (Hz)',
  'pressure.sensitivity_24_bit_lsb/hpa': 'Baro Sensitivity (24 bit LSB/hPa)',
  'pressure.rate_Hz': 'Baro Rate (Hz)',
  'pressure.resolution_hPa': 'Baro Resolution (hPa)',
  'pressure.range_hPa': 'Baro Range (hPa)',
  'pressure.noise_hPa': 'Baro Noise (hPa)',
};

const additionalSearchFilters = [
  'Sensor Name',
  'Sensor Manufacturer',
  'Sensor Max Rate',
  'Sensor Sensitivity',
  'Sensor Rate',
  'Sensor Resolution',
  'Sensor Range',
  'Sensor Noise',
  'Sensor Average',
];

const filteredKeys = Object.keys(dataKeyNames).filter((key) =>
  key.includes('name')
);

const dataKeyColors = {
  nam: 'white',
  awh: 'azure',
  mag: 'azure',
  bar: 'azure',
};

const cartItems = {};

//requests a module of a json file
const requestModule = ({ url }) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';
    request.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        //SPLITS THE TEXT OF THE BASE64STRING REMOVING THE UNNECESSARY PART WHICH DOESN'T HAVE DATA
        const base64String = reader.result.split(',')[1];
        const decodedString = decodeURIComponent(escape(atob(base64String)));
        const jsonData = JSON.parse(decodedString);
        resolve(jsonData);
      };
      reader.readAsDataURL(request.response);
    };
    request.send();
  });

// Recursive function to flatten nested objects
function flattenObject(obj, prefix = '') {
  const flattened = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(flattened, flattenObject(value, `${prefix}${key}.`));
    } else {
      flattened[`${prefix}${key}`] = value;
    }
  }
  return flattened;
}

async function importData(url) {
  const jsonData = await requestModule({ url: url });
  // Process each item in the data
  return jsonData;
}

async function importData1(url) {
  const jsonData = await requestModule({ url: url });
  // Process each item in the data
  jsonData.forEach((item, index) => {
    const flattenedItem = flattenObject(item);
    for (const [key, value] of Object.entries(flattenedItem)) {
      if (!flattenedData[key]) {
        flattenedData[key] = [];
      }
      flattenedData[key].push({ index: index, value: value });
    }
  });
}
