import { RoomManager } from './roomManager';

export interface User {
    socket: WebSocket,
    name: string,
}

export class UserManager {
    private static instance: UserManager;
    private users: User[] = [];
    private queues: Record<string, User[]> = {
        English: [],
        Spanish: [],
        French: [],
        German: [],
        Russian: [],
    };
    private roomManager: RoomManager = new RoomManager();

    private constructor() {}

    public static getInstance(): UserManager {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }

    public addUserToQueue(user: User, language: string): void {
        const queue = this.queues[language];
        if (queue) {
            queue.push(user);
            this.tryJoinUsers(language);
        }
    }

    private tryJoinUsers(language: string): void {
        const queue = this.queues[language];
        if (queue && queue.length >= 2) {
            const user1 = queue.shift();
            const user2 = queue.shift();
            if (user1 && user2) {
                this.roomManager.createRoom(user1, user2, language);
            }
        } else {
            setTimeout(() => this.tryJoinUsers(language), 30000);
        }
    }
}

export const userManager = UserManager.getInstance();
