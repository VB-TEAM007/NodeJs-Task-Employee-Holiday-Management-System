"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HolidayRulesSotage = /** @class */ (function () {
    function HolidayRulesSotage(rules) {
        this.rules = rules;
    }
    HolidayRulesSotage.prototype.updateRules = function (newRules) {
        this.rules = newRules;
    };
    HolidayRulesSotage.prototype.getRules = function () {
        return this.rules;
    };
    return HolidayRulesSotage;
}());
exports.default = HolidayRulesSotage;
