class Error {
    render(){
        const html = `
        <div class="error-container">
            <div class="error-message">
                <h2>No Acces!</h2>
                <p>Try another time</p>
            </div>
        </div>
    `;
        ROOT_ERROR.innerHTML = html;
    }
}
const errorPage = new Error();