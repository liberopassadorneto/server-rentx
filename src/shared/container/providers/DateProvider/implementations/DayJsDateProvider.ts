import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

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
}

export { DayJsDateProvider };
