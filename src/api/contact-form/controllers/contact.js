module.exports = {
  async sendEmail(ctx) {
    try {
      const { to, from, subject, text } = ctx.request.body;

      await strapi.plugins["email"].services.email.send({
        to: to,
        from: from,
        subject: subject,
        text: text,
      });

      return ctx.send({ message: "Email sent successfully" });
    } catch (err) {
      console.log("Error sending email:", err);
      return ctx.badRequest("Email sending failed");
    }
  },
};
