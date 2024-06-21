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
exports.TicketObject = exports.ticketObject = void 0;
const restate = __importStar(require("@restatedev/restate-sdk"));
const ticket_status_1 = require("../auxiliary/ticket_status");
exports.ticketObject = restate.object({
    name: "TicketObject",
    handlers: {
        async reserve(ctx) {
            const status = (await ctx.get("status")) ?? ticket_status_1.TicketStatus.Available;
            if (status === ticket_status_1.TicketStatus.Available) {
                ctx.set("status", ticket_status_1.TicketStatus.Reserved);
                return true;
            }
            else {
                return false;
            }
        },
        async unreserve(ctx) {
            const status = (await ctx.get("status")) ?? ticket_status_1.TicketStatus.Available;
            if (status !== ticket_status_1.TicketStatus.Sold) {
                ctx.clear("status");
            }
        },
        async markAsSold(ctx) {
            const status = (await ctx.get("status")) ?? ticket_status_1.TicketStatus.Available;
            if (status === ticket_status_1.TicketStatus.Reserved) {
                ctx.set("status", ticket_status_1.TicketStatus.Sold);
            }
        },
    }
});
exports.TicketObject = { name: "TicketObject" };
//# sourceMappingURL=ticket_object.js.map