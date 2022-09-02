interface IDateProvider {
    dateNow(): Date;
    convertToUtc(date: Date): string;
    compareInHours(end_date: Date, start_date: Date): number;
    compareInDays(end_date: Date, start_date: Date): number;
    addDays(days: number): Date;
}

export { IDateProvider };
