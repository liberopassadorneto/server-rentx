import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { injectable } from "tsyringe";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

@injectable()
class DayJsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate();
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(end_date: Date, start_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);
        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    compareInDays(end_date: Date, start_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);
        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    addDays(days: number) {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export { DayJsDateProvider };
