import { ComponentDialog, TextPrompt, WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';  
  
const TEXT_PROMPT = 'textPrompt';  
const WATERFALL_DIALOG = 'waterfallDialog';  
  
export class QuizDialog extends ComponentDialog {  
    constructor() {  
        super('quizDialog');  
  
        this.addDialog(new TextPrompt(TEXT_PROMPT))  
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [  
                this.Question1.bind(this),  
                this.Question2.bind(this),  
                this.Question3.bind(this),  
                this.Question4.bind(this),  
                this.Question5.bind(this),  
                this.FinalStep.bind(this)  
            ]));  
  
        this.initialDialogId = WATERFALL_DIALOG;  
    }  
    private async Question1(step: WaterfallStepContext): Promise<any> {  
       
    }  
  
    private async Question2(step) {  
      
    }  
  
    private async Question3(step) {  
      
    }  
  
    private async Question4(step) {  
       
    }  
  
    private async Question5(step) {  
      
    }  
  
    private async FinalStep(step) {        
 
    }  
}