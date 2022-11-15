const aws = require("aws-sdk");
const Handler = require("./handler");

const rekognition = new aws.Rekognition();
const translate = new aws.Translate();

const handler = new Handler({
  rekognitionService: rekognition,
  translatorService: translate,
});

// o bind serve para assegurar que o contexto this é a instância de handler
module.exports = handler.main.bind(handler);
