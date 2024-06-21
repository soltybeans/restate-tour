export declare class EmailClient {
    static get(): EmailClient;
    notifyUserOfPaymentSuccess(userId: string): Promise<boolean>;
    notifyUserOfPaymentFailure(userId: string): Promise<boolean>;
}
//# sourceMappingURL=email_client.d.ts.map