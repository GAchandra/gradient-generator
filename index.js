const gredientCode = document.querySelector('#gredient-code');


const copyToClipboard = () => {
    if (gredientCode.style.textDecoration !== 'line-through') {
        const textarea = document.createElement('textarea');

        // Move it off-screen.
        textarea.style.cssText = 'position: absolute; left: -99999em';

        // Set to readonly to prevent mobile devices opening a keyboard when
        // text is .select()'ed.
        textarea.setAttribute('readonly', true);

        document.body.appendChild(textarea);
        textarea.value = gredientCode.innerText;

        // Check if there is any content selected previously.
        const selected = document.getSelection().rangeCount > 0 ?
            document.getSelection().getRangeAt(0) : false;

        // iOS Safari blocks programmatic execCommand copying normally, without this hack.
        // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            const editable = textarea.contentEditable;
            textarea.contentEditable = true;
            const range = document.createRange();
            range.selectNodeContents(textarea);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            textarea.setSelectionRange(0, 999999);
            textarea.contentEditable = editable;
        }
        else {
            textarea.select();
        }

        try {
            const result = document.execCommand('copy');

            // Restore previous selection.
            if (selected) {
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
            }
            gredientCode.style.textDecoration = 'line-through';
            alert("The Gradient is copyed to your clipboard.");
            return result;
        }
        catch (err) {
            console.error(err);
            return false;
        }


    }
    else {
        alert("You already copy the gradient in to your clipboard.");
        return false;
    }


};

const colorLeftInput = document.querySelector('#color-left');
const colorRightInput = document.querySelector('#color-right');

const updateBackground = (gredientCode) => {
    const gradient = gredientCode.split(': ')[1].split(';')[0];
    document.body.style.background = gradient;
}

const changeGradient = () => {
    gredientCode.style.textDecoration = 'none';
    const gredient = `background-image: linear-gradient(to left, ${colorLeftInput.value}, ${colorRightInput.value});`
    updateBackground(gredient);
    gredientCode.innerText = gredient;
}

[colorLeftInput, colorRightInput].forEach(colorInput => colorInput.addEventListener('input', changeGradient))
gredientCode.addEventListener('click', copyToClipboard);