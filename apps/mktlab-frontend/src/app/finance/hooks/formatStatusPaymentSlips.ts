export const formatStatusPaymentSlips = (status: string) => {
    switch (status) {
        case 'OPEN':
        return 'Em aberto';
        case 'PAID':
        return 'Pago';
        case 'PROCESSING':
        return 'Processando';
        case 'FAILED':
        return 'Falhou';
        case 'CLOSED':
        return 'Fechado';
        case 'PENDING':
        return 'Pendente';
        case 'EXPIRED':
        return 'Expirado';
        case 'SKIPPED':
        return 'Pulado';
        case 'ACTIVE':
        return 'Ativo';
        default:
        return status;
    }
}
