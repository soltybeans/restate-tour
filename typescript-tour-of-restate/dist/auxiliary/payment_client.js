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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentClient = void 0;
let i = 0;
class PaymentClient {
    static get() {
        return new PaymentClient();
    }
    async call(idempotencyKey, amount) {
        console.log(`Payment call succeeded for idempotency key ${idempotencyKey} and amount ${amount}`);
        // do the call
        return true;
    }
    async failingCall(idempotencyKey, amount) {
        if (i >= 2) {
            console.log(`Payment call succeeded for idempotency key ${idempotencyKey} and amount ${amount}`);
            i = 0;
            return true;
        }
        else {
            console.log(`Payment call failed for idempotency key ${idempotencyKey} and amount ${amount}. Retrying...`);
            i = i + 1;
            throw new Error("Payment call failed");
        }
    }
}
exports.PaymentClient = PaymentClient;
//# sourceMappingURL=payment_client.js.map