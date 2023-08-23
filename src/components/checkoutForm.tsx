import PrimaryButton from "./primaryButton";

export default function CheckoutForm() {
    return (
        <form action='/api/checkout/' method="POST">
            <PrimaryButton buttonText="Checkout" buttonType={"submit"} />
        </form>
    );
}