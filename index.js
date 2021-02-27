'use strict';
const mqtt = require('async-mqtt');
const fs = require('fs');

const Executor = require('@runnerty/module-core').Executor;

class mqttExecutor extends Executor {
  constructor(process) {
    super(process);
    this.options = {};
    this.endOptions = { end: 'end' };
  }

  async exec(options) {
    this.options = options;
    //QUEUE or EXANGE is setted:
    try {
      await this.publish();
      this.end(this.endOptions);
    } catch (err) {
      this.endOptions.end = 'error';
      this.endOptions.messageLog = err.message;
      this.endOptions.err_output = err.message;
      this.end(this.endOptions);
    }
  }

  async connect() {
    const connectOptions = {
      protocol: this.options.protocol,
      hostname: this.options.hostname,
      port: this.options.port,
      username: this.options.username,
      password: this.options.password,
      keepalive: this.options.keepalive,
      reschedulePings: this.options.reschedulePings,
      clientId: this.options.clientId,
      protocolId: this.options.protocolId,
      protocolVersion: this.options.protocolVersion,
      clean: this.options.clean,
      reconnectPeriod: this.options.reconnectPeriod,
      connectTimeout: this.options.connectTimeout,
      queueQoSZero: this.options.queueQoSZero,
      rejectUnauthorized: this.options.rejectUnauthorized,
      properties: {
        sessionExpiryInterval: this.options.properties?.sessionExpiryInterval,
        receiveMaximum: this.options.properties?.receiveMaximum,
        maximumPacketSize: this.options.properties?.maximumPacketSize,
        topicAliasMaximum: this.options.properties?.topicAliasMaximum,
        requestResponseInformation: this.options.properties?.requestResponseInformation,
        userProperties: this.options.properties?.userProperties,
        authenticationMethod: this.options.properties?.authenticationMethod,
        authPacket: this.options.properties?.authPacket,
        resubscribe: this.options.properties?.resubscribe
      }
    };
    try {
      // TLS files:
      if (this.options.tlsKeyFile) {
        connectOptions.key = fs.readFileSync(this.options.tlsKeyFile);
      }
      if (this.options.tlsCertFile) {
        connectOptions.cert = fs.readFileSync(this.options.tlsCertFile);
      }
      if (this.options.tlsCAFile) {
        connectOptions.ca = fs.readFileSync(this.options.tlsCAFile);
      }
      const client = await mqtt.connectAsync(connectOptions);
      return client;
    } catch (err) {
      throw new Error(`MQTT connection error: ${err.message}`);
    }
  }

  async publish() {
    const client = await this.connect();
    try {
      await client.publish(this.options.topic, this.options.message, this.options.options);
      await client.end();
    } catch (err) {
      throw new Error(`MQTT message error. TOPIC: ${this.options.topic}, MESSAGE: ${this.options.message}. ${err}`);
    }
  }
}

module.exports = mqttExecutor;
