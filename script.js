document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const oldWordInput = document.getElementById("oldWord");
    const newWordInput = document.getElementById("newWord");
    const replaceBtn = document.getElementById("replaceBtn");

    replaceBtn.addEventListener("click", async () => {
        const file = fileInput.files[0];
        const oldWord = oldWordInput.value.trim();
        const newWord = newWordInput.value.trim();

        if (!file) return alert("Please upload a PDF file.");
        if (!oldWord) return alert("Enter the word to replace.");
        if (oldWord === newWord) return alert("New word must be different.");

        try {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = async function () {
                const pdfBytes = new Uint8Array(fileReader.result);
                const modifiedPdfBytes = await replaceTextWithoutBreaking(pdfBytes, oldWord, newWord);
                downloadPdf(modifiedPdfBytes, file.name);
            };
        } catch (error) {
            console.error(error);
            alert("Error processing the PDF.");
        }
    });

    async function replaceTextWithoutBreaking(pdfBytes, oldWord, newWord) {
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();

        for (const page of pages) {
            const { width, height } = page.getSize();
            const textContent = await page.getTextContent();

            for (const item of textContent.items) {
                if (item.str.includes(oldWord)) {
                    const font = await extractFont(pdfDoc, item.fontName);  // Extracts original font
                    const bgColor = await detectBackgroundColor(page, item);  // Matches background color

                    const modifiedText = item.str.replace(new RegExp(oldWord, "g"), newWord);
                    const adjustedWidth = item.width * (newWord.length / oldWord.length);

                    // Draw a background-colored box to erase old text
                    page.drawRectangle({
                        x: item.transform[4],
                        y: height - item.transform[5],
                        width: adjustedWidth,
                        height: item.height,
                        color: bgColor,  // Uses detected background color
                    });

                    // Draw new text using extracted font
                    page.drawText(modifiedText, {
                        x: item.transform[4],
                        y: height - item.transform[5],
                        font,
                        size: item.height,  // Keeps original font size
                        color: PDFLib.rgb(0, 0, 0),  // Default black text
                    });
                }
            }
        }

        return pdfDoc.save();
    }

    async function extractFont(pdfDoc, fontName) {
        try {
            return await pdfDoc.embedFont(fontName);
        } catch {
            return await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);  // Default fallback
        }
    }

    async function detectBackgroundColor(page, item) {
        // This function should analyze the area around the text to find the background color
        // For now, assume white, but future enhancement can detect exact color.
        return PDFLib.rgb(1, 1, 1);  // Default to white
    }

    function downloadPdf(pdfBytes, fileName) {
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName.replace(".pdf", "_modified.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});