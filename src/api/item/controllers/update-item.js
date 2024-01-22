module.exports = {
  async updateItem(ctx) {
    const { uuid } = ctx.params;
    const product = await strapi.entityService.update(
      "api::item.item",
      uuid,
      ctx.request.body
    );
    return product;
  },
};
