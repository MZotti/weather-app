import {format as fnsFormat} from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

const dateFormat = (value: Date, format = "dd/MM/yyyy") => {
    try {
        if (!value) return value;
        return fnsFormat(new Date(value), format, {locale: ptBR});
    } catch (e) {
        return value;
    }
}

export default dateFormat