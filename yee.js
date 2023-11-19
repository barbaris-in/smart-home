// Process the advertisement message as needed
//             Example of advertisement from a Yeelight device:
//                 ```
// NOTIFY * HTTP/1.1
// Host: 239.255.255.250:1982
// Cache-Control: max-age=3600
// Location: yeelight://192.168.1.41:55443
// NTS: ssdp:alive
// Server: POSIX, UPnP/1.0 YGLC/1
// id: 0x0000000008016701
// model: stripe
// fw_ver: 73
// support: get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name
// power: off
// bright: 100
// color_mode: 1
// ct: 4000
// rgb: 16777164
// hue: 60
// sat: 20
// name:
// ```

const msg =
    "NOTIFY * HTTP/1.1\n" +
    "Host: 239.255.255.250:1982\n" +
    "Cache-Control: max-age=3600\n" +
    "Location: yeelight://192.168.1.41:55443\n" +
    "NTS: ssdp:alive\n" +
    "Server: POSIX, UPnP/1.0 YGLC/1\n" +
    "id: 0x0000000008016701\n" +
    "model: stripe\n" +
    "fw_ver: 73\n" +
    "support: get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name\n" +
    "power: off\n" +
    "bright: 100\n" +
    "color_mode: 1\n" +
    "ct: 4000\n" +
    "rgb: 16777164\n" +
    "hue: 60\n" +
    "sat: 20\n" +
    "name: \n" +
    "```";
// get first word of message as message type
const msgType = msg.toString().split(" ")[0];
const location = msg.toString().match(/Location: yeelight:\/\/(.+):(\d+)/);
const ip = location[1];
const port = location[2];
// get id from message. id is the hex string after "id: " in a row starts with "id: "
const id = msg.toString().match(/id: (.+)/)[1];
const model = msg.toString().match(/model: (.+)/)[1];
console.log(model);
console.log(msgType);
console.log(id);
console.log(ip);
console.log(port);
