import { TimexProperty } from '@microsoft/recognizers-text-data-types-timex-expression';
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
    
        
    }

   
    private async Step2(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
      
    }

    
    private async Step3(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
   
    }

    private async Step4(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
     
    }

   
    private async Step5(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        
    }
}
