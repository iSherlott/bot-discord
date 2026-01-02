"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: 'ready',
    run: (client) => console.log(`[CLIENT]: ${client.user?.username} online!!`)
};
