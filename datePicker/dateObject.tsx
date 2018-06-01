import moment from "moment";

export class DateObject {
    key?: string
    value?: moment.Moment[]
}

export const toLongDate = (date: moment.Moment) =>{
    return date.format("YYYY-MM-DD");
}