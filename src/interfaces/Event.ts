import Client from '../client';
import { ClientEvents, VoiceState } from 'discord.js';

interface Run {
    (client: Client, ...args: any[]): any;
}

interface RunVoice {
    (oldState: VoiceState, newState: VoiceState, ...args: any[]): any;
}


export interface Event {
    name: keyof ClientEvents;
    run: Run;
}

export interface EventVoice {
    name: keyof ClientEvents;
    run: RunVoice;
}