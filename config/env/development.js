'use strict';

module.exports = {
  db: 'mongodb://fahimnew:newTesting12@ec2-35-160-199-169.us-west-2.compute.amazonaws.com:27017/material125',
  /**
  mongodb://{NEW USERNAME}:{NEW PASSWORD}@{EC2 URL}:{PORT}/dummyDB
   * Database options that will be passed directly to mongoose.connect
   * Below are some examples.
   * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
   * and http://mongoosejs.com/docs/connections.html for more information
   */
  http: {
	port: 3000,
  },
  hostname: process.env.OPENSHIFT_NODEJS_IP,
  dbOptions: {
    /*
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    },
    replset: {
      rs_name: 'myReplicaSet',
      poolSize: 5
    },
    db: {
      w: 1,
      numberOfRetries: 2
    }
    */
  },
  app: {
    name: 'Material125'
  },
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://ec2-35-160-199-169.us-west-2.compute.amazonaws.com:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://ec2-35-160-199-169.us-west-2.compute.amazonaws.com:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://ec2-35-160-199-169.us-west-2.compute.amazonaws.com:3000/auth/github/callback'
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://ec2-35-160-199-169.us-west-2.compute.amazonaws.com:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://ec2-35-160-199-169.us-west-2.compute.amazonaws.com:3000/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
