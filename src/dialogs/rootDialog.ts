// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { StatePropertyAccessor, TurnContext, UserState } from 'botbuilder';
import {
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnResult,
    DialogTurnStatus,
    NumberPrompt,
    PromptValidatorContext,
    TextPrompt,
    Dialog,
    WaterfallDialog,
    WaterfallStepContext
} from 'botbuilder-dialogs';
import { QuizDialog } from './quizbot';
import { WelcomeDialog } from './welcomepage';



// import { MessageUtils } from '../MessageUtils';

const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const USER_PROFILE = 'USER_PROFILE';
const WATERFALL_DIALOG = 'rootDialog';

export class RootDialog extends ComponentDialog {

    constructor() {
        super('rootDialog');
        this.addDialog(new WelcomeDialog())

        this.addDialog(new QuizDialog())
        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.initalDialog.bind(this),
        ]));


        this.initialDialogId = WATERFALL_DIALOG;
    }


    private async initalDialog(stepContext) {

        return await stepContext.replaceDialog('welcomeDialog');

    }





    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    public async run(turnContext: TurnContext, accessor: StatePropertyAccessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    // private async initalDialog(stepContext) {

    //     return await stepContext.replaceDialog('language');
        
    //     // let result = await redisApi.getInstance().createRedisHash(stepContext)
    //     // return await stepContext.replaceDialog("newHireDialog");
    //     // let payload = userSessionData.getInstance().UserSession(stepContext, "navinmurugaiyan@tcs.com");
    //     // // await AdminService.getInstance().createSession(payload)
    //     // await mongoOperations.getInstance().create(payload)
    //     // let msg1 = translationUtils.getInstance().getMessage("greeting","en")
    //     // return await stepContext.context.sendActivity(msg1);

    // }

    // private async nameConfirmStep(stepContext) {
    //     stepContext.options.name = stepContext.result;
    // //    let sample=  MessageUtils.getInstance().getMessage("Thank_You2", "en") 
    // let sample="Hello"
    //     // We can send messages to the user at any point in the WaterfallStep.
    //     await stepContext.context.sendActivity(`Thanks ${sample}.`);

    //     // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
    //     return await stepContext.prompt(CONFIRM_PROMPT, 'Do you want to give your age?', ['yes', 'no']);
    // }

   
}
