import {format as fnsFormat} from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

const dateFormat = (value: Date, format = "dd/MM/yyyy"): String => {
    try {
        if (!value) return String(value);
        return fnsFormat(new Date(value), format, {locale: ptBR});
    } catch (e) {
        return String(value);
    }
}

export default dateFormat