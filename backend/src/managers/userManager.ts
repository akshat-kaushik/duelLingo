export interface User{
    socket:WebSocket,
    name:string
}

export class UserManager{
    private users:User[]
    private queue1:string[]
    private roomManager:RoomManager[]

    constructor(){
        this.users=[]
        this.queue1=[]
        this.roomManager=new RoomManager()
    }

    addUsertoQueue()

}