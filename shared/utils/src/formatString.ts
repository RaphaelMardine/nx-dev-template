export const formatPaymentMethod = (paymentMethod: string) => {
    if (paymentMethod === 'CREDIT_CARD') {
        return 'Cartão de crédito';
    }
    if (paymentMethod === 'BANK_SLIP') {
        return 'Boleto';
    }
    if (paymentMethod === 'PIX') {
        return 'Pix';
    }
    if (paymentMethod === 'DEBIT') {
        return 'Débito';
    }
    return paymentMethod;
}