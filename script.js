document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const flipBtn = document.getElementById('flip-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const addBtn = document.getElementById('add-btn');
    const downloadBtn = document.getElementById('download-btn');
    const termInput = document.getElementById('term-input');
    const definitionInput = document.getElementById('definition-input');
    const termElement = document.getElementById('term');
    const definitionElement = document.getElementById('definition');

    const flashcards = [];
    let currentIndex = 0;

    function updateCard() {
        if (flashcards.length > 0) {
            termElement.textContent = flashcards[currentIndex].term;
            definitionElement.textContent = flashcards[currentIndex].definition;
        }
    }

    flipBtn.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    prevBtn.addEventListener('click', () => {
        if (flashcards.length > 0) {
            currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
            updateCard();
            flashcard.classList.remove('flipped');
        }
    });

    nextBtn.addEventListener('click', () => {
        if (flashcards.length > 0) {
            currentIndex = (currentIndex + 1) % flashcards.length;
            updateCard();
            flashcard.classList.remove('flipped');
        }
    });

    addBtn.addEventListener('click', () => {
        const term = termInput.value.trim();
        const definition = definitionInput.value.trim();

        if (term && definition) {
            flashcards.push({ term, definition });
            termInput.value = '';
            definitionInput.value = '';
            if (flashcards.length === 1) updateCard();
        }
    });

    downloadBtn.addEventListener('click', () => {
        if (flashcards.length > 0) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            flashcards.forEach((card, index) => {
                if (index > 0) doc.addPage();
                doc.setFontSize(22);
                doc.text('Term: ' + card.term, 10, 20);
                doc.text('Definition: ' + card.definition, 10, 40);
            });

            doc.save('flashcards.pdf');
        }
    });
});
