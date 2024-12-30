import nodemailer from "nodemailer";

export interface Customer {
  name: string;
  email: string;
}

export async function sendCartEmailService(
  customer: Customer,
  cartItems: shoppingCartProduct[]
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    from: process.env.SENDER_EMAIL,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailBody = createCustomerEmail(customer, cartItems);
  const mailOptions = {
    to: process.env.RECIPIENT_EMAIL,
    subject: `Orçamento solicitado por ${customer.name}`, // Assunto do e-mail
    html: emailBody,
    replyTo: customer.email,
  };

  // Enviar o e-mail
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new Error("Não foi possível enviar o e-mail.");
  }
}

export function createCustomerEmail(
  customer: Customer,
  products: shoppingCartProduct[]
) {
  const date = new Date().toLocaleDateString("pt-Br", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const listForBudget = products.map(
    (product) =>
      `<tr style="background-color: #ffffff">
          <td style="white-space: nowrap; padding: 8px 16px">${product.id}</td>
          <td style="white-space: nowrap; padding: 8px 16px">${product.amount}</td>
        </tr>`
  );
  return `<div
    style="
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 600;
      color: #565857;
    "
  >
    <ul style="list-style: none; font-size: 16px; padding: 0">
      <li style="margin-top: 1rem">
        Enviado em: ${date}
      </li>
      <li style="margin-top: 1rem">Enviado por: ${customer.name}, ${
    customer.email
  }</li>    
   
      <li style="margin-top: 1rem">
        <table
          style="
            width: fit-content;
            text-align: center;
            margin-top: 8px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
          "
        >
          <caption
            style="
              margin-bottom: 16px;
              font-size: 16px;
              white-space: nowrap;
              text-align: left;
              font-weight: bold;
            "
          >
            Lista para orçamento:
          </caption>
          <tr
            style="background-color: #00aaaa; color: #ffffff; font-size: 16px"
          >
            <th style="padding: 8px 16px">Referência</th>
            <th style="padding: 8px 16px">Quantidade</th>          
          </tr>
          ${listForBudget.join("").replace(/>,/g, ">")}      
        </table>
      </li>
    </ul>
  </div>`;
}
