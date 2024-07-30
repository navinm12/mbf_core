import { InputHints, MessageFactory } from 'botbuilder';
import {
    ComponentDialog,
    ConfirmPrompt,
    DialogTurnResult,
    TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from 'botbuilder-dialogs';
// import { BookingDetails } from './bookingDetails';

import { UserDetails } from './userdetails';

const CONFIRM_PROMPT = 'confirmPrompt';
const DATE_RESOLVER_DIALOG = 'dateResolverDialog';
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';

export class UserdetailDialog extends ComponentDialog {
    constructor() {
        super( 'userdetailDialog');

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.Step1.bind(this),
                this.Step2.bind(this),
                this.Step3.bind(this),
                this.Step4.bind(this),
                this.Step5.bind(this)
            ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    
    private async Step1(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    
        const messageText = 'May i know your name?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
    }

   
    private async Step2(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const userDetails = stepContext.options as UserDetails;
        userDetails.name=stepContext.result

        const messageText = 'where are you from?';
        const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        return await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
    }

    
    private async Step3(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const userDetails = stepContext.options as UserDetails;
        userDetails.region=stepContext.result

        const messageText = 'what is your age?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
    }

    private async Step4(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const userDetails = stepContext.options as UserDetails;
        userDetails.age=stepContext.result
        const messageText = 'what is your hobby!';
        const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        return await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
    }

   
    private async Step5(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const userDetails = stepContext.options as UserDetails;
        userDetails.hobby=stepContext.result
        const messageText = `Greetings ${userDetails.name}, we acknowledge that you are ${userDetails.age} years old and are based in ${userDetails.region}. We also noted that your hobby is ${userDetails.hobby}. We appreciate your presence and look forward to further interactions. Have a productive day ahead!`;
        const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
        return await stepContext.endDialog();
    }
}
