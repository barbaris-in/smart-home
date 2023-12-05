# Aqara smart LED bulb

## zigbee2mqtt/bridge/device
```json
  {
  "definition": {
    "description": "Aqara human body movement and illuminance sensor",
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
        "description": "Indicates whether the device detected occupancy",
        "label": "Occupancy",
        "name": "occupancy",
        "property": "occupancy",
        "type": "binary",
        "value_off": false,
        "value_on": true
      },
      {
        "access": 1,
        "description": "Temperature of the device",
        "label": "Device temperature",
        "name": "device_temperature",
        "property": "device_temperature",
        "type": "numeric",
        "unit": "°C"
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
        "description": "Measured illuminance in lux",
        "label": "Illuminance (lux)",
        "name": "illuminance_lux",
        "property": "illuminance",
        "type": "numeric",
        "unit": "lx"
      },
      {
        "access": 1,
        "description": "Measured illuminance in lux",
        "label": "Illuminance",
        "name": "illuminance",
        "property": "illuminance",
        "type": "numeric",
        "unit": "lx"
      },
      {
        "access": 1,
        "description": "Number of power outages",
        "label": "Power outage count",
        "name": "power_outage_count",
        "property": "power_outage_count",
        "type": "numeric"
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
    "model": "RTCGQ11LM",
    "options": [
      {
        "access": 2,
        "description": "Calibrates the device_temperature value (absolute offset), takes into effect on next report of device.",
        "label": "Device temperature calibration",
        "name": "device_temperature_calibration",
        "property": "device_temperature_calibration",
        "type": "numeric"
      },
      {
        "access": 2,
        "description": "Calibrates the illuminance_lux value (percentual offset), takes into effect on next report of device.",
        "label": "Illuminance lux calibration",
        "name": "illuminance_lux_calibration",
        "property": "illuminance_lux_calibration",
        "type": "numeric"
      },
      {
        "access": 2,
        "description": "Calibrates the illuminance value (percentual offset), takes into effect on next report of device.",
        "label": "Illuminance calibration",
        "name": "illuminance_calibration",
        "property": "illuminance_calibration",
        "type": "numeric"
      },
      {
        "access": 2,
        "description": "Time in seconds after which occupancy is cleared after detecting it (default 90 seconds).",
        "label": "Occupancy timeout",
        "name": "occupancy_timeout",
        "property": "occupancy_timeout",
        "type": "numeric",
        "value_min": 0
      },
      {
        "access": 2,
        "description": "Sends a message the last time occupancy (occupancy: true) was detected. When setting this for example to [10, 60] a `{\"no_occupancy_since\": 10}` will be send after 10 seconds and a `{\"no_occupancy_since\": 60}` after 60 seconds.",
        "item_type": {
          "access": 3,
          "label": "Time",
          "name": "time",
          "type": "numeric"
        },
        "label": "No occupancy since",
        "name": "no_occupancy_since",
        "property": "no_occupancy_since",
        "type": "list"
      }
    ],
    "supports_ota": false,
    "vendor": "Xiaomi"
  },
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
  "friendly_name": "Bathroom Motion Sensor",
  "ieee_address": "0x00158d000411086c",
  "interview_completed": true,
  "interviewing": false,
  "manufacturer": "LUMI",
  "model_id": "lumi.sensor_motion.aq2",
  "network_address": 16579,
  "power_source": "Battery",
  "supported": true,
  "type": "EndDevice"
}
```

## zigbee2mqtt/
```json

```
