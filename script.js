document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('journal-form');
    const journalEntries = JSON.parse(localStorage.getItem('journals')) || [];
    
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const newEntry = {
                date: new Date().toLocaleDateString(),
                difficulty: document.getElementById('difficulty').value,
                solution: document.getElementById('solution').value,
                memorable: document.getElementById('memorable').value,
                emotion: document.getElementById('emotion').value,
                gratitude: document.getElementById('gratitude').value,
                positiveWord: document.getElementById('positive-word').value,
            };
            journalEntries.push(newEntry);
            localStorage.setItem('journals', JSON.stringify(journalEntries));
            alert('Jurnal berhasil disimpan!');
            form.reset();
        });
    }

    const journalContainer = document.getElementById('journal-entries');
    if (journalContainer) {
        function renderJournals(filter = 'all') {
            journalContainer.innerHTML = '';
            const filteredEntries = filter === 'all' ? journalEntries : journalEntries.filter(entry => entry.emotion === filter);
            filteredEntries.forEach(entry => {
                const div = document.createElement('div');
                div.className = 'journal-entry';
                div.innerHTML = `<strong>${entry.date}</strong> - ${entry.emotion}<br>✨ ${entry.difficulty}<br>💡 ${entry.solution}<br>🎯 ${entry.memorable}<br>🌟 ${entry.gratitude}<br>💬 ${entry.positiveWord}`;
                journalContainer.appendChild(div);
            });
        }

        renderJournals();
        document.getElementById('filter-emotion').addEventListener('change', (event) => {
            renderJournals(event.target.value);
        });
    }
});
