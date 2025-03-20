from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import pandas as pd
import json

# Set up Selenium WebDriver
driver_path = r'C:/Users/nimbo/Downloads/chromedriver-win64/chromedriver.exe'  # Path to ChromeDriver executable
service = Service(driver_path)  # Use the Service object
driver = webdriver.Chrome(service=service)  # Initialize WebDriver with the service

# URL of the phyphox Sensor Database
url = "https://phyphox.org/sensordb/"

try:
    # Open the webpage
    driver.get(url)

    # Wait for the page to load completely
    driver.implicitly_wait(10)

    # Access the `sensordbTable.rowManager.rows` JavaScript property
    rows_data = driver.execute_script("""
        sensorDbRows = [];  
         sensordbTable.rowManager.rows.forEach(row => {
    
            capitalizedCompanyName = str => str ? str[0].toUpperCase() + str.slice(1) : str;
            sensorDbRows.push({
            model: {'name': `${capitalizedCompanyName(row.data.ma)} ${row.data.mo}`},
            accelerometer: {'name': row.data.an, 'manufacturer': row.data.av, 'range_m/s^2': row.data.aran, 'resolution_m/s^2': row.data.ares, rate_Hz: row.data.arat, 'average_m/s^2': row.data.aa, 'noise_m/s^2': row.data.as},
            acceleration_without_g: {'name': row.data.ln, 'manufacturer': row.data.lv, 'range_m/s^2': row.data.lran, 'resolution_m/s^2': row.data.lres, rate_Hz: row.data.lrat, 'noise_m/s^2': row.data.ls},
            gyroscope: {'name': row.data.gn, 'manufacturer': row.data.gv, 'range_rad/s': row.data.gran, 'resolution_rad/s': row.data.gres, 'rate_Hz': row.data.grat, 'noise_rad/s': row.data.gs},
            magnetometer: {'name': row.data.mn, 'manufacturer': row.data.mv, 'range_microtesla': row.data.mran, 'resolution_microtesla': row.data.mres, 'rate_Hz': row.data.mrat, 'noise_microtesla': row.data.ms},
            pressure: {'name': row.data.pn, 'manufacturer': row.data.pv, 'range_hPa': row.data.pran, 'resolution_hPa': row.data.pres, 'rate_Hz': row.data.prat, 'noise_hPa': row.data.ps}
                 })});
        return sensorDbRows;
    """)


    # Save the data as a JSON file
    file_name = 'data.json'
    file_name_js = './../js/data.json'
    with open(file_name, 'w', encoding='utf-8') as json_file:
        json.dump(rows_data, json_file, ensure_ascii=False, indent=4)
    with open(file_name_js, 'w', encoding='utf-8') as json_file:
        json.dump(rows_data, json_file, ensure_ascii=False, indent=4)
    print(f"Data successfully saved to {file_name}")
    print(f"Data successfully saved to {file_name_js}")

            # Convert rows_data into a flat DataFrame
      # Convert rows_data into a flat DataFrame
    # Convert rows_data into a flat DataFrame
    flattened_data = []
    for row in rows_data:
        flat_row = {
            "Model": row.get("model").get("name"),
            **{f"Accelerometer_{key}": value for key, value in row["accelerometer"].items()},
            **{f"AccelerationWithoutG_{key}": value for key, value in row["acceleration_without_g"].items()},
            **{f"Gyroscope_{key}": value for key, value in row["gyroscope"].items()},
            **{f"Magnetometer_{key}": value for key, value in row["magnetometer"].items()},
            **{f"Pressure_{key}": value for key, value in row["pressure"].items()}
        }
        flattened_data.append(flat_row)

    # Create a DataFrame
    data = pd.DataFrame(flattened_data)

    # Add 4 blank columns between each existing column with no headers
    expanded_data = pd.DataFrame(index=data.index)
    for col in data.columns:
        expanded_data[col] = data[col]  # Add original column
        for _ in range(4):  # Add 4 blank columns with no headers
            expanded_data[""] = ""  # Use an empty string as the column name

    # Save to an Excel file
    file_name = 'database.xlsx'
    expanded_data.to_excel(file_name, index=False)


except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the browser
    driver.quit()