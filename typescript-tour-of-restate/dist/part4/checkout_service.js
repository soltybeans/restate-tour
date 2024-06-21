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
exports.CheckoutService = exports.checkoutService = void 0;
const restate = __importStar(require("@restatedev/restate-sdk"));
const payment_client_1 = require("../auxiliary/payment_client");
const email_client_1 = require("../auxiliary/email_client");
exports.checkoutService = restate.service({
    name: "CheckoutService",
    handlers: {
        // <start_checkout>
        async handle(ctx, request) {
            const totalPrice = request.tickets.length * 40;
            const idempotencyKey = ctx.rand.uuidv4();
            const success = await ctx.run(() => payment_client_1.PaymentClient.get().call(idempotencyKey, totalPrice));
            if (success) {
                await ctx.run(() => email_client_1.EmailClient.get().notifyUserOfPaymentSuccess(request.userId));
            }
            else {
                await ctx.run(() => email_client_1.EmailClient.get().notifyUserOfPaymentFailure(request.userId));
            }
            return success;
        },
        // <end_checkout>
    }
});
exports.CheckoutService = { name: "CheckoutService" };
//# sourceMappingURL=checkout_service.js.map