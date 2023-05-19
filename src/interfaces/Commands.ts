import { CommandInteraction, ChatInputApplicationCommandData, GuildMember, ApplicationCommandData, CommandInteractionOptionResolver } from "discord.js";
import Client from '../client';

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
};

interface RunOptions {
    client: Client;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type Run = (options: RunOptions) => any;

export type Command = ApplicationCommandData & {
    name: string;
    description: string;
    testOnly: boolean;
    run: Run;
} & ChatInputApplicationCommandData;