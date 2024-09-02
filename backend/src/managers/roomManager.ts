import { QuizManager } from "./quizManager"
import { User } from "./userManager"

export interface Room{
    user1:User
    user2:User
}

export class RoomManager{
    private rooms:Map<string,Room>
    private quizManager:QuizManager

    constructor(){
        this.rooms=new Map<string,Room>()
        this.quizManager=new QuizManager()
    }

    createRoom(user1:User,user2:User,language:string){
        const roomId=Math.random().toString(36).substring(2, 15)
        this.rooms.set(roomId.toString(),{user1,user2})
        user1.socket.send(JSON.stringify({type:"roomCreated",roomId:roomId}))
        user2.socket.send(JSON.stringify({type:"roomCreated",roomId:roomId}))

        return roomId
    }

    async startQuiz(roomId:string,language:string){
        const room=this.rooms.get(roomId)
        if(room){
            const quiz=await this.quizManager.startQuiz(language)
            room.user1.socket.send(JSON.stringify({type:"quizStarted",quiz:quiz}))
            room.user2.socket.send(JSON.stringify({type:"quizStarted",quiz:quiz}))
        }
    }


    
    
}