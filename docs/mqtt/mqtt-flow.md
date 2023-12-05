1. Connecting to MQTT
2. zigbee2mqtt/bridge/state (no payload)
3. zigbee2mqtt/bridge/info

```json
{
  "commit": "9996c93",
  "config": {
    "advanced": {
      "adapter_concurrent": null,
      "adapter_delay": null,
      "availability_blacklist": [],
      "availability_blocklist": [],
      "availability_passlist": [],
      "availability_whitelist": [],
      "cache_state": true,
      "cache_state_persistent": true,
      "cache_state_send_on_startup": true,
      "channel": 11,
      "elapsed": false,
      "ext_pan_id": [
        221,
        221,
        221,
        221,
        221,
        221,
        221,
        221
      ],
      "last_seen": "disable",
      "legacy_api": true,
      "legacy_availability_payload": true,
      "log_directory": "/app/data/log/%TIMESTAMP%",
      "log_file": "log.txt",
      "log_level": "info",
      "log_output": [
        "console",
        "file"
      ],
      "log_rotation": true,
      "log_symlink_current": false,
      "log_syslog": {},
      "output": "json",
      "pan_id": 6754,
      "report": false,
      "soft_reset_timeout": 0,
      "timestamp_format": "YYYY-MM-DD HH:mm:ss"
    },
    "blocklist": [],
    "device_options": {},
    "devices": {
      "0x00158d000122604e": {
        "friendly_name": "Bedroom Desk Switch"
      },
      "0x00158d000122fcd1": {
        "friendly_name": "Door Sensor"
      },
      "0x00158d0001a9ec71": {
        "friendly_name": "Motion Sensor 1"
      },
      "0x00158d0001db18f9": {
        "friendly_name": "Plug"
      },
      "0x00158d000204a3e1": {
        "friendly_name": "Square Switch"
      },
      "0x00158d0002a71b33": {
        "friendly_name": "Cube"
      },
      "0x00158d0002b7d6be": {
        "friendly_name": "Bedroom Desk Light"
      },
      "0x00158d00033e8db4": {
        "friendly_name": "Office Desk Switch"
      },
      "0x00158d000405cfee": {
        "friendly_name": "Bathroom leak sensor"
      },
      "0x00158d00040726f1": {
        "friendly_name": "Living Room temperature, humidity and pressure sensor"
      },
      "0x00158d00040757a6": {
        "description": "",
        "friendly_name": "Bedroom temperature, humidity and pressure sensor"
      },
      "0x00158d0004094a88": {
        "friendly_name": "Wall Switch 1"
      },
      "0x00158d000411086c": {
        "friendly_name": "Bathroom Motion Sensor"
      },
      "0x00158d0004112e41": {
        "friendly_name": "Light 1"
      },
      "0x00158d0004112e6f": {
        "friendly_name": "Hallway Light"
      },
      "0x00158d00041132a4": {
        "friendly_name": "Hallway Motion Sensor"
      },
      "0x00158d00041138dd": {
        "friendly_name": "Office Desk Light",
        "transition": 0
      },
      "0x00158d0004247d98": {
        "friendly_name": "Wall Switch 2"
      },
      "0x00158d000446a373": {
        "friendly_name": "Bathroom Mirror Light"
      },
      "0x00158d00044c95de": {
        "friendly_name": "Kitchen Motion Sensor"
      }
    },
    "external_converters": [],
    "frontend": {
      "host": "0.0.0.0",
      "port": 8080
    },
    "groups": {},
    "map_options": {
      "graphviz": {
        "colors": {
          "fill": {
            "coordinator": "#e04e5d",
            "enddevice": "#fff8ce",
            "router": "#4ea3e0"
          },
          "font": {
            "coordinator": "#ffffff",
            "enddevice": "#000000",
            "router": "#ffffff"
          },
          "line": {
            "active": "#009900",
            "inactive": "#994444"
          }
        }
      }
    },
    "mqtt": {
      "base_topic": "zigbee2mqtt",
      "force_disable_retain": false,
      "include_device_information": false,
      "server": "mqtt://mqtt"
    },
    "ota": {
      "disable_automatic_update_check": false,
      "update_check_interval": 1440
    },
    "passlist": [],
    "permit_join": true,
    "serial": {
      "disable_led": false,
      "port": "/dev/ttyACM0"
    }
  },
  "config_schema": {
    "definitions": {
      "device": {
        "properties": {
          "debounce": {
            "description": "Debounces messages of this device",
            "title": "Debounce",
            "type": "number"
          },
          "debounce_ignore": {
            "description": "Protects unique payload values of specified payload properties from overriding within debounce time",
            "examples": [
              "action"
            ],
            "items": {
              "type": "string"
            },
            "title": "Ignore debounce",
            "type": "array"
          },
          "disabled": {
            "description": "Disables the device (excludes device from network scans, availability and group state updates)",
            "requiresRestart": true,
            "title": "Disabled",
            "type": "boolean"
          },
          "filtered_attributes": {
            "description": "Filter attributes with regex from published payload.",
            "examples": [
              "^temperature$",
              "^battery$",
              "^action$"
            ],
            "items": {
              "type": "string"
            },
            "title": "Filtered publish attributes",
            "type": "array"
          },
          "filtered_cache": {
            "description": "Filter attributes with regex from being added to the cache, this prevents the attribute from being in the published payload when the value didn't change.",
            "examples": [
              "^input_actions$"
            ],
            "items": {
              "type": "string"
            },
            "title": "Filtered attributes from cache",
            "type": "array"
          },
          "filtered_optimistic": {
            "description": "Filter attributes with regex from optimistic publish payload when calling /set. (This has no effect if optimistic is set to false).",
            "examples": [
              "^color_(mode|temp)$",
              "color"
            ],
            "items": {
              "type": "string"
            },
            "title": "Filtered optimistic attributes",
            "type": "array"
          },
          "friendly_name": {
            "description": "Used in the MQTT topic of a device. By default this is the device ID",
            "readOnly": true,
            "title": "Friendly name",
            "type": "string"
          },
          "homeassistant": {
            "properties": {
              "name": {
                "description": "Name of the device in Home Assistant",
                "title": "Home Assistant name",
                "type": "string"
              }
            },
            "title": "Home Assistant",
            "type": [
              "object",
              "null"
            ]
          },
          "icon": {
            "description": "The user-defined device icon for the frontend. It can be a full URL link to an image (e.g. https://SOME.SITE/MODEL123.jpg) (you cannot use a path to a local file) or base64 encoded data URL (e.g. image/svg+xml;base64,PHN2ZyB3aW....R0aD)",
            "title": "Icon",
            "type": "string"
          },
          "optimistic": {
            "default": true,
            "description": "Publish optimistic state after set",
            "title": "Optimistic",
            "type": "boolean"
          },
          "qos": {
            "description": "QoS level for MQTT messages of this device",
            "title": "QoS",
            "type": "number"
          },
          "retain": {
            "description": "Retain MQTT messages of this device",
            "title": "Retain",
            "type": "boolean"
          },
          "retention": {
            "description": "Sets the MQTT Message Expiry in seconds, Make sure to set mqtt.version to 5",
            "title": "Retention",
            "type": "number"
          }
        },
        "required": [
          "friendly_name"
        ],
        "type": "object"
      },
      "group": {
        "properties": {
          "devices": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "filtered_attributes": {
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "friendly_name": {
            "type": "string"
          },
          "off_state": {
            "default": "auto",
            "description": "Control when to publish state OFF for a group. 'all_members_off': only publish state OFF when all group members are in state OFF, 'last_member_state': publish state OFF whenever one of its members changes to OFF",
            "enum": [
              "all_members_off",
              "last_member_state"
            ],
            "requiresRestart": true,
            "title": "Group off state",
            "type": [
              "string"
            ]
          },
          "optimistic": {
            "type": "boolean"
          },
          "qos": {
            "type": "number"
          },
          "retain": {
            "type": "boolean"
          }
        },
        "required": [
          "friendly_name"
        ],
        "type": "object"
      }
    },
    "properties": {
      "advanced": {
        "properties": {
          "adapter_concurrent": {
            "description": "Adapter concurrency (e.g. 2 for CC2531 or 16 for CC26X2R1) (default: null, uses recommended value)",
            "requiresRestart": true,
            "title": "Adapter concurrency",
            "type": [
              "number",
              "null"
            ]
          },
          "adapter_delay": {
            "description": "Adapter delay",
            "requiresRestart": true,
            "title": "Adapter delay",
            "type": [
              "number",
              "null"
            ]
          },
          "cache_state": {
            "default": true,
            "description": "MQTT message payload will contain all attributes, not only changed ones. Has to be true when integrating via Home Assistant",
            "title": "Cache state",
            "type": "boolean"
          },
          "cache_state_persistent": {
            "default": true,
            "description": "Persist cached state, only used when cache_state: true",
            "title": "Persist cache state",
            "type": "boolean"
          },
          "cache_state_send_on_startup": {
            "default": true,
            "description": "Send cached state on startup, only used when cache_state: true",
            "title": "Send cached state on startup",
            "type": "boolean"
          },
          "channel": {
            "default": 11,
            "description": "Zigbee channel, changing requires repairing all devices! (Note: use a ZLL channel: 11, 15, 20, or 25 to avoid Problems)",
            "examples": [
              15,
              20,
              25
            ],
            "maximum": 26,
            "minimum": 11,
            "requiresRestart": true,
            "title": "ZigBee channel",
            "type": "number"
          },
          "elapsed": {
            "default": false,
            "description": "Add an elapsed attribute to MQTT messages, contains milliseconds since the previous msg",
            "title": "Elapsed",
            "type": "boolean"
          },
          "ext_pan_id": {
            "description": "Zigbee extended pan ID, changing requires repairing all devices!",
            "oneOf": [
              {
                "title": "Extended pan ID (string)",
                "type": "string"
              },
              {
                "items": {
                  "type": "number"
                },
                "title": "Extended pan ID (array)",
                "type": "array"
              }
            ],
            "requiresRestart": true,
            "title": "Ext Pan ID"
          },
          "last_seen": {
            "default": "disable",
            "description": "Add a last_seen attribute to MQTT messages, contains date/time of last Zigbee message",
            "enum": [
              "disable",
              "ISO_8601",
              "ISO_8601_local",
              "epoch"
            ],
            "title": "Last seen",
            "type": "string"
          },
          "legacy_api": {
            "default": true,
            "description": "Disables the legacy api (false = disable)",
            "requiresRestart": true,
            "title": "Legacy API",
            "type": "boolean"
          },
          "legacy_availability_payload": {
            "default": true,
            "description": "Payload to be used for device availability and bridge/state topics. true = text, false = JSON",
            "requiresRestart": true,
            "title": "Legacy availability payload",
            "type": "boolean"
          },
          "log_directory": {
            "description": "Location of log directory",
            "examples": [
              "data/log/%TIMESTAMP%"
            ],
            "requiresRestart": true,
            "title": "Log directory",
            "type": "string"
          },
          "log_file": {
            "default": "log.txt",
            "description": "Log file name, can also contain timestamp",
            "examples": [
              "zigbee2mqtt_%TIMESTAMP%.log"
            ],
            "requiresRestart": true,
            "title": "Log file",
            "type": "string"
          },
          "log_level": {
            "default": "info",
            "description": "Logging level",
            "enum": [
              "info",
              "warn",
              "error",
              "debug"
            ],
            "title": "Log level",
            "type": "string"
          },
          "log_output": {
            "description": "Output location of the log, leave empty to suppress logging",
            "items": {
              "enum": [
                "console",
                "file",
                "syslog"
              ],
              "type": "string"
            },
            "requiresRestart": true,
            "title": "Log output",
            "type": "array"
          },
          "log_rotation": {
            "default": true,
            "description": "Log rotation",
            "requiresRestart": true,
            "title": "Log rotation",
            "type": "boolean"
          },
          "log_symlink_current": {
            "default": false,
            "description": "Create symlink to current logs in the log directory",
            "requiresRestart": true,
            "title": "Log symlink current",
            "type": "boolean"
          },
          "log_syslog": {
            "properties": {
              "app_name": {
                "default": "Zigbee2MQTT",
                "description": "The name of the application (Default: Zigbee2MQTT).",
                "title": "Localhost",
                "type": "string"
              },
              "eol": {
                "default": "/n",
                "description": "The end of line character to be added to the end of the message (Default: Message without modifications).",
                "title": "eol",
                "type": "string"
              },
              "host": {
                "default": "localhost",
                "description": "The host running syslogd, defaults to localhost.",
                "title": "Host",
                "type": "string"
              },
              "localhost": {
                "default": "localhost",
                "description": "Host to indicate that log messages are coming from (Default: localhost).",
                "title": "Localhost",
                "type": "string"
              },
              "path": {
                "default": "/dev/log",
                "description": "The path to the syslog dgram socket (i.e. /dev/log or /var/run/syslog for OS X).",
                "examples": [
                  "/var/run/syslog"
                ],
                "title": "Path",
                "type": "string"
              },
              "pid": {
                "default": "process.pid",
                "description": "PID of the process that log messages are coming from (Default process.pid).",
                "title": "PID",
                "type": "string"
              },
              "port": {
                "default": 514,
                "description": "The port on the host that syslog is running on, defaults to syslogd's default port.",
                "title": "Port",
                "type": "number"
              },
              "protocol": {
                "default": "udp4",
                "description": "The network protocol to log over (e.g. tcp4, udp4, tls4, unix, unix-connect, etc).",
                "examples": [
                  "udp4",
                  "tls4",
                  "unix",
                  "unix-connect"
                ],
                "title": "Protocol",
                "type": "string"
              },
              "type": {
                "default": "5424",
                "description": "The type of the syslog protocol to use (Default: BSD, also valid: 5424).",
                "title": "Type",
                "type": "string"
              }
            },
            "title": "syslog",
            "type": "object"
          },
          "network_key": {
            "description": "Network encryption key, changing requires repairing all devices!",
            "oneOf": [
              {
                "title": "Network key(string)",
                "type": "string"
              },
              {
                "items": {
                  "type": "number"
                },
                "title": "Network key(array)",
                "type": "array"
              }
            ],
            "requiresRestart": true,
            "title": "Network key"
          },
          "output": {
            "description": "Examples when 'state' of a device is published json: topic: 'zigbee2mqtt/my_bulb' payload '{\"state\": \"ON\"}' attribute: topic 'zigbee2mqtt/my_bulb/state' payload 'ON' attribute_and_json: both json and attribute (see above)",
            "enum": [
              "attribute_and_json",
              "attribute",
              "json"
            ],
            "title": "MQTT output type",
            "type": "string"
          },
          "pan_id": {
            "description": "ZigBee pan ID, changing requires repairing all devices!",
            "oneOf": [
              {
                "title": "Pan ID (string)",
                "type": "string"
              },
              {
                "title": "Pan ID (number)",
                "type": "number"
              }
            ],
            "requiresRestart": true,
            "title": "Pan ID"
          },
          "timestamp_format": {
            "description": "Log timestamp format",
            "examples": [
              "YYYY-MM-DD HH:mm:ss"
            ],
            "requiresRestart": true,
            "title": "Timestamp format",
            "type": "string"
          },
          "transmit_power": {
            "description": "Transmit power of adapter, only available for Z-Stack (CC253*/CC2652/CC1352) adapters, CC2652 = 5dbm, CC1352 max is = 20dbm (5dbm default)",
            "requiresRestart": true,
            "title": "Transmit power",
            "type": [
              "number",
              "null"
            ]
          }
        },
        "title": "Advanced",
        "type": "object"
      },
      "availability": {
        "description": "Checks whether devices are online/offline",
        "oneOf": [
          {
            "title": "Availability (simple)",
            "type": "boolean"
          },
          {
            "properties": {
              "active": {
                "description": "Options for active devices (routers/mains powered)",
                "properties": {
                  "timeout": {
                    "default": 10,
                    "description": "Time after which an active device will be marked as offline in minutes",
                    "requiresRestart": true,
                    "title": "Timeout",
                    "type": "number"
                  }
                },
                "requiresRestart": true,
                "title": "Active",
                "type": "object"
              },
              "passive": {
                "description": "Options for passive devices (mostly battery powered)",
                "properties": {
                  "timeout": {
                    "default": 1500,
                    "description": "Time after which an passive device will be marked as offline in minutes",
                    "requiresRestart": true,
                    "title": "Timeout",
                    "type": "number"
                  }
                },
                "requiresRestart": true,
                "title": "Passive",
                "type": "object"
              }
            },
            "title": "Availability (advanced)",
            "type": "object"
          }
        ],
        "requiresRestart": true,
        "title": "Availability"
      },
      "ban": {
        "items": {
          "type": "string"
        },
        "readOnly": true,
        "requiresRestart": true,
        "title": "Ban (deprecated, use blocklist)",
        "type": "array"
      },
      "blocklist": {
        "description": "Block devices from the network (by ieeeAddr)",
        "items": {
          "type": "string"
        },
        "requiresRestart": true,
        "title": "Blocklist",
        "type": "array"
      },
      "device_options": {
        "title": "Options that are applied to all devices",
        "type": "object"
      },
      "devices": {
        "patternProperties": {
          "^.*$": {
            "$ref": "#/definitions/device"
          }
        },
        "propertyNames": {
          "pattern": "^0x[\\d\\w]{16}$"
        },
        "type": "object"
      },
      "external_converters": {
        "description": "You can define external converters to e.g. add support for a DiY device",
        "examples": [
          "DIYRuZ_FreePad.js"
        ],
        "items": {
          "type": "string"
        },
        "requiresRestart": true,
        "title": "External converters",
        "type": "array"
      },
      "frontend": {
        "oneOf": [
          {
            "title": "Frontend (simple)",
            "type": "boolean"
          },
          {
            "properties": {
              "auth_token": {
                "description": "Enables authentication, disabled by default",
                "requiresRestart": true,
                "title": "Auth token",
                "type": [
                  "string",
                  "null"
                ]
              },
              "host": {
                "default": "0.0.0.0",
                "description": "Frontend binding host. Binds to a unix socket when an absolute path is given instead.",
                "examples": [
                  "127.0.0.1",
                  "/run/zigbee2mqtt/zigbee2mqtt.sock"
                ],
                "requiresRestart": true,
                "title": "Bind host",
                "type": "string"
              },
              "port": {
                "default": 8080,
                "description": "Frontend binding port. Ignored when using a unix domain socket",
                "requiresRestart": true,
                "title": "Port",
                "type": "number"
              },
              "ssl_cert": {
                "description": "SSL Certificate file path for exposing HTTPS. The sibling property 'ssl_key' must be set for HTTPS to be activated.",
                "requiresRestart": true,
                "title": "Certificate file path",
                "type": [
                  "string",
                  "null"
                ]
              },
              "ssl_key": {
                "description": "SSL key file path for exposing HTTPS. The sibling property 'ssl_cert' must be set for HTTPS to be activated.",
                "requiresRestart": true,
                "title": "key file path",
                "type": [
                  "string",
                  "null"
                ]
              },
              "url": {
                "description": "URL on which the frontend can be reached, currently only used for the Home Assistant device configuration page",
                "requiresRestart": true,
                "title": "URL",
                "type": [
                  "string",
                  "null"
                ]
              }
            },
            "title": "Frontend (advanced)",
            "type": "object"
          }
        ],
        "requiresRestart": true,
        "title": "Frontend"
      },
      "groups": {
        "patternProperties": {
          "^.*$": {
            "$ref": "#/definitions/group"
          }
        },
        "propertyNames": {
          "pattern": "^[\\w].*$"
        },
        "type": "object"
      },
      "homeassistant": {
        "default": false,
        "description": "Home Assistant integration (MQTT discovery)",
        "oneOf": [
          {
            "title": "Home Assistant (simple)",
            "type": "boolean"
          },
          {
            "properties": {
              "discovery_topic": {
                "description": "Home Assistant discovery topic",
                "examples": [
                  "homeassistant"
                ],
                "requiresRestart": true,
                "title": "Homeassistant discovery topic",
                "type": "string"
              },
              "legacy_entity_attributes": {
                "default": true,
                "description": "Home Assistant legacy entity attributes, when enabled Zigbee2MQTT will add state attributes to each entity, additional to the separate entities and devices it already creates",
                "title": "Home Assistant legacy entity attributes",
                "type": "boolean"
              },
              "legacy_triggers": {
                "default": true,
                "description": "Home Assistant legacy triggers, when enabled Zigbee2mqt will send an empty 'action' or 'click' after one has been send. A 'sensor_action' and 'sensor_click' will be discoverd",
                "title": "Home Assistant legacy triggers",
                "type": "boolean"
              },
              "status_topic": {
                "description": "Home Assistant status topic",
                "examples": [
                  "homeassistant/status"
                ],
                "requiresRestart": true,
                "title": "Home Assistant status topic",
                "type": "string"
              }
            },
            "title": "Home Assistant (advanced)",
            "type": "object"
          }
        ],
        "requiresRestart": true,
        "title": "Home Assistant integration"
      },
      "map_options": {
        "properties": {
          "graphviz": {
            "properties": {
              "colors": {
                "properties": {
                  "fill": {
                    "properties": {
                      "coordinator": {
                        "type": "string"
                      },
                      "enddevice": {
                        "type": "string"
                      },
                      "router": {
                        "type": "string"
                      }
                    },
                    "type": "object"
                  },
                  "font": {
                    "properties": {
                      "coordinator": {
                        "type": "string"
                      },
                      "enddevice": {
                        "type": "string"
                      },
                      "router": {
                        "type": "string"
                      }
                    },
                    "type": "object"
                  },
                  "line": {
                    "properties": {
                      "active": {
                        "type": "string"
                      },
                      "inactive": {
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                },
                "type": "object"
              }
            },
            "type": "object"
          }
        },
        "title": "Networkmap",
        "type": "object"
      },
      "mqtt": {
        "properties": {
          "base_topic": {
            "default": "zigbee2mqtt",
            "description": "MQTT base topic for Zigbee2MQTT MQTT messages",
            "examples": [
              "zigbee2mqtt"
            ],
            "requiresRestart": true,
            "title": "Base topic",
            "type": "string"
          },
          "ca": {
            "description": "Absolute path to SSL/TLS certificate of CA used to sign server and client certificates",
            "examples": [
              "/etc/ssl/mqtt-ca.crt"
            ],
            "requiresRestart": true,
            "title": "Certificate authority",
            "type": "string"
          },
          "cert": {
            "description": "Absolute path to SSL/TLS certificate for client-authentication",
            "examples": [
              "/etc/ssl/mqtt-client.crt"
            ],
            "requiresRestart": true,
            "title": "SSL/TLS certificate",
            "type": "string"
          },
          "client_id": {
            "description": "MQTT client ID",
            "examples": [
              "MY_CLIENT_ID"
            ],
            "requiresRestart": true,
            "title": "Client ID",
            "type": "string"
          },
          "force_disable_retain": {
            "default": false,
            "description": "Disable retain for all send messages. ONLY enable if you MQTT broker doesn't support retained message (e.g. AWS IoT core, Azure IoT Hub, Google Cloud IoT core, IBM Watson IoT Platform). Enabling will break the Home Assistant integration",
            "requiresRestart": true,
            "title": "Force disable retain",
            "type": "boolean"
          },
          "include_device_information": {
            "default": false,
            "description": "Include device information to mqtt messages",
            "title": "Include device information",
            "type": "boolean"
          },
          "keepalive": {
            "default": 60,
            "description": "MQTT keepalive in second",
            "requiresRestart": true,
            "title": "Keepalive",
            "type": "number"
          },
          "key": {
            "description": "Absolute path to SSL/TLS key for client-authentication",
            "examples": [
              "/etc/ssl/mqtt-client.key"
            ],
            "requiresRestart": true,
            "title": "SSL/TLS key",
            "type": "string"
          },
          "password": {
            "description": "MQTT server authentication password",
            "examples": [
              "ILOVEPELMENI"
            ],
            "requiresRestart": true,
            "title": "Password",
            "type": "string"
          },
          "reject_unauthorized": {
            "default": true,
            "description": "Disable self-signed SSL certificate",
            "requiresRestart": true,
            "title": "Reject unauthorized",
            "type": "boolean"
          },
          "server": {
            "description": "MQTT server URL (use mqtts:// for SSL/TLS connection)",
            "examples": [
              "mqtt://localhost:1883"
            ],
            "requiresRestart": true,
            "title": "MQTT server",
            "type": "string"
          },
          "user": {
            "description": "MQTT server authentication user",
            "examples": [
              "johnnysilverhand"
            ],
            "requiresRestart": true,
            "title": "User",
            "type": "string"
          },
          "version": {
            "default": 4,
            "description": "MQTT protocol version",
            "examples": [
              5
            ],
            "requiresRestart": true,
            "title": "Version",
            "type": [
              "number",
              "null"
            ]
          }
        },
        "required": [
          "server"
        ],
        "title": "MQTT",
        "type": "object"
      },
      "ota": {
        "properties": {
          "disable_automatic_update_check": {
            "default": false,
            "description": "Zigbee devices may request a firmware update, and do so frequently, causing Zigbee2MQTT to reach out to third party servers. If you disable these device initiated checks, you can still initiate a firmware update check manually.",
            "title": "Disable automatic update check",
            "type": "boolean"
          },
          "ikea_ota_use_test_url": {
            "default": false,
            "description": "Use IKEA TRADFRI OTA test server, see OTA updates documentation",
            "requiresRestart": true,
            "title": "IKEA TRADFRI OTA use test url",
            "type": "boolean"
          },
          "update_check_interval": {
            "default": 1440,
            "description": "Your device may request a check for a new firmware update. This value determines how frequently third party servers may actually be contacted to look for firmware updates. The value is set in minutes, and the default is 1 day.",
            "title": "Update check interval",
            "type": "number"
          },
          "zigbee_ota_override_index_location": {
            "description": "Location of override OTA index file",
            "examples": [
              "index.json"
            ],
            "requiresRestart": true,
            "title": "OTA index override file name",
            "type": "string"
          }
        },
        "title": "OTA updates",
        "type": "object"
      },
      "passlist": {
        "description": "Allow only certain devices to join the network (by ieeeAddr). Note that all devices not on the passlist will be removed from the network!",
        "items": {
          "type": "string"
        },
        "requiresRestart": true,
        "title": "Passlist",
        "type": "array"
      },
      "permit_join": {
        "default": false,
        "description": "Allow new devices to join (re-applied at restart)",
        "title": "Permit join",
        "type": "boolean"
      },
      "serial": {
        "properties": {
          "adapter": {
            "default": "auto",
            "description": "Adapter type, not needed unless you are experiencing problems",
            "enum": [
              "deconz",
              "zstack",
              "zigate",
              "ezsp",
              "auto"
            ],
            "requiresRestart": true,
            "title": "Adapter",
            "type": [
              "string"
            ]
          },
          "baudrate": {
            "description": "Baud rate speed for serial port, this can be anything firmware support but default is 115200 for Z-Stack and EZSP, 38400 for Deconz, however note that some EZSP firmware need 57600",
            "examples": [
              38400,
              57600,
              115200
            ],
            "requiresRestart": true,
            "title": "Baudrate",
            "type": "number"
          },
          "disable_led": {
            "default": false,
            "description": "Disable LED of the adapter if supported",
            "requiresRestart": true,
            "title": "Disable led",
            "type": "boolean"
          },
          "port": {
            "description": "Location of the adapter. To autodetect the port, set null",
            "examples": [
              "/dev/ttyACM0"
            ],
            "requiresRestart": true,
            "title": "Port",
            "type": [
              "string",
              "null"
            ]
          },
          "rtscts": {
            "description": "RTS / CTS Hardware Flow Control for serial port",
            "requiresRestart": true,
            "title": "RTS / CTS",
            "type": "boolean"
          }
        },
        "title": "Serial",
        "type": "object"
      },
      "whitelist": {
        "items": {
          "type": "string"
        },
        "readOnly": true,
        "requiresRestart": true,
        "title": "Whitelist (deprecated, use passlist)",
        "type": "array"
      }
    },
    "required": [
      "mqtt"
    ],
    "type": "object"
  },
  "coordinator": {
    "ieee_address": "0xe0798dfffec7b6bc",
    "meta": {
      "maintrel": "3 ",
      "majorrel": "6",
      "minorrel": "10",
      "product": 8,
      "revision": "6.10.3.0 build 297"
    },
    "type": "EZSP v8"
  },
  "log_level": "info",
  "network": {
    "channel": 11,
    "extended_pan_id": 221,
    "pan_id": 6754
  },
  "permit_join": true,
  "restart_required": false,
  "version": "1.33.2",
  "zigbee_herdsman": {
    "version": "0.21.0"
  },
  "zigbee_herdsman_converters": {
    "version": "15.106.0"
  }
}
```

4. zigbee2mqtt/bridge/devices

```json
{
  "0": {
    "definition": null,
    "disabled": false,
    "endpoints": {
      "1": {
        "bindings": [],
        "clusters": {
          "input": [
            "genBasic",
            "genIdentify",
            "genOnOff",
            "genTime",
            "genOta",
            "26",
            "lightingColorCtrl"
          ],
          "output": [
            "genBasic",
            "genIdentify",
            "genGroups",
            "genScenes",
            "genOnOff",
            "genLevelCtrl",
            "genPollCtrl",
            "lightingColorCtrl",
            "msIlluminanceMeasurement",
            "msTemperatureMeasurement",
            "msRelativeHumidity",
            "msOccupancySensing",
            "ssIasZone",
            "haMeterIdentification",
            "haApplianceStatistics",
            "haElectricalMeasurement",
            "seMetering",
            "touchlink",
            "manuSpecificUbisysDimmerSetup",
            "manuSpecificSamsungAccelerometer"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      },
      "242": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": [
            "greenPower"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      }
    },
    "friendly_name": "Coordinator",
    "ieee_address": "0xe0798dfffec7b6bc",
    "interview_completed": true,
    "interviewing": false,
    "network_address": 0,
    "supported": false,
    "type": "Coordinator"
  },
  "1": {
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
  },
  "2": {
    "definition": {
      "description": "MiJia wireless switch",
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
          "description": "Triggered action (e.g. a button click)",
          "label": "Action",
          "name": "action",
          "property": "action",
          "type": "enum",
          "values": [
            "single",
            "double",
            "triple",
            "quadruple",
            "hold",
            "release",
            "many"
          ]
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
      "model": "WXKG01LM",
      "options": [
        {
          "access": 2,
          "description": "The WXKG01LM only reports a button press and release.By default, a hold action is published when there is at least 1000 ms between both events. It could be that due to delays in the network the release message is received late. This causes a single click to be identified as a hold action. If you are experiencing this you can try experimenting with this option (e.g. set it to 2000) (value is in ms).",
          "label": "Hold timeout",
          "name": "hold_timeout",
          "property": "hold_timeout",
          "type": "numeric",
          "value_min": 0
        },
        {
          "access": 2,
          "description": "Sometimes it happens that the button does not send a release. To avoid problems a release is automatically send after a timeout. The default timeout is 4000 ms, you can increase it with this option (value is in ms).",
          "label": "Hold timeout expire",
          "name": "hold_timeout_expire",
          "property": "hold_timeout_expire",
          "type": "numeric",
          "value_min": 0
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
      }
    },
    "friendly_name": "Office Desk Switch",
    "ieee_address": "0x00158d00033e8db4",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_switch",
    "network_address": 49713,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "3": {
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
  },
  "4": {
    "date_code": "07-01-2020",
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
    "friendly_name": "Bathroom Mirror Light",
    "ieee_address": "0x00158d000446a373",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.light.aqcn02",
    "network_address": 22925,
    "power_source": "DC Source",
    "software_build_id": "1.31\u0000",
    "supported": true,
    "type": "Router"
  },
  "5": {
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
    "friendly_name": "Hallway Motion Sensor",
    "ieee_address": "0x00158d00041132a4",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_motion.aq2",
    "network_address": 44397,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "6": {
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
    "friendly_name": "Kitchen Motion Sensor",
    "ieee_address": "0x00158d00044c95de",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_motion.aq2",
    "network_address": 42227,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "7": {
    "date_code": "07-01-2020",
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
    "friendly_name": "Hallway Light",
    "ieee_address": "0x00158d0004112e6f",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.light.aqcn02",
    "network_address": 2045,
    "power_source": "DC Source",
    "software_build_id": "1.31\u0000",
    "supported": true,
    "type": "Router"
  },
  "8": {
    "date_code": "07-01-2020",
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
    "friendly_name": "Bedroom Desk Light",
    "ieee_address": "0x00158d0002b7d6be",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.light.aqcn02",
    "network_address": 49743,
    "power_source": "DC Source",
    "software_build_id": "1.31\u0000",
    "supported": true,
    "type": "Router"
  },
  "9": {
    "definition": {
      "description": "MiJia wireless switch",
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
          "description": "Triggered action (e.g. a button click)",
          "label": "Action",
          "name": "action",
          "property": "action",
          "type": "enum",
          "values": [
            "single",
            "double",
            "triple",
            "quadruple",
            "hold",
            "release",
            "many"
          ]
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
      "model": "WXKG01LM",
      "options": [
        {
          "access": 2,
          "description": "The WXKG01LM only reports a button press and release.By default, a hold action is published when there is at least 1000 ms between both events. It could be that due to delays in the network the release message is received late. This causes a single click to be identified as a hold action. If you are experiencing this you can try experimenting with this option (e.g. set it to 2000) (value is in ms).",
          "label": "Hold timeout",
          "name": "hold_timeout",
          "property": "hold_timeout",
          "type": "numeric",
          "value_min": 0
        },
        {
          "access": 2,
          "description": "Sometimes it happens that the button does not send a release. To avoid problems a release is automatically send after a timeout. The default timeout is 4000 ms, you can increase it with this option (value is in ms).",
          "label": "Hold timeout expire",
          "name": "hold_timeout_expire",
          "property": "hold_timeout_expire",
          "type": "numeric",
          "value_min": 0
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
      }
    },
    "friendly_name": "Bedroom Desk Switch",
    "ieee_address": "0x00158d000122604e",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_switch",
    "network_address": 31680,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "10": {
    "date_code": "07-01-2020",
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
    "friendly_name": "Light 1",
    "ieee_address": "0x00158d0004112e41",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.light.aqcn02",
    "network_address": 5217,
    "power_source": "DC Source",
    "software_build_id": "1.31\u0000",
    "supported": true,
    "type": "Router"
  },
  "11": {
    "definition": {
      "description": "MiJia human body movement sensor",
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
          "description": "Voltage of the battery in millivolts",
          "label": "Voltage",
          "name": "voltage",
          "property": "voltage",
          "type": "numeric",
          "unit": "mV"
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
      "model": "RTCGQ01LM",
      "options": [
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
    "friendly_name": "Motion Sensor 1",
    "ieee_address": "0x00158d0001a9ec71",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_motion",
    "network_address": 23189,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "12": {
    "definition": {
      "description": "Aqara wireless switch",
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
          "description": "Triggered action (e.g. a button click)",
          "label": "Action",
          "name": "action",
          "property": "action",
          "type": "enum",
          "values": [
            "single",
            "double",
            "triple",
            "quadruple",
            "hold",
            "release"
          ]
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
          "description": "Number of power outages (since last pairing)",
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
      "model": "WXKG11LM",
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
      }
    },
    "friendly_name": "Square Switch",
    "ieee_address": "0x00158d000204a3e1",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_switch.aq2",
    "network_address": 55709,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "13": {
    "date_code": "12-20-2019",
    "definition": {
      "description": "Mi power plug ZigBee",
      "exposes": [
        {
          "features": [
            {
              "access": 7,
              "description": "On/off state of the switch",
              "label": "State",
              "name": "state",
              "property": "state",
              "type": "binary",
              "value_off": "OFF",
              "value_on": "ON",
              "value_toggle": "TOGGLE"
            }
          ],
          "type": "switch"
        },
        {
          "access": 5,
          "description": "Instantaneous measured power",
          "label": "Power",
          "name": "power",
          "property": "power",
          "type": "numeric",
          "unit": "W"
        },
        {
          "access": 1,
          "description": "Sum of consumed energy",
          "label": "Energy",
          "name": "energy",
          "property": "energy",
          "type": "numeric",
          "unit": "kWh"
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
          "access": 7,
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
      "model": "ZNCZ02LM",
      "options": [
        {
          "access": 2,
          "description": "State actions will also be published as 'action' when true (default false).",
          "label": "State action",
          "name": "state_action",
          "property": "state_action",
          "type": "binary",
          "value_off": false,
          "value_on": true
        },
        {
          "access": 2,
          "description": "Calibrates the power value (percentual offset), takes into effect on next report of device.",
          "label": "Power calibration",
          "name": "power_calibration",
          "property": "power_calibration",
          "type": "numeric"
        },
        {
          "access": 2,
          "description": "Number of digits after decimal point for power, takes into effect on next report of device.",
          "label": "Power precision",
          "name": "power_precision",
          "property": "power_precision",
          "type": "numeric",
          "value_max": 3,
          "value_min": 0
        },
        {
          "access": 2,
          "description": "Calibrates the energy value (percentual offset), takes into effect on next report of device.",
          "label": "Energy calibration",
          "name": "energy_calibration",
          "property": "energy_calibration",
          "type": "numeric"
        },
        {
          "access": 2,
          "description": "Number of digits after decimal point for energy, takes into effect on next report of device.",
          "label": "Energy precision",
          "name": "energy_precision",
          "property": "energy_precision",
          "type": "numeric",
          "value_max": 3,
          "value_min": 0
        },
        {
          "access": 2,
          "description": "Calibrates the device_temperature value (absolute offset), takes into effect on next report of device.",
          "label": "Device temperature calibration",
          "name": "device_temperature_calibration",
          "property": "device_temperature_calibration",
          "type": "numeric"
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
            "genOnOff",
            "genBinaryOutput",
            "genScenes",
            "genTime",
            "genPowerCfg",
            "genDeviceTempCfg"
          ],
          "output": [
            "genOta",
            "genTime"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      },
      "2": {
        "bindings": [],
        "clusters": {
          "input": [
            "genAnalogInput"
          ],
          "output": [
            "genAnalogInput",
            "genGroups"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      },
      "3": {
        "bindings": [],
        "clusters": {
          "input": [
            "genAnalogInput"
          ],
          "output": [
            "genAnalogInput"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      }
    },
    "friendly_name": "Plug",
    "ieee_address": "0x00158d0001db18f9",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.plug",
    "network_address": 63376,
    "power_source": "Mains (single phase)",
    "supported": true,
    "type": "Router"
  },
  "14": {
    "definition": {
      "description": "Aqara double key wireless wall switch (2018 model)",
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
          "description": "Triggered action (e.g. a button click)",
          "label": "Action",
          "name": "action",
          "property": "action",
          "type": "enum",
          "values": [
            "single_left",
            "single_right",
            "single_both",
            "double_left",
            "double_right",
            "double_both",
            "hold_left",
            "hold_right",
            "hold_both"
          ]
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
      "model": "WXKG02LM_rev2",
      "options": [
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
    "friendly_name": "Wall Switch 1",
    "ieee_address": "0x00158d0004094a88",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.remote.b286acn01",
    "network_address": 60222,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "15": {
    "definition": {
      "description": "Aqara double key wireless wall switch (2018 model)",
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
          "description": "Triggered action (e.g. a button click)",
          "label": "Action",
          "name": "action",
          "property": "action",
          "type": "enum",
          "values": [
            "single_left",
            "single_right",
            "single_both",
            "double_left",
            "double_right",
            "double_both",
            "hold_left",
            "hold_right",
            "hold_both"
          ]
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
      "model": "WXKG02LM_rev2",
      "options": [
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
      }
    },
    "friendly_name": "Wall Switch 2",
    "ieee_address": "0x00158d0004247d98",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.remote.b286acn01",
    "network_address": 748,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "17": {
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
    "friendly_name": "Living Room temperature, humidity and pressure sensor",
    "ieee_address": "0x00158d00040726f1",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.weather",
    "network_address": 9723,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "18": {
    "definition": {
      "description": "Aqara water leak sensor",
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
          "description": "Indicates whether the device detected a water leak",
          "label": "Water leak",
          "name": "water_leak",
          "property": "water_leak",
          "type": "binary",
          "value_off": false,
          "value_on": true
        },
        {
          "access": 1,
          "description": "Indicates if the battery of this device is almost empty",
          "label": "Battery low",
          "name": "battery_low",
          "property": "battery_low",
          "type": "binary",
          "value_off": false,
          "value_on": true
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
      "model": "SJCGQ11LM",
      "options": [
        {
          "access": 2,
          "description": "Calibrates the device_temperature value (absolute offset), takes into effect on next report of device.",
          "label": "Device temperature calibration",
          "name": "device_temperature_calibration",
          "property": "device_temperature_calibration",
          "type": "numeric"
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
    "friendly_name": "Bathroom leak sensor",
    "ieee_address": "0x00158d000405cfee",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_wleak.aq1",
    "network_address": 37428,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "19": {
    "definition": {
      "description": "MiJia door & window contact sensor",
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
          "description": "Indicates if the contact is closed (= true) or open (= false)",
          "label": "Contact",
          "name": "contact",
          "property": "contact",
          "type": "binary",
          "value_off": true,
          "value_on": false
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
      "model": "MCCGQ01LM",
      "options": [],
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
    "friendly_name": "Door Sensor",
    "ieee_address": "0x00158d000122fcd1",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "LUMI",
    "model_id": "lumi.sensor_magnet",
    "network_address": 56078,
    "power_source": "Battery",
    "supported": true,
    "type": "EndDevice"
  },
  "20": {
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
}
```

zigbee2mqtt/bridge/groups
zigbee2mqtt/bridge/extensions
zigbee2mqtt/bridge/config

```json
{
  "commit": "9996c93",
  "coordinator": {
    "meta": {
      "maintrel": "3 ",
      "majorrel": "6",
      "minorrel": "10",
      "product": 8,
      "revision": "6.10.3.0 build 297"
    },
    "type": "EZSP v8"
  },
  "log_level": "info",
  "network": {
    "channel": 11,
    "extendedPanID": 221,
    "panID": 6754
  },
  "permit_join": true,
  "version": "1.33.2"
}
```
zigbee2mqtt/Bedroom Desk Light 
```json

```
zigbee2mqtt/Living Room temperature, humidity and pressure sensor {"battery":100,"humidity":44.43,"linkquality":152,"power_outage_count":1616,"pressure":957.4,"temperature":20.74,"voltage":3025}
