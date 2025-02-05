"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // Log the HTTP method and URL
    console.log("Incoming Request:", ctx.request.method, ctx.request.url);

    // Log the request body as a string
    // @ts-ignore
    console.log("Request Body:", JSON.stringify(ctx.request.body, null, 2)); // Pretty-print with indentation

    try {
      // @ts-ignore
      const { body } = ctx.request;
      const { data, to, from, bcc, subject, html } = body;

      // Here, you can send the order data to external services or databases securely
      const apiKey = process.env.STRAPI_API_KEY; // Securely access your API key from environment variables
      const PUBLIC_URL = process.env.PUBLIC_URL; // Securely access your API key from environment variables

      const response = await fetch(PUBLIC_URL + "/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert `data` to a JSON string
      });

      // Check if the response is successful (HTTP 200-299 range)
      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const responseData = await response.json(); // Parse the response body as JSON

      // Optionally, handle email confirmation here, or in a separate endpoint
      // await strapi.plugins["email"].services.email.send({
      //   to: to,
      //   from: from,
      //   bcc: bcc,
      //   subject: subject,
      //   html: html,
      // });

      return ctx.send({
        message: "Order placed successfully",
        data: responseData,
      });
    } catch (err) {
      // Log detailed error information
      console.error("Error creating order:", err.message); // Log error message
      if (err.response) {
        // Log the response from fetch if available
        console.error("Fetch error response:", err.response);
      }
      console.error("Error stack trace:", err.stack); // Log the stack trace for debugging

      return ctx.badRequest("Order creation failed: " + err.message); // Include error message in the response
    }
  },
}));
