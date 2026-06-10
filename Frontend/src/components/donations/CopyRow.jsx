import React, { useState } from 'react';
import { MdCopyAll, MdCheck } from "react-icons/md";

const CopyRow = ({ label, value, colorClass = "" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        // Vuelve al ícono de copiar después de 2 segundos
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-outline-variant/20 pb-2 last:border-0 last:pb-0">
            <span className="text-on-surface-variant font-sans font-medium mb-1 sm:mb-0">{label}:</span>

            <div className="flex items-center gap-2">
                <strong className={`select-all tracking-wide ${colorClass}`}>{value}</strong>

                {/* Botón de copiar */}
                <button
                    onClick={handleCopy}
                    title="Copiar al portapapeles"
                    className="p-1.5 rounded-md hover:bg-outline-variant/30 text-on-surface-variant transition-colors flex items-center justify-center active:scale-95"
                >   {copied ? (
                    <MdCheck className="text-[18px] text-primary" />
                ) : (
                    <MdCopyAll className="text-[18px]" />
                )}
                </button>
            </div>
        </div>
    );
};

export default CopyRow;