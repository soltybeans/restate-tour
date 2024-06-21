import * as restate from "@restatedev/restate-sdk";
export declare const cartObject: restate.VirtualObjectDefinition<"CartObject", {
    addTicket: (ctx: restate.ObjectContext, ticketId: string) => Promise<boolean>;
    checkout: (ctx: restate.ObjectContext) => Promise<boolean>;
    expireTicket: (ctx: restate.ObjectContext, ticketId: string) => Promise<void>;
}>;
export declare const CartObject: typeof cartObject;
//# sourceMappingURL=cart_object.d.ts.map