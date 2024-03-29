interface IDateProvider {
    dateNow(): Date;
    convertToUtc(date: Date): string;
    compareInHours(end_date: Date, start_date: Date): number;
    compareInDays(end_date: Date, start_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
