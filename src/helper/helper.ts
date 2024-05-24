//создание даты
export function currentDateISOString() {
    return new Date().toISOString()
}
//создание даты днем позже
// export function nextDayDateISOString() {
//     let nextDayDate = new Date()
//     nextDayDate.setDate(nextDayDate.getDate() + 1);
//     return nextDayDate.toISOString();
// }

//проверка формата даты
export const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

//   /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/ 

//проверка формата адреса блога
export const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

export function createId() {
    return String(Date.now() * 10000 + Math.random() * 1000)
}

export function filterOfFirstErrorInEveryField(errors: any[]) {
    let allFields = errors.map(el => el.path)
    //let fields: string[] = []
    // for (let i = 0; i < allFields.length; i++) {
    //     if (fields.indexOf(allFields[i]) < 0) {
    //         fields.push(allFields[i])
    //     }
    // }
    let fields: string[] = [...new Set(allFields)] //убираем из массива повторяющиеся элементы
    let errorCorrect: any[] = []
    for (let i = 0; i < fields.length; i++) {
        let errorObj = errors.filter(e => e.path === fields[i])[0]
        errorCorrect.push(errorObj)
    }
    //console.log("errorCorrect", errorCorrect);
    return errorCorrect
}
