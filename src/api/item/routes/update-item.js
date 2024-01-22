module.exports = {
  routes: [
    {
      method: "PATCH",
      path: "/items/:uuid",
      handler: "update-item.updateItem",
    },
  ],
};
