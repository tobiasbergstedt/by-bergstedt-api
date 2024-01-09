module.exports = {
  routes: [
    {
      method: "POST",
      path: "/contacts/send",
      handler: "contact.sendEmail",
    },
  ],
};
