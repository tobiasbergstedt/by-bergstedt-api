module.exports = {
  async updateItem(ctx) {
    const { strapiId } = ctx.params; // Ensure the parameter is correct

    // Check if the item exists before trying to update it
    const existingProduct = await strapi.entityService.findOne(
      "api::item.item",
      strapiId
    );

    if (!existingProduct) {
      return ctx.throw(404, "Product not found"); // If the item doesn't exist, throw an error
    }

    try {
      const updatedProduct = await strapi.entityService.update(
        "api::item.item", // The name of the collection type
        strapiId, // The item ID
        { data: ctx.request.body } // The body data for the update
      );
      console.log(ctx.request.body);
      console.log(updatedProduct);
      return ctx.send(updatedProduct); // Send the updated item as a response
    } catch (error) {
      console.error("Error updating product:", error); // Log detailed error information
      return ctx.throw(500, "Internal Server Error"); // Return a 500 error if the update fails
    }
  },
};
