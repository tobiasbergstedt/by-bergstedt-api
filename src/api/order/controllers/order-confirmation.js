module.exports = {
  async sendEmail(ctx) {
    try {
      const { to, from, bcc, subject, html } = ctx.request.body;

      await strapi.plugins["email"].services.email.send({
        to: to,
        from: from,
        bcc: bcc,
        subject: subject,
        html: html,
      });

      await strapi.plugins["email"].services.email.send({
        to: from,
        from: from,
        bcc: bcc,
        subject: "Ny beställning på tobiasbergstedt.se",
        html: html,
      });

      return ctx.send({ message: "Email sent successfully" });
    } catch (err) {
      console.log("Error sending email:", err);
      return ctx.badRequest("Email sending failed");
    }
  },
};
