"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const request_1 = require("../../services/request");
exports.slash = {
    name: 'wallet',
    description: 'Verifica o saldo da sua conta.',
    testOnly: false,
    run: async ({ interaction }) => {
        try {
            const coins = await (0, request_1.request)("get", `wallet/${interaction.user.id}`, {});
            return interaction.followUp({ content: `Seu saldo é de ${coins["data"]} Sugars` });
        }
        catch (error) {
            return interaction.followUp({ content: `Internal Error` });
        }
    },
};
