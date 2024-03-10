import { HolidayRules } from "../interfaces/holidayRules";

export default class HolidayRulesSotage {
    private rules: HolidayRules;

    constructor(rules: HolidayRules){
        this.rules = rules;
    }

    updateRules(newRules: HolidayRules): void {
        this.rules = newRules;
    }
    
    getRules(): HolidayRules{
        return this.rules;
    }
}