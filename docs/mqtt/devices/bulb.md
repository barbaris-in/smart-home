# Aqara smart LED bulb

## zigbee2mqtt/bridge/device
```json
  {
    "date_code": "03-31-2022",
    "definition": {
      "description": "Aqara smart LED bulb",
      "exposes": [
        {
          "features": [
            {
              "access": 7,
              "description": "On/off state of this light",
              "label": "State",
              "name": "state",
              "property": "state",
              "type": "binary",
              "value_off": "OFF",
              "value_on": "ON",
              "value_toggle": "TOGGLE"
            },
            {
              "access": 7,
              "description": "Brightness of this light",
              "label": "Brightness",
              "name": "brightness",
              "property": "brightness",
              "type": "numeric",
              "value_max": 254,
              "value_min": 0
            },
            {
              "access": 7,
              "description": "Color temperature of this light",
              "label": "Color temp",
              "name": "color_temp",
              "presets": [
                {
                  "description": "Coolest temperature supported",
                  "name": "coolest",
                  "value": 153
                },
                {
                  "description": "Cool temperature (250 mireds / 4000 Kelvin)",
                  "name": "cool",
                  "value": 250
                },
                {
                  "description": "Neutral temperature (370 mireds / 2700 Kelvin)",
                  "name": "neutral",
                  "value": 370
                },
                {
                  "description": "Warmest temperature supported",
                  "name": "warmest",
                  "value": 370
                }
              ],
              "property": "color_temp",
              "type": "numeric",
              "unit": "mired",
              "value_max": 370,
              "value_min": 153
            },
            {
              "access": 7,
              "description": "Color temperature after cold power on of this light",
              "label": "Color temp startup",
              "name": "color_temp_startup",
              "presets": [
                {
                  "description": "Coolest temperature supported",
                  "name": "coolest",
                  "value": 153
                },
                {
                  "description": "Cool temperature (250 mireds / 4000 Kelvin)",
                  "name": "cool",
                  "value": 250
                },
                {
                  "description": "Neutral temperature (370 mireds / 2700 Kelvin)",
                  "name": "neutral",
                  "value": 370
                },
                {
                  "description": "Warmest temperature supported",
                  "name": "warmest",
                  "value": 370
                },
                {
                  "description": "Restore previous color_temp on cold power on",
                  "name": "previous",
                  "value": 65535
                }
              ],
              "property": "color_temp_startup",
              "type": "numeric",
              "unit": "mired",
              "value_max": 370,
              "value_min": 153
            }
          ],
          "type": "light"
        },
        {
          "access": 2,
          "description": "Triggers an effect on the light (e.g. make light blink for a few seconds)",
          "label": "Effect",
          "name": "effect",
          "property": "effect",
          "type": "enum",
          "values": [
            "blink",
            "breathe",
            "okay",
            "channel_change",
            "finish_effect",
            "stop_effect"
          ]
        },
        {
          "access": 3,
          "description": "Enable/disable the power outage memory, this recovers the on/off mode after power failure",
          "label": "Power outage memory",
          "name": "power_outage_memory",
          "property": "power_outage_memory",
          "type": "binary",
          "value_off": false,
          "value_on": true
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
      "model": "ZNLDP12LM",
      "options": [
        {
          "access": 2,
          "description": "Controls the transition time (in seconds) of on/off, brightness, color temperature (if applicable) and color (if applicable) changes. Defaults to `0` (no transition).",
          "label": "Transition",
          "name": "transition",
          "property": "transition",
          "type": "numeric",
          "value_min": 0
        },
        {
          "access": 2,
          "description": "When enabled colors will be synced, e.g. if the light supports both color x/y and color temperature a conversion from color x/y to color temperature will be done when setting the x/y color (default true).",
          "label": "Color sync",
          "name": "color_sync",
          "property": "color_sync",
          "type": "binary",
          "value_off": false,
          "value_on": true
        },
        {
          "access": 2,
          "description": "State actions will also be published as 'action' when true (default false).",
          "label": "State action",
          "name": "state_action",
          "property": "state_action",
          "type": "binary",
          "value_off": false,
          "value_on": true
        }
      ],
      "supports_ota": true,
      "vendor": "Xiaomi"
    },
    "disabled": false,
    "endpoints": {
      "1": {
        "bindings": [],
        "clusters": {
          "input": [
            "genBasic",
            "genGroups",
            "genIdentify",
            "genScenes",
            "genTime",
            "closuresWindowCovering",
            "genAnalogOutput",
            "genMultistateOutput",
            "genOnOff",
            "genPowerCfg",
            "msOccupancySensing",
            "genLevelCtrl",
            "lightingColorCtrl",
            "msPressureMeasurement",
            "msRelativeHumidity",
            "msTemperatureMeasurement"
          ],
          "output": [
            "genOta",
            "genTime",
            "genAnalogOutput",
            "closuresWindowCovering",
            "genMultistateOutput",
            "genOnOff",
            "genPowerCfg",
            "msOccupancySensing",
            "genLevelCtrl",
            "lightingColorCtrl"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      }
    },
    "friendly_name": "Office Desk Light",
    "ieee_address": "0x00158d00041138dd",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.light.aqcn02",
    "network_address": 32892,
    "power_source": "DC Source",
    "software_build_id": "1.34\u0000",
    "supported": true,
    "type": "Router"
  }
```

## zigbee2mqtt/Bedroom Desk Light
```json
{
  "brightness": 41,
  "color_mode": "color_temp",
  "color_temp": 260,
  "linkquality": 220,
  "state": "OFF",
  "update": {
    "installed_version": 31,
    "latest_version": 34,
    "state": "available"
  },
  "update_available": true
}
```
