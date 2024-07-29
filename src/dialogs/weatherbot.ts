import { ComponentDialog, TextPrompt, WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';  
import axios from 'axios';  
  
const TEXT_PROMPT = 'textPrompt';  
const WATERFALL_DIALOG = 'waterfallDialog';  
  
export class WeatheringDialog extends ComponentDialog {  
    constructor() {  
        super('weatheringDialog');  
  
        this.addDialog(new TextPrompt(TEXT_PROMPT))  
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [  
                this.AskForCity.bind(this),  
                this.ShowWeather.bind(this)  
            ]));  
  
        this.initialDialogId = WATERFALL_DIALOG;  
    }  
  
    private async AskForCity(step: WaterfallStepContext): Promise<any> {  
        return await step.prompt(TEXT_PROMPT, 'Please enter the name of the city you want to know the weather for.');  
    }  
  
    private async ShowWeather(step: WaterfallStepContext): Promise<any> {  
        const city = step.result;  
        let url ='http://api.openweathermap.org/data/2.5/weather'
        let baseurl=`${url}?q=${city}&appid=252e7db9b21e707da1d1ddda1052a81b&units=imperial`
        //unit = metric(*C) ---> unit = imperial(*F)
        const response = await axios.get(baseurl);  
        console.log("response",response)
        if (response.status === 200) {  
            const weather = response.data;  
            await step.context.sendActivity(`The current temperature in ${city} is ${weather.main.temp} and the weather is ${weather.weather[0].main}.`);  
        } else {  
            await step.context.sendActivity('Sorry, I was unable to get the weather information for that city.');  
        }  
        return await step.endDialog();
    }  
}