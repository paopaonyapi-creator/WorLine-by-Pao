import { AnyDiagramObject, SymbolObject, TextObject, WireObject } from "./types";

export const generateSVG = (objects: AnyDiagramObject[], width: number, height: number): string => {
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">\n`;
  svgContent += `<rect width="100%" height="100%" fill="white" />\n`;

  // Render objects based on their Z-Index loosely, or just array order
  for (const obj of objects) {
    if (obj.type === "wire") {
      const wire = obj as WireObject;
      const pts = wire.points.join(",");
      svgContent += `  <polyline points="${pts}" stroke="${wire.color}" stroke-width="${wire.thickness}" fill="none" />\n`;
    } 
    else if (obj.type === "text") {
      const textObj = obj as TextObject;
      svgContent += `  <text x="${textObj.x}" y="${textObj.y + textObj.fontSize}" font-family="${textObj.fontFamily}" font-size="${textObj.fontSize}" fill="${textObj.fill}">${textObj.text}</text>\n`;
    }
    else if (obj.type === "symbol") {
      const sym = obj as SymbolObject;
      let symbolContent = "";
      const sWidth = sym.width || 40;
      const sHeight = sym.height || 40;
      const strokeColor = "black";
      const strokeWidth = 2;

      // Duplicate logic from RenderSymbol
      switch(sym.symbolId) {
        case "breaker":
          symbolContent += `<rect x="${sWidth*0.2}" y="${sHeight*0.1}" width="${sWidth*0.6}" height="${sHeight*0.8}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="white" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.1}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="${sHeight*0.9}" x2="${sWidth*0.5}" y2="${sHeight}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.2}" y1="${sHeight*0.3}" x2="${sWidth*0.8}" y2="${sHeight*0.7}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.2}" y1="${sHeight*0.7}" x2="${sWidth*0.8}" y2="${sHeight*0.3}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        case "fuse":
          symbolContent += `<rect x="${sWidth*0.2}" y="${sHeight*0.2}" width="${sWidth*0.6}" height="${sHeight*0.6}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="white" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.2}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="${sHeight*0.8}" x2="${sWidth*0.5}" y2="${sHeight}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="${sHeight*0.2}" x2="${sWidth*0.5}" y2="${sHeight*0.8}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        case "transformer":
          symbolContent += `<circle cx="${sWidth*0.5}" cy="${sHeight*0.35}" r="${sHeight*0.25}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="none" />`;
          symbolContent += `<circle cx="${sWidth*0.5}" cy="${sHeight*0.65}" r="${sHeight*0.25}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="none" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.1}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="${sHeight*0.9}" x2="${sWidth*0.5}" y2="${sHeight}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        case "motor":
          symbolContent += `<circle cx="${sWidth*0.5}" cy="${sHeight*0.5}" r="${sHeight*0.4}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="white" />`;
          symbolContent += `<text x="${sWidth*0.25}" y="${sHeight*0.65}" font-size="20" font-family="sans-serif" font-weight="bold" fill="${strokeColor}">M</text>`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.1}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        case "ground":
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.5}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="0" y1="${sHeight*0.5}" x2="${sWidth}" y2="${sHeight*0.5}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.2}" y1="${sHeight*0.7}" x2="${sWidth*0.8}" y2="${sHeight*0.7}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.4}" y1="${sHeight*0.9}" x2="${sWidth*0.6}" y2="${sHeight*0.9}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        case "generator":
          symbolContent += `<circle cx="${sWidth*0.5}" cy="${sHeight*0.5}" r="${sHeight*0.4}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="white" />`;
          symbolContent += `<text x="${sWidth*0.25}" y="${sHeight*0.65}" font-size="20" font-family="sans-serif" font-weight="bold" fill="${strokeColor}">G</text>`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.1}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        case "capacitor":
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.4}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.2}" y1="${sHeight*0.4}" x2="${sWidth*0.8}" y2="${sHeight*0.4}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.2}" y1="${sHeight*0.6}" x2="${sWidth*0.8}" y2="${sHeight*0.6}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="${sHeight*0.6}" x2="${sWidth*0.5}" y2="${sHeight}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        case "isolator":
          symbolContent += `<line x1="${sWidth*0.5}" y1="0" x2="${sWidth*0.5}" y2="${sHeight*0.2}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="${sHeight*0.8}" x2="${sWidth*0.5}" y2="${sHeight}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          symbolContent += `<circle cx="${sWidth*0.5}" cy="${sHeight*0.2}" r="3" stroke="${strokeColor}" fill="white" stroke-width="${strokeWidth}" />`;
          symbolContent += `<circle cx="${sWidth*0.5}" cy="${sHeight*0.8}" r="3" stroke="${strokeColor}" fill="white" stroke-width="${strokeWidth}" />`;
          symbolContent += `<line x1="${sWidth*0.5}" y1="${sHeight*0.2}" x2="${sWidth*0.8}" y2="${sHeight*0.6}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
          break;
        default:
          symbolContent += `<rect x="0" y="0" width="${sWidth}" height="${sHeight}" fill="pink" stroke="red" stroke-width="2" />`;
      }

      // Handle translation (and rotation if we had it)
      svgContent += `  <g transform="translate(${sym.x}, ${sym.y}) rotate(${sym.rotation || 0}, ${sWidth/2}, ${sHeight/2})">\n    ${symbolContent}\n  </g>\n`;
    }
  }

  svgContent += `</svg>`;
  return svgContent;
};
