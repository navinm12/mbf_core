import { CardFactory, InputHints, MessageFactory } from 'botbuilder';
import {
    ComponentDialog,
    ConfirmPrompt,
    Dialog,
    DialogTurnResult,
    TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from 'botbuilder-dialogs';
// import { BookingDetails } from './bookin/gDetails';

import { WeatheringDialog } from './weatherbot';
import { QuizDialog } from './quizbot';
import { UserdetailDialog } from './userdialog';


const CONFIRM_PROMPT = 'confirmPrompt';
const WEATHER_DIALOG = 'weatheringDialog';
const QUIZ_DIALOG = 'quizDialog'
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';

const WelcomeCard = require('../../resources/welcoming.json');

export class WelcomeDialog extends ComponentDialog {
    constructor() {
        super('welcomeDialog');

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new UserdetailDialog())
            .addDialog(new WeatheringDialog())
            .addDialog(new QuizDialog())
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.Step1.bind(this),
                this.Step2.bind(this),
                
            ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }
    private async Step1(stepContext: WaterfallStepContext) {
        
        // let cardmsg =await Language_card()
        // await stepContext.context.sendActivity({
        //   attachments: [
        //     {
        //       contentType: 'application/vnd.microsoft.card.adaptive',
        //       content: cardmsg,
        //     },
        //   ],
        //  });
       const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
        await stepContext.context.sendActivity({ attachments: [welcomeCard] });
        return Dialog.EndOfTurn
       
    }
    private async Step2(stepContext: WaterfallStepContext): Promise<any> {
        console.log("checking for the result",stepContext.context.activity.text)
        let result =stepContext.context.activity.text
        console.log("reuting",result)
        if(result == "Weather"){
            console.log("inseide if")
            return await stepContext.replaceDialog('weatheringDialog')
        }
        else if(result == "user"){
            return await stepContext.replaceDialog('userdetailDialog')
        }
        else if(result == "common"){
            return await stepContext.replaceDialog('quizDialog')
        }

    //    const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
    //     return await stepContext.context.sendActivity({ attachments: [welcomeCard] });
       
    }
}