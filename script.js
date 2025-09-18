document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsDisplay = document.getElementById('resultsDisplay');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('error-message');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (!query) {
            return;
        }

        // Show loading indicator and hide previous results/errors
        loadingIndicator.style.display = 'block';
        resultsDisplay.style.display = 'none';
        errorMessage.style.display = 'none';
        resultsDisplay.innerHTML = '';

        // Simulate API call
        fetch(`/search?q=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(results => {
                loadingIndicator.style.display = 'none';
                resultsDisplay.style.display = 'block';

                if (results.length === 0) {
                    resultsDisplay.innerHTML = '<p>No results found.</p>';
                } else {
                    results.forEach(result => {
                        const resultElement = document.createElement('div');
                        resultElement.classList.add('result');
                        resultElement.innerHTML = `
                            <h3><a href="${result.url}" target="_blank">${result.title}</a></h3>
                            <p>${result.snippet}</p>
                        `;
                        resultsDisplay.appendChild(resultElement);
                    });
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                loadingIndicator.style.display = 'none';
                errorMessage.style.display = 'block';
            });
    });
});
