# Aqara smart LED bulb

## zigbee2mqtt/bridge/device
```json
  {
  "definition": {
    "description": "Mi/Aqara smart home cube",
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
        "description": "Voltage of the battery in millivolts",
        "label": "Voltage",
        "name": "voltage",
        "property": "voltage",
        "type": "numeric",
        "unit": "mV"
      },
      {
        "access": 1,
        "label": "Action angle",
        "name": "action_angle",
        "property": "action_angle",
        "type": "numeric",
        "unit": "°",
        "value_max": 360,
        "value_min": -360
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
        "description": "Number of power outages",
        "label": "Power outage count",
        "name": "power_outage_count",
        "property": "power_outage_count",
        "type": "numeric"
      },
      {
        "access": 1,
        "description": "Side of the cube",
        "label": "Action from side",
        "name": "action_from_side",
        "property": "action_from_side",
        "type": "numeric",
        "value_max": 6,
        "value_min": 0,
        "value_step": 1
      },
      {
        "access": 1,
        "description": "Side of the cube",
        "label": "Action side",
        "name": "action_side",
        "property": "action_side",
        "type": "numeric",
        "value_max": 6,
        "value_min": 0,
        "value_step": 1
      },
      {
        "access": 1,
        "description": "Side of the cube",
        "label": "Action to side",
        "name": "action_to_side",
        "property": "action_to_side",
        "type": "numeric",
        "value_max": 6,
        "value_min": 0,
        "value_step": 1
      },
      {
        "access": 1,
        "description": "Side of the cube",
        "label": "Side",
        "name": "side",
        "property": "side",
        "type": "numeric",
        "value_max": 6,
        "value_min": 0,
        "value_step": 1
      },
      {
        "access": 1,
        "description": "Triggered action (e.g. a button click)",
        "label": "Action",
        "name": "action",
        "property": "action",
        "type": "enum",
        "values": [
          "shake",
          "throw",
          "wakeup",
          "fall",
          "tap",
          "slide",
          "flip180",
          "flip90",
          "rotate_left",
          "rotate_right"
        ]
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
    "model": "MFKZQ01LM",
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
        "description": "Set to false to disable the legacy integration (highly recommended), will change structure of the published payload (default true).",
        "label": "Legacy",
        "name": "legacy",
        "property": "legacy",
        "type": "binary",
        "value_off": false,
        "value_on": true
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
    },
    "2": {
      "bindings": [],
      "clusters": {
        "input": [],
        "output": []
      },
      "configured_reportings": [],
      "scenes": []
    },
    "3": {
      "bindings": [],
      "clusters": {
        "input": [],
        "output": []
      },
      "configured_reportings": [],
      "scenes": []
    }
  },
  "friendly_name": "Cube",
  "ieee_address": "0x00158d0002a71b33",
  "interview_completed": true,
  "interviewing": false,
  "manufacturer": "LUMI",
  "model_id": "lumi.sensor_cube.aqgl01",
  "network_address": 51690,
  "power_source": "Battery",
  "supported": true,
  "type": "EndDevice"
}
```

## zigbee2mqtt/Cube
```json
{
  "angle": 60.31,
  "battery": 100,
  "current": 0,
  "device_temperature": 18,
  "linkquality": 255,
  "power": 419,
  "power_outage_count": 344,
  "side": 3,
  "voltage": 3045
}
```
