const { get } = require("axios");
const aws = require("aws-sdk");

aws.config.update({
  region: "us-east-1",
});

module.exports = class Handler {
  constructor({ rekognitionService, translatorService }) {
    this.rekognitionService = rekognitionService;
    this.translatorService = translatorService;
  }

  async getImageBuffer(imageUrl) {
    const response = await get(imageUrl, {
      responseType: "arraybuffer",
    });

    return Buffer.from(response.data, "base64");
  }

  async detectImageLabels(buffer) {
    const result = await this.rekognitionService
      .detectLabels({
        Image: {
          Bytes: buffer,
        },
      })
      .promise();

    const workingItems = result.Labels.filter(
      ({ Confidence }) => Confidence > 80
    );

    const names = workingItems.map((item) => item.Name).join(" and ");

    return {
      names,
      workingItems,
    };
  }

  async translateText(names) {
    const params = {
      SourceLanguageCode: "en",
      TargetLanguageCode: "pt",
      Text: names,
    };

    const { TranslatedText } = await this.translatorService
      .translateText(params)
      .promise();

    return TranslatedText.split(" e ");
  }

  formatTextResults(translatedNames, workingItems) {
    return translatedNames.map((name, index) => {
      const text = ` ${workingItems[index].Confidence.toFixed(
        2
      )}% de changes de ser do tipo ${name}`;

      return text;
    });
  }

  async main(event) {
    const { imageUrl } = event.queryStringParameters;

    try {
      if (!imageUrl) {
        return {
          statusCode: 400,
          body: "An Image URL is required",
        };
      }

      const buffer = await this.getImageBuffer(imageUrl);

      const { names, workingItems } = await this.detectImageLabels(buffer);

      const translatedNames = await this.translateText(names);

      const finalText = this.formatTextResults(translatedNames, workingItems);

      return {
        statusCode: 200,
        body: `A imagem tem:${finalText}`,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Internal Server Error: " + error.message,
      };
    }
  }
};
