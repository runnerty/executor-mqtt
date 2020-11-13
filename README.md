<p align="center">
  <a href="http://runnerty.io">
    <img height="257" src="https://runnerty.io/assets/header/logo-stroked.png">
  </a>
  <p align="center">Smart Processes Management</p>
</p>

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][david-badge]][david-badge-url]
<a href="#badge">
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>

# Executor for [Runnerty]: MQTT
Module MQTT Publisher.
This is a wrapper from the [MQTT.js](https://github.com/mqttjs/MQTT.js)

### Installation:
```bash
npm i @runnerty/executor-mqtt
```

### Configuration:
Add in [config.json]:
##### Simple:
```json
{
  "id": "mqtt_default",
  "type": "@runnerty-executor-mqtt",
  "hostname": "localhost"
}
```

##### All parameters:
```json
{
  "id": "mqtt_default",
  "type": "@runnerty-executor-mqtt",
  "protocol": "mqtt",
  "hostname": "localhost",
  "port": 1883,
  "username": "guest",
  "password": "pass",
  "keepalive": 60,
  "reschedulePings": true,
  "clientId": "mqttjs_@RANDOM(0, 1024, 1024)",
  "protocolId": "MQTT",
  "protocolVersion": 4,
  "clean": true,
  "reconnectPeriod": 1000,
  "connectTimeout": 30000,
  "queueQoSZero": true,
  "tlsKeyFile": "./my_cert.key",
  "tlsCertFile": "./my_cert.cert",
  "tlsCAFile": "./my_cert.ca",
  "rejectUnauthorized": false,
  "properties": {
      "sessionExpiryInterval": 3600,
      "receiveMaximum": 1024,
      "maximumPacketSize": 32,
      "topicAliasMaximum":32,
      "requestResponseInformation": true,
      "userProperties": {
        "some": "value"
      },
      "authenticationMethod": "auth_method",
      "authPacket": {
        "some": "value"
      },
      "resubscribe": true
  }
}
```

### Plan sample:
Add in [plan.json]:
##### Simple:
```json
{
  "id": "mqtt_default",
  "topic": "MY_TOPIC",
  "message": "My message from Runnerty!"
}
```

##### All parameters:

```json
{
  "id": "mqtt_default",
  "topic": "MY_TOPIC",
  "message": "My message from Runnerty!",
  "options": {
    "qos": 0,
    "retain": false,
    "dup": false,
    "properties": {
        "payloadFormatIndicator": true,
        "messageExpiryInterval": 60,
        "topicAlias": 1,
        "responseTopic": "res_topic",
        "userProperties": {
          "some": "value"
        },
        "subscriptionIdentifier": 1234,
        "contentType": "contenttype_value"
    }
  }
}

More information in MQTT [api reference](https://github.com/mqttjs/MQTT.js/#api)

### Output (Process values):
* `PROCESS_EXEC_ERR_OUTPUT`: Error output message.

[Runnerty]: http://www.runnerty.io
[downloads-image]: https://img.shields.io/npm/dm/@runnerty/executor-mqtt.svg
[npm-url]: https://www.npmjs.com/package/@runnerty/executor-mqtt
[npm-image]: https://img.shields.io/npm/v/@runnerty/executor-mqtt.svg
[david-badge]: https://david-dm.org/runnerty/executor-mqtt.svg
[david-badge-url]: https://david-dm.org/runnerty/executor-mqtt
[config.json]: http://docs.runnerty.io/config/
[plan.json]: http://docs.runnerty.io/plan/
