export declare class PaymentClient {
    static get(): PaymentClient;
    call(idempotencyKey: string, amount: number): Promise<boolean>;
    failingCall(idempotencyKey: string, amount: number): Promise<boolean>;
}
//# sourceMappingURL=payment_client.d.ts.map