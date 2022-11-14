"use strict";

module.exports.main = async function (event) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Aí sim mano!",
      },
      null,
      2
    ),
  };
};
