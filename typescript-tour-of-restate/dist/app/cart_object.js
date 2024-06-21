"use strict";
/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate examples,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartObject = exports.cartObject = void 0;
const restate = __importStar(require("@restatedev/restate-sdk"));
const ticket_object_1 = require("./ticket_object");
const checkout_service_1 = require("./checkout_service");
// <start_user_session>
exports.cartObject = restate.object({
    name: "CartObject",
    handlers: {
        async addTicket(ctx, ticketId) {
            const reservationSuccess = await ctx.objectClient(ticket_object_1.TicketObject, ticketId).reserve();
            if (reservationSuccess) {
                const tickets = (await ctx.get("tickets")) ?? [];
                tickets.push(ticketId);
                ctx.set("tickets", tickets);
                ctx.objectSendClient(exports.CartObject, ctx.key, { delay: 15 * 60 * 1000 }).expireTicket(ticketId);
            }
            return reservationSuccess;
        },
        async checkout(ctx) {
            const tickets = (await ctx.get("tickets")) ?? [];
            if (tickets.length == 0) {
                return false;
            }
            const success = await ctx.serviceClient(checkout_service_1.CheckoutService).handle({ userId: ctx.key, tickets: ["seat2B"] });
            if (success) {
                // You checkout with _every_ ticket in the cart
                ctx.clear("tickets");
            }
            return success;
        },
        async expireTicket(ctx, ticketId) {
            // Not all tickets will expire in the cart at the same time. <delay_time> has to have elapsed from the point at which it was added
            const tickets = (await ctx.get("tickets")) ?? [];
            const ticketIndex = tickets.findIndex((ticket) => ticket == ticketId);
            // If this ticket @ ticketIndex is _still_ in the cart - unreserve it but keep the _others_
            if (ticketIndex != 1) {
                tickets.splice(ticketIndex, 1); // Remove one 1 occurrence of ticketId at ticketIndex - it'll be the only one.
                // update state of tickets in cart
                ctx.set("tickets", tickets); // There is one less ticket ...
                ctx.objectSendClient(ticket_object_1.TicketObject, ticketId).unreserve(); // Is is also unreserved.
            }
        },
    }
});
// <end_user_session>
exports.CartObject = { name: "CartObject" };
//# sourceMappingURL=cart_object.js.map