import * as restate from "@restatedev/restate-sdk";
export declare const ticketObject: restate.VirtualObjectDefinition<"TicketObject", {
    reserve: (ctx: restate.ObjectContext) => Promise<boolean>;
    unreserve: (ctx: restate.ObjectContext) => Promise<boolean>;
    markAsSold: (ctx: restate.ObjectContext) => Promise<boolean>;
}>;
export declare const TicketObject: typeof ticketObject;
//# sourceMappingURL=ticket_object.d.ts.map