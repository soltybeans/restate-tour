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
const ticket_object_1 = require("../part1/ticket_object");
const checkout_service_1 = require("../part1/checkout_service");
exports.cartObject = restate.object({
    name: "CartObject",
    handlers: {
        // <start_add_ticket>
        async addTicket(ctx, ticketId) {
            const reservationSuccess = await ctx.objectClient(ticket_object_1.TicketObject, ticketId).reserve();
            if (reservationSuccess) {
                // withClass(1:3) highlight-line
                const tickets = (await ctx.get("tickets")) ?? [];
                tickets.push(ticketId);
                ctx.set("tickets", tickets);
                ctx.objectSendClient(exports.CartObject, ctx.key, { delay: 15 * 60 * 1000 })
                    .expireTicket(ticketId);
            }
            return reservationSuccess;
        },
        // <end_add_ticket>
        // <start_checkout>
        async checkout(ctx) {
            // withClass(1:5) highlight-line
            const tickets = (await ctx.get("tickets")) ?? [];
            if (tickets.length === 0) {
                return false;
            }
            const success = await ctx.serviceClient(checkout_service_1.CheckoutService)
                .handle({ userId: ctx.key, tickets: tickets });
            if (success) {
                // withClass highlight-line
                ctx.clear("tickets");
            }
            return success;
        },
        // <end_checkout>
        // <start_expire_ticket>
        async expireTicket(ctx, ticketId) {
            const tickets = (await ctx.get("tickets")) ?? [];
            const ticketIndex = tickets.findIndex((ticket) => ticket === ticketId);
            if (ticketIndex != -1) {
                tickets.splice(ticketIndex, 1);
                ctx.set("tickets", tickets);
                ctx.objectSendClient(ticket_object_1.TicketObject, ticketId).unreserve();
            }
        },
        // <end_expire_ticket>
    }
});
exports.CartObject = { name: "CartObject" };
//# sourceMappingURL=cart_object.js.map