import {useEffect,useState} from 'react';
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from "./ui/select"
import {api} from '@/lib/axios'

interface Prompt{
    id: String
    title: String
    template: String
}

interface PromptSelectProps{
    onPromptSelected:(template:String) =>void
}

export function PromptSelect(props: PromptSelectProps){
const [prompts,setPrompts] = useState<Prompt[] | null>(null)

useEffect(()=>{
  api.get('/prompts').then(response =>{
    setPrompts(response.data)
  })
},[])

function handlePromptSelected(promptId:string){
    const selectedPrompt = prompts?.find(prompt => prompt.id ===promptId)

    if (!selectedPrompt){
        return
    }
    props.onPromptSelected(selectedPrompt.template)
}
    return(
    <Select onValueChange={handlePromptSelected}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um prompt..."/>
        </SelectTrigger>
        <SelectContent>
            {prompts?.map(prompt => {
                return(
                    <SelectItem 
                    key={prompt.id}
                    value={prompt.id}>{prompt.title}
                    </SelectItem>
                )
            })}
        </SelectContent>
      </Select>
    )
}