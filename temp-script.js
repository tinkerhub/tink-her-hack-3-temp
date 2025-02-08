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
                const modifiedPdfBytes = await replaceTextInPdf(pdfBytes, oldWord, newWord);

                const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
                downloadPdf(blob, file.name);
            };
        } catch (error) {
            console.error(error);
            alert("Error processing the PDF.");
        }
    });

    async function replaceTextInPdf(pdfBytes, oldWord, newWord) {
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

        for (const page of pages) {
            const { width, height } = page.getSize();
            let text = await extractTextFromPage(pdfBytes, pages.indexOf(page));

            if (text.includes(oldWord)) {
                const modifiedText = text.replace(new RegExp(oldWord, "g"), newWord);

                // Erase old text by drawing a white rectangle
                page.drawRectangle({
                    x: 0,
                    y: 0,
                    width,
                    height,
                    color: PDFLib.rgb(1, 1, 1),
                    opacity: 1,
                });

                // Redraw the modified text
                page.drawText(modifiedText, {
                    x: 50,
                    y: height - 50,
                    font,
                    size: 12,
                    color: PDFLib.rgb(0, 0, 0),
                });
            }
        }

        return await pdfDoc.save();
    }

    async function extractTextFromPage(pdfBytes, pageIndex) {
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        const page = await pdf.getPage(pageIndex + 1);
        const textContent = await page.getTextContent();

        return textContent.items.map(item => item.str).join(" ");
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