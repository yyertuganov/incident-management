import  MessageType from "sap/ui/core/message/MessageType";
import DateFormat from "sap/ui/core/format/DateFormat";

export enum Urgency {
    High = "H",
    Medium = "M",
    Low = "L"
}

export function formatHighlightColor(urgency: Urgency): MessageType {

    if (urgency === Urgency.High) {return MessageType.Error;}
    else if (urgency === Urgency.Medium) {return MessageType.Warning;}
    return MessageType.Information;

}

export function formatDaysAgo(createdAt: string): string {
    const oDateTimeWithTimezoneFormat = DateFormat.getDateTimeWithTimezoneInstance();
    const since = oDateTimeWithTimezoneFormat.parse(createdAt);
    const oDateFormat = DateFormat.getDateInstance({relative: true});
    return oDateFormat.format(since![0] as Date);
}