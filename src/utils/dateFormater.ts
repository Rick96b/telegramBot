export const dateFormater = (date: string, time: string) => {
    const [day, month, year] = date.split('.');
    const [hours, minutes] = time.split(':');
    return new Date(
        +year!,
        +month! - 1,
        +day!,
        +hours!,
        +minutes!,
        0
    )
}