"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const request_1 = require("../../services/request");
exports.slash = {
    name: 'daily',
    description: 'Recebe 1x por dia o valor de 100 Sugar.',
    testOnly: false,
    run: async ({ interaction }) => {
        const result = await (0, request_1.request)("get", "wallet/verify/" + interaction.user.id, {});
        return interaction.followUp({ content: result["data"][0]["daily"] });
    },
};
