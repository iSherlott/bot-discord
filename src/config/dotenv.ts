import dotenv from "dotenv";

export const Dotenv = (): void => {
    dotenv.config({ override: false });
    dotenv.config();
};