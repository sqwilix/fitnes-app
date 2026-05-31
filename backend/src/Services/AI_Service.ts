import { groq } from "../Utils/groq.js";
import { prisma } from "../Utils/prisma.js";

export class AIService {
    static async generateWorkoutPlan(clientId: string, userPrompt: string) {

        const chatCompletion = await groq.chat.completions.create({

            messages: [
                {
                    role: "system",
                    content: ` Ты профессиональный фитнес-тренер.
                        Твоя задача составлять тренировочную программу.
                        Возвращай ответ строго в формате JSON.
                        Если клиент спросит у тебя на счет боли при упражнении не давай точный анализ,
                        ты не медик, давай ему советы, но не точный ответ.
                        Так же sets, reps и weight должны быть в формате строки.
                        Струкрута должна быть такой:
                        {
                            exercises: [
                                {
                                    "name": "Название упражнения", 
                                    "sets": "от 3 до 5 в зависимости от силовых клиента",
                                    "reps": "от 8 до 12 в зависимости от силовых клиента",
                                    "weight": "в зависимости от силовых"
                                }
                            ]
                        }                
                    `
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            model: "llama3-70b-8192",
            temperature: 0.3,
            response_format: { type: "json_object" } 
        })
        
        const resultText = chatCompletion.choices[0]?.message?.content || '{"exercises: []"}'

        return await prisma.aiGeneration.create({
            data: {
                prompt: userPrompt,
                response: resultText,
                clientId: clientId
            }
        })
    }
}