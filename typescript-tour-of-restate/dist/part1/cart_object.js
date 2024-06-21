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
exports.cartObject = restate.object({
    name: "CartObject",
    handlers: {
        // <start_add_ticket>
        async addTicket(ctx, ticketId) {
            // withClass highlight-line
            const reservationSuccess = await ctx.objectClient(ticket_object_1.TicketObject, ticketId).reserve();
            return true;
        },
        // <end_add_ticket>
        // <start_checkout>
        async checkout(ctx) {
            // withClass(1:2) highlight-line
            const success = await ctx.serviceClient(checkout_service_1.CheckoutService)
                .handle({ userId: ctx.key, tickets: ["seat2B"] });
            return success;
        },
        // <end_checkout>
        // <start_expire_ticket>
        async expireTicket(ctx, ticketId) {
            // withClass highlight-line
            ctx.objectSendClient(ticket_object_1.TicketObject, ticketId).unreserve();
        },
        // <end_expire_ticket>
    }
});
// <start_user_session_api>
exports.CartObject = { name: "CartObject" };
// <end_user_session_api>
//# sourceMappingURL=cart_object.js.map