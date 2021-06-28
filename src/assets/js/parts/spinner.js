  
class Spinner {
    handleClear() {
        ROOT_SPINNER.innerHTML = '';
    }

    render() {
        const html = `
            <div class="spinner-container">
                <img class="spinner__img" src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
                
                </div>
        `;

        ROOT_SPINNER.innerHTML = html;
    }
}

const spinnerPage = new Spinner();
