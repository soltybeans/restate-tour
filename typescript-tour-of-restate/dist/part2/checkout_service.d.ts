import * as restate from "@restatedev/restate-sdk";
export declare const checkoutService: restate.ServiceDefinition<"CheckoutService", {
    handle: (ctx: restate.Context, request: {
        userId: string;
        tickets: string[];
    }) => Promise<boolean>;
}>;
export declare const CheckoutService: typeof checkoutService;
//# sourceMappingURL=checkout_service.d.ts.map