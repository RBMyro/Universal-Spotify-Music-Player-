// builds and ijects whatever's needed to make a chosen font actually work in the widget.
// It tells the css which font to use via custom property.
function applyfont(font) {
    if (font.type === 'google') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=' + font.name.replace(/ /g, '+') + '&display=swap';
        document.head.appendChild(link);
    } else if (font.type === 'file') {
        // A local font file is used, so we need to create a @font-face rule and inject it into the document.
        const style = document.createElement('style');
        style.textContent = `
        @font-face {
            font-family: '${font.name}';
            src: url('${font.file}');
        }
        `;
        document.head.appendChild(style);
    }
    // Either way, tell the css which font name (plus fallback) to actually use.
    document.documentElement.style.setProperty('--widget-font', `'${font.name}', ${font.fallback}`);
}

async function loadSettings() {
    try {
        const response = await fetch('config.json');
        const settings = await response.json();

        document.getElementById('brandText').textContent = settings.brandText;
        document.getElementById('subtitleText').textContent = settings.subtitleText;

        applyFont(settings.font);
    } catch (error) {
        console.log('Failed to load config.json - check the file exists and is valid JSON.', error);
    }
}

loadSettings();
