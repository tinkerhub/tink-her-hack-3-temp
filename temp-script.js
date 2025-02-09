
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find & Replace in PDF</title>
    <link rel="stylesheet" href="styles.css">
   
    
    <script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
    <script>
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
    </script>
</head>
<body>

    <header>
        <h2>PDF Word Replacer</h2>
        <h3>Presented by SSET MADIYANZZ</h3>
        <p>Upload a PDF, replace words, and download the updated file!</p>
    </header>

    <main class="container">
        <input type="file" id="fileInput" accept="application/pdf">

        <label for="oldWord">Find word:</label>
        <input type="text" id="oldWord" placeholder="Enter word to replace">

        <label for="newWord">Replace with:</label>
        <input type="text" id="newWord" placeholder="Enter new word">

        <button id="replaceBtn">Replace & Download</button>
    </main>

    <script src="script.js"></script>

</body>
</html>
