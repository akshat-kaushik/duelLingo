import { generateQuiz } from "../quiz";

export interface Quiz{
    question:string
    options:string[]
    correctAnswer:string
}

export class QuizManager{
    private quizz:Quiz[]=[]


    constructor(){
        this.quizz=[]
    }

    async startQuiz(language:string):Promise<Quiz>{
        const quiz=await generateQuiz(language)
        this.quizz.push(quiz)
        return quiz
    }

    activeQuestion():Quiz{
        return this.quizz[0]
    }

    nextQuestion():Quiz{
        this.quizz.shift()
        return this.quizz[0]
    }

    isEmpty():boolean{
        return this.quizz.length===0
    }

    
    

    
}