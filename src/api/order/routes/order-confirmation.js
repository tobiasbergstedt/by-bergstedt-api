module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/send",
      handler: "order-confirmation.sendEmail",
    },
  ],
};
