import { NextResponse } from "next/server";
import { Customer, sendCartEmailService } from "./service";

export interface Body {
  customer: Customer;
  products: shoppingCartProduct[];
}

export async function POST(req: Request) {
  const body: Body = await req.json();
  const { customer, products } = body;

  if (!customer.name || !customer.email || !products || products.length === 0) {
    return NextResponse.json(
      {
        error:
          "Dados incompletos. Por favor, forneça nome, e-mail e itens do carrinho.",
      },
      { status: 400 }
    );
  }

  try {
    await sendCartEmailService(customer, products);
    return NextResponse.json(
      { message: "E-mail enviado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro interno ao enviar o e-mail." },
      { status: 500 }
    );
  }
}
