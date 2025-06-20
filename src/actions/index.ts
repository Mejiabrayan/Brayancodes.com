import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import nodemailer from "nodemailer";

export const server = {
  contactForm: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      message: z.string().min(10).max(500),
    }),
    handler: async ({ name, email, message }) => {
      // Create a transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "brayanmejiacuenca@gmail.com", // Replace with your Gmail address
          pass: "dslp szrn kskv sqqo", // Replace with your Gmail password or app password
        },
      });

      // Send email
      try {
        await transporter.sendMail({
          from: '"Your Website" <your-email@gmail.com>', // Sender address
          to: "mejiabrayan@protonmail.com", // Recipient address
          subject: `New contact from ${name}`, // Subject line
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
          html: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong> ${message}</p>`, // HTML body
        });

        return { success: true, message: "Email sent successfully" };
      } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
      }
    },
  }),
};
