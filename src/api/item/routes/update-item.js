module.exports = {
  routes: [
    {
      method: "PATCH",
      path: "/items/:strapiId",
      handler: "update-item.updateItem",
    },
  ],
};
