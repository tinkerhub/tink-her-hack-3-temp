document.addEventListener("DOMContentLoaded", async () => {
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
                const modifiedPdfBytes = await processPdf(pdfBytes, oldWord, newWord);

                if (modifiedPdfBytes) {
                    const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
                    downloadPdf(blob, file.name);
                } else {
                    alert("Failed to replace text.");
                }
            };
        } catch (error) {
            console.error(error);
            alert("Error processing the PDF.");
        }
    });

    async function processPdf(pdfBytes, oldWord, newWord) {
        const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();

        for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();

            let modifiedLines = [];
            let originalText = textContent.items.map(item => item.str).join(" ");

            if (!originalText.includes(oldWord)) continue; // Skip page if no match

            // Replace words line by line
            for (let item of textContent.items) {
                let newText = item.str.replace(new RegExp(escapeRegExp(oldWord), "g"), newWord);
                modifiedLines.push({ text: newText, x: item.transform[4], y: item.transform[5] });
            }

            // Clear the original text by drawing a white rectangle
            const { width, height } = pages[i].getSize();
            pages[i].drawRectangle({
                x: 0,
                y: 0,
                width,
                height,
                color: PDFLib.rgb(1, 1, 1),
                opacity: 1,
            });

            // Redraw modified text line by line
            for (let line of modifiedLines) {
                pages[i].drawText(line.text, {
                    x: line.x,
                    y: height - line.y, 
                    font,
                    size: 12,
                    color: PDFLib.rgb(0, 0, 0),
                });
            }
        }

        return await pdfDoc.save();
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function downloadPdf(blob, fileName) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName.replace(".pdf", "_modified.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});