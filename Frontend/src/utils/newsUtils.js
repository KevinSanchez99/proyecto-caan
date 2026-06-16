export const getPreviewText = (contenido, maxLength = 120) => {
    if (!contenido) return "";
    if (typeof contenido === "string")
    return contenido.length > maxLength
        ? contenido.substring(0, maxLength) + "..." : contenido;
    if (Array.isArray(contenido)) {
    for (const block of contenido) {
        if (block.content?.length > 0) {
        const text = block.content.map(t => t.text).join("");
        if (text.trim())
            return text.length > maxLength
            ? text.substring(0, maxLength) + "..." : text;
        }
    }
    }
    return "";
};
