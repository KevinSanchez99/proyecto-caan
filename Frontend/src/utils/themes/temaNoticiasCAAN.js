import { lightDefaultTheme } from "@blocknote/mantine";

const caanPaletteTheme = {
  colors: {
    editor: {
      text: "#191c1a",
      background: "000000",
    },
    menu: {
      text: "#191c1a",
      background: "#f2f4f0",
    },
    tooltip: {
      text: "#b2e7a8",
      background: "#2d6a4f",
    },
    hovered: {
      text: "#0f5238",
      background: "#e7e9e5",
    },
    selected: {
      text: "#ffffff",
      background: "#0f5238",
    },
    disabled: {
      text: "#404943",
      background: "#e1e3df",
    },
    shadow: "#bfc9c1",
    border: "#bfc9c1",
    sideMenu: "#707973",
    
    
    highlights: lightDefaultTheme.colors.highlights,
  },
  borderRadius: 12, 
  fontFamily: "Be Vietnam Pro, sans-serif",
};

export const temaNoticiasCAAN = {
  light: caanPaletteTheme,
  dark: caanPaletteTheme, 
};