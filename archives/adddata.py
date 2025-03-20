import json

# Function to modify the JSON data
def add_max_rate_hz(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    totalModifiedSensors = 0
    totalNotModifiedSensors = 0
    for mainObject in data:
        for subObject in ['accelerometer', 'magnetometer', 'pressure', 'acceleration_without_g', 'gyroscope']:  # Use a list of keys to iterate
            mainObject[subObject]['max_rate_Hz'] = None
            totalNotModifiedSensors += 1
        mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = None
        mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = None
        mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = None
        mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = None
        mainObject['pressure']['sensitivity_24_bit_lsb/hpa'] = None
    
            



    add_magnetometers(data)
    add_barometers(data)
    add_accel(data)
    add_accel_gyro(data)
    



    for mainObject in data:
        for subObject in ['accelerometer', 'magnetometer', 'pressure', 'acceleration_without_g', 'gyroscope']:  # Use a list of keys to iterate
            subData = mainObject[subObject]

            maxRate = subData.get('max_rate_Hz')
            accelSens = subData.get('sensitivity_lsb/g_+-2g_range')
            accelWgSens = subData.get('sensitivity_lsb/g_+-2g_range')
            gyroSens = subData.get('sensitivity_lsb/degree/s_+-2000_degree/s')
            MagnetSens = subData.get('sensitivity_16_bit_microtesla/lsb')
            pressureSens = subData.get('sensitivity_16_bit_lsb/hpa')

            if any([maxRate, accelSens, accelWgSens, gyroSens, MagnetSens, pressureSens]):
                totalModifiedSensors += 1




        

    print(totalModifiedSensors)
    print(totalNotModifiedSensors)
    # Save the updated JSON back to a file
    output_path = "data.json"
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=4)
    output_path_one = "./../js/data.json"
    with open(output_path_one, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"Updated file saved to: {output_path}")
    print(f"Updated file saved to: {output_path_one}")

# Specify the input file and the model key to search
file_path = "data.json"


def add_magnetometers(data):
    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['ak8963c' 'ak8963' ,'akm8963', 'ak0991x', 'akm09915', 'ak09915', 'ak09911', 'akm09911', 'yas539', 'akm09918', 'akm09919 ', 'ak09916', 'ak09918', 'akm00918', 'akm09912', 'ak09918c', 'ak09911', 'akm09911']):
            mainObject['magnetometer']['max_rate_Hz'] = 100
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.15

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['ak09915', 'akm09915']): 
            mainObject['magnetometer']['max_rate_Hz'] = 200

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['mmc56x3x', 'mmc5603']): 
            mainObject['magnetometer']['max_rate_Hz'] = 1000
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.09766

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['qmc6308', 'qmc630x']): 
            mainObject['magnetometer']['max_rate_Hz'] = 1500
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.00667

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['yas537']):
            mainObject['magnetometer']['max_rate_Hz'] = 626
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.3
    
    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['yas532']):
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.189

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['mxg4300, gmc306']):
            mainObject['magnetometer']['max_rate_Hz'] = 200
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.15

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['bmm150', 'bmc150']):
            mainObject['magnetometer']['max_rate_Hz'] = 300

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['ak8975' ,'ak8975c' 'akm8975']):
            mainObject['magnetometer']['max_rate_Hz'] = 136.98
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 2.4


    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['mmc5633']):
            mainObject['magnetometer']['max_rate_Hz'] = 1000
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.09765625 

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['mmc3680kj', 'mmc3630kj']):
            mainObject['magnetometer']['max_rate_Hz'] = 600
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.09765625 

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['mmc3530kj']):
            mainObject['magnetometer']['max_rate_Hz'] = 666
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.09765625 

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['lis2mdl']):
            mainObject['magnetometer']['max_rate_Hz'] = 150
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.15

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['af8133j']):
            mainObject['magnetometer']['max_rate_Hz'] = 400

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['mmc3416x', 'mmc34160pj', 'mmc3416pj']):
            mainObject['magnetometer']['max_rate_Hz'] = 800
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.048828125

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['yas530', 'yamaha530']):
            mainObject['magnetometer']['max_rate_Hz'] = 666
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.33541019662

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['af6837']):
            mainObject['magnetometer']['max_rate_Hz'] = 200 
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.1



    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['hscdtd008a']):
            mainObject['magnetometer']['max_rate_Hz'] = 100
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.15

    for mainObject in data:
        if any(keyword in str(mainObject['magnetometer'].get('name', '')).lower() or 
       keyword in str(mainObject['magnetometer'].get('manufacturer', '')).lower() 
       for keyword in ['mmc5616']):
            mainObject['magnetometer']['max_rate_Hz'] = 800 
            mainObject['magnetometer']['sensitivity_16_bit_microtesla/lsb'] = 0.09765625


def add_barometers(data):
    for mainObject in data:
        if any(keyword in str(mainObject['pressure'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['lps22h']):
            mainObject['pressure']['max_rate_Hz'] = 75
    for mainObject in data:
        if any(keyword in str(mainObject['pressure'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['lps22hh', 'bmp380']):
            mainObject['pressure']['max_rate_Hz'] = 200
      
    for mainObject in data:
        if any(keyword in str(mainObject['pressure'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['lps22h', 'lps25h']):
            mainObject['pressure']['sensitivity_24_bit_lsb/hpa'] = 4096
   
    for mainObject in data:
        if any(keyword in str(mainObject['pressure'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['bmp280']):
            mainObject['pressure']['max_rate_Hz'] = 157

    for mainObject in data:
        if any(keyword in str(mainObject['pressure'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['bmp180']):
            mainObject['pressure']['max_rate_Hz'] = 120

    for mainObject in data:
        if any(keyword in str(mainObject['pressure'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['lps25h']):
            mainObject['pressure']['max_rate_Hz'] = 25 


# 1. Xiaomi 21121119SG
# 2. Samsung SM-A225F 

def add_accel(data):
    for mainObject in data:
        if any(keyword in str(mainObject['accelerometer'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['lis2ds']):
            mainObject['accelerometer']['max_rate_Hz'] = 6400
            mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16393.442623 
            mainObject['acceleration_without_g']['max_rate_Hz'] = 6400
            mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16393.442623
             
    for mainObject in data:
        if any(keyword in str(mainObject['accelerometer'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['k2hh']):
            mainObject['accelerometer']['max_rate_Hz'] = 800
            mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16393.442623 
            mainObject['acceleration_without_g']['max_rate_Hz'] = 800
            mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16393.442623
    
    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['bma2', 'bma 250']):
                mainObject['accelerometer']['max_rate_Hz'] = 2000
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 64
                mainObject['acceleration_without_g']['max_rate_Hz'] = 2000
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 64
    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['lis3dh']):
                mainObject['accelerometer']['max_rate_Hz'] = 5300
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 62.5
                mainObject['acceleration_without_g']['max_rate_Hz'] = 5300
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 62.5

    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['bma255', 'bma254', 'bma253']):
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 1024
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 1024

                
def add_accel_gyro(data):
    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['lsm6dsv']):
                mainObject['accelerometer']['max_rate_Hz'] = 7680
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16393.442623
                mainObject['acceleration_without_g']['max_rate_Hz'] = 7680
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16393.442623
                mainObject['gyroscope']['max_rate_Hz'] = 7680
                mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = 7.14285714286


    for mainObject in data:
       for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['bmi160']):
                mainObject['accelerometer']['max_rate_Hz'] = 1600
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16384
                mainObject['acceleration_without_g']['max_rate_Hz'] = 1600
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16384
                mainObject['gyroscope']['max_rate_Hz'] = 3200   
                mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = 16.4

    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['bmi26']):
                mainObject['accelerometer']['max_rate_Hz'] = 1600
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16384
                mainObject['acceleration_without_g']['max_rate_Hz'] = 1600
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16384
                mainObject['gyroscope']['max_rate_Hz'] = 6400
                mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = 16.4

    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['icm42605', 'icm4x6xx']):
                mainObject['accelerometer']['max_rate_Hz'] = 8000
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16384
                mainObject['acceleration_without_g']['max_rate_Hz'] = 8000
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16384
                mainObject['gyroscope']['max_rate_Hz'] = 8000
                mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = 16.4

    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['lsm6dsm', 'lsm6dso', 'lsm6dsl', 'lsm6ds3', 'k6ds3tr']):
                mainObject['accelerometer']['max_rate_Hz'] = 6664
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16393.442623 
                mainObject['acceleration_without_g']['max_rate_Hz'] = 6664
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16393.442623 
                mainObject['gyroscope']['max_rate_Hz'] = 6664
                mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = 14.2857142857
    
    for mainObject in data:
        for subObject in list(mainObject.keys()):
            if any(keyword in str(mainObject[subObject].get('name', '')).lower() or 
       keyword in str(mainObject[subObject].get('manufacturer', '')).lower() 
       for keyword in ['icm20690']):
                mainObject['accelerometer']['max_rate_Hz'] = 500
                mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16384 
                mainObject['acceleration_without_g']['max_rate_Hz'] = 500
                mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16384 
                mainObject['gyroscope']['max_rate_Hz'] = 333.33
                mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = 16.4

    for mainObject in data:
        if any(keyword in str(mainObject['accelerometer'].get('name', '')).lower() or 
       keyword in str(mainObject['pressure'].get('manufacturer', '')).lower() 
       for keyword in ['mpu6500']):
            mainObject['accelerometer']['max_rate_Hz'] = 4000
            mainObject['accelerometer']['sensitivity_lsb/g_+-2g_range'] = 16384
            mainObject['acceleration_without_g']['max_rate_Hz'] = 4000
            mainObject['acceleration_without_g']['sensitivity_lsb/g_+-2g_range'] = 16384
            mainObject['gyroscope']['max_rate_Hz'] = 8000 
            mainObject['gyroscope']['sensitivity_lsb/degree/s_+-2000_degree/s'] = 16.4

    


# Call the function
add_max_rate_hz(file_path)