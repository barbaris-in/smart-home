# Aqara temperature, humidity and pressure sensor

## zigbee2mqtt/bridge/device
```json
  {
  "definition": {
    "description": "Aqara temperature, humidity and pressure sensor",
    "exposes": [
      {
        "access": 1,
        "description": "Remaining battery in %, can take up to 24 hours before reported.",
        "label": "Battery",
        "name": "battery",
        "property": "battery",
        "type": "numeric",
        "unit": "%",
        "value_max": 100,
        "value_min": 0
      },
      {
        "access": 1,
        "description": "Measured temperature value",
        "label": "Temperature",
        "name": "temperature",
        "property": "temperature",
        "type": "numeric",
        "unit": "°C"
      },
      {
        "access": 1,
        "description": "Measured relative humidity",
        "label": "Humidity",
        "name": "humidity",
        "property": "humidity",
        "type": "numeric",
        "unit": "%"
      },
      {
        "access": 1,
        "description": "The measured atmospheric pressure",
        "label": "Pressure",
        "name": "pressure",
        "property": "pressure",
        "type": "numeric",
        "unit": "hPa"
      },
      {
        "access": 1,
        "description": "Voltage of the battery in millivolts",
        "label": "Voltage",
        "name": "voltage",
        "property": "voltage",
        "type": "numeric",
        "unit": "mV"
      },
      {
        "access": 1,
        "description": "Link quality (signal strength)",
        "label": "Linkquality",
        "name": "linkquality",
        "property": "linkquality",
        "type": "numeric",
        "unit": "lqi",
        "value_max": 255,
        "value_min": 0
      }
    ],
    "model": "WSDCGQ11LM",
    "options": [
      {
        "access": 2,
        "description": "Calibrates the temperature value (absolute offset), takes into effect on next report of device.",
        "label": "Temperature calibration",
        "name": "temperature_calibration",
        "property": "temperature_calibration",
        "type": "numeric"
      },
      {
        "access": 2,
        "description": "Number of digits after decimal point for temperature, takes into effect on next report of device.",
        "label": "Temperature precision",
        "name": "temperature_precision",
        "property": "temperature_precision",
        "type": "numeric",
        "value_max": 3,
        "value_min": 0
      },
      {
        "access": 2,
        "description": "Calibrates the pressure value (absolute offset), takes into effect on next report of device.",
        "label": "Pressure calibration",
        "name": "pressure_calibration",
        "property": "pressure_calibration",
        "type": "numeric"
      },
      {
        "access": 2,
        "description": "Number of digits after decimal point for pressure, takes into effect on next report of device.",
        "label": "Pressure precision",
        "name": "pressure_precision",
        "property": "pressure_precision",
        "type": "numeric",
        "value_max": 3,
        "value_min": 0
      },
      {
        "access": 2,
        "description": "Number of digits after decimal point for humidity, takes into effect on next report of device.",
        "label": "Humidity precision",
        "name": "humidity_precision",
        "property": "humidity_precision",
        "type": "numeric",
        "value_max": 3,
        "value_min": 0
      },
      {
        "access": 2,
        "description": "Calibrates the humidity value (absolute offset), takes into effect on next report of device.",
        "label": "Humidity calibration",
        "name": "humidity_calibration",
        "property": "humidity_calibration",
        "type": "numeric"
      }
    ],
    "supports_ota": false,
    "vendor": "Xiaomi"
  },
  "description": "",
  "disabled": false,
  "endpoints": {
    "1": {
      "bindings": [],
      "clusters": {
        "input": [],
        "output": []
      },
      "configured_reportings": [],
      "scenes": []
    }
  },
  "friendly_name": "Bedroom temperature, humidity and pressure sensor",
  "ieee_address": "0x00158d00040757a6",
  "interview_completed": true,
  "interviewing": false,
  "manufacturer": "LUMI",
  "model_id": "lumi.weather",
  "network_address": 1972,
  "power_source": "Battery",
  "supported": true,
  "type": "EndDevice"
}
```

## zigbee2mqtt/Bedroom temperature, humidity and pressure sensor
```json
{
  "battery": 100,
  "humidity": 44.43,
  "linkquality": 152,
  "power_outage_count": 1616,
  "pressure": 957.4,
  "temperature": 20.74,
  "voltage": 3025
}
```
