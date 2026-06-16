import { IoWarningOutline } from "react-icons/io5";
const ReportBanner = () => {
return (
<div
    className="bg-error-container/50 border border-error/20 rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm mx-auto">

    <div className="flex items-start gap-4">
        
        <div className="p-4 bg-error/10 rounded-full text-error shrink-0 hidden sm:flex items-center justify-center">
            <span className="text-4xl text-error/70">
                <IoWarningOutline />
            </span>
        </div>

        <div>
            {/* Textos actualizados para la temática de denuncias */}
            <h2 className="font-h3 text-2xl text-on-surface mb-1">
                ¿Quieres saber como realizar una denuncia?
            </h2>
            <p className="font-body-md text-on-surface-variant text-xl md:text-base">
                Te explicaremos el procedimiento legal exacto para que tu denuncia sea válida.
            </p>
        </div>
    </div>
        <a href="/reports"
            className="w-full md:w-auto shrink-0 px-8 py-3 bg-error/80 text-white font-label-xl text-label-xl rounded-full hover:shadow-md hover:scale-[1.02] transition-all text-center">
            Ver cómo denunciar
        </a>
    </div>
    );
};

export default ReportBanner;