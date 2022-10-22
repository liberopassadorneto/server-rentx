"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayJsDateProvider = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
var tsyringe_1 = require("tsyringe");
dayjs_1.default.extend(utc_1.default);
var DayJsDateProvider = /** @class */ (function () {
    function DayJsDateProvider() {
    }
    DayJsDateProvider.prototype.dateNow = function () {
        return (0, dayjs_1.default)().toDate();
    };
    DayJsDateProvider.prototype.convertToUtc = function (date) {
        return (0, dayjs_1.default)(date).utc().local().format();
    };
    DayJsDateProvider.prototype.compareInHours = function (end_date, start_date) {
        var end_date_utc = this.convertToUtc(end_date);
        var start_date_utc = this.convertToUtc(start_date);
        return (0, dayjs_1.default)(end_date_utc).diff(start_date_utc, "hours");
    };
    DayJsDateProvider.prototype.compareInDays = function (end_date, start_date) {
        var end_date_utc = this.convertToUtc(end_date);
        var start_date_utc = this.convertToUtc(start_date);
        return (0, dayjs_1.default)(end_date_utc).diff(start_date_utc, "days");
    };
    DayJsDateProvider.prototype.addDays = function (days) {
        return (0, dayjs_1.default)().add(days, "days").toDate();
    };
    DayJsDateProvider.prototype.addHours = function (hours) {
        return (0, dayjs_1.default)().add(hours, "hours").toDate();
    };
    DayJsDateProvider.prototype.compareIfBefore = function (start_date, end_date) {
        return (0, dayjs_1.default)(start_date).isBefore(end_date);
    };
    DayJsDateProvider = __decorate([
        (0, tsyringe_1.injectable)()
    ], DayJsDateProvider);
    return DayJsDateProvider;
}());
exports.DayJsDateProvider = DayJsDateProvider;
