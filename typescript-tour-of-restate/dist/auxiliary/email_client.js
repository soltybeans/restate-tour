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
exports.EmailClient = void 0;
class EmailClient {
    static get() {
        return new EmailClient();
    }
    async notifyUserOfPaymentSuccess(userId) {
        console.log(`Notifying user ${userId} of payment success`);
        // send the email
        return true;
    }
    async notifyUserOfPaymentFailure(userId) {
        console.log(`Notifying user ${userId} of payment failure`);
        // send the email
        return true;
    }
}
exports.EmailClient = EmailClient;
//# sourceMappingURL=email_client.js.map