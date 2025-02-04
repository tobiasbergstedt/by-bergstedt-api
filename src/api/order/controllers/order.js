"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const axios = require("axios"); // You can use axios or fetch to make external requests

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    console.log("Request for by Bergstedt: " + ctx.request);
    try {
      // @ts-ignore
      const { body } = ctx.request;
      const { data, to, from, bcc, subject, html } = body;

      // Here, you can send the order data to external services or databases securely
      const apiKey = process.env.STRAPI_API_KEY; // Securely access your API key from environment variables
      const PUBLIC_URL = process.env.PUBLIC_URL; // Securely access your API key from environment variables

      const response = await axios.post(PUBLIC_URL + "/orders", data, {
        headers: {
          Authorization: `bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      // // Optionally, handle email confirmation here, or in a separate endpoint
      // await strapi.plugins["email"].services.email.send({
      //   to: to,
      //   from: from,
      //   bcc: bcc,
      //   subject: subject,
      //   html: html,
      // });

      return ctx.send({
        message: "Order placed successfully",
        data: response.data,
      });
    } catch (err) {
      // Log detailed error information
      console.error("Error creating order:", err.message); // Log error message
      if (err.response) {
        // Log the response from axios (usually contains status code and details)
        console.error("Axios error response:", err.response.data);
      }
      console.error("Error stack trace:", err.stack); // Log the stack trace for debugging

      return ctx.badRequest(err.message); // Include error message in the response
    }
  },
}));
