import { User } from "types";
import { doc } from "../config";

export const addNewUser = async (user: User) => {
    await doc.loadInfo();
    let sheet = doc.sheetsByIndex[0];
    if(!sheet) {
        sheet = await doc.addSheet({headerValues: ['Имя', 'Фамилия', 'Отчество', 'Номер группы']})
    }
    await sheet.addRow(
        {
            "Имя": user.name || '',  
            "Фамилия": user.surname || '',
            "Отчество": user.patronymic || '',
            "Номер группы": user.groupNumber || '',
        }
    );
}