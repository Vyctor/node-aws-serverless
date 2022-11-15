const requestMock = require("../mocks/request.json");
const { main } = require("../../index");

describe("Image Analyser test suit", () => {
  test("it should analyze successfully the image returning the results", async () => {
    const expected = {
      statusCode: 200,
      body: "A imagem tem: 100.00% de changes de ser do tipo Cachorro, 100.00% de changes de ser do tipo canino, 100.00% de changes de ser do tipo cão, 100.00% de changes de ser do tipo animal de estimação, 100.00% de changes de ser do tipo animal, 100.00% de changes de ser do tipo mamífero, 99.78% de changes de ser do tipo Golden Retriever, 82.90% de changes de ser do tipo grama, 82.90% de changes de ser do tipo planta",
    };

    const result = await main(requestMock);

    expect(result).toStrictEqual(expected);
  });

  test("given an empty query string it should return status code 400", async () => {
    const expected = {
      statusCode: 400,
      body: "An Image URL is required",
    };

    const result = await main({
      queryStringParameters: {},
    });

    expect(result).toStrictEqual(expected);
  });

  test("given an invalid image url it should return status code 500", async () => {
    const expected = {
      statusCode: 500,
      body: "Internal Server Error: Invalid URL",
    };

    const result = await main({
      queryStringParameters: {
        imageUrl: "invalid url",
      },
    });

    expect(result).toStrictEqual(expected);
  });
});
