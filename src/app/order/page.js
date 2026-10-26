import OrderClient from "./OrderClient";

export const metadata = {
  title: "Checkout & Order | FORNO Pizza",
  description:
    "Complete your FORNO artisan pizza order. Doorstep delivery and counter pickup available.",
};

export default function OrderPage() {
  return <OrderClient />;
}
