"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      // Extract the order data from the request body
      // @ts-ignore
      const { data, to, from, bcc, subject, html } = ctx.request.body;

      // Create a new order in the database
      const newOrder = await strapi
        .service("api::order.order")
        .create({ data });

      // Return success response
      return ctx.send({
        message: "Order placed successfully",
        data: newOrder,
      });
    } catch (err) {
      // Log error details
      console.error("Error creating order:", err);

      // Return error response with detailed message
      return ctx.badRequest("Order creation failed: " + err.message);
    }
  },
}));
