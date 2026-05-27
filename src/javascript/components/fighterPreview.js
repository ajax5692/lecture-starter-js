import createElement from '../helpers/domHelper';

// RGB animation
if (!document.getElementById('rgb-animation-style')) {
    const style = document.createElement('style');
    style.id = 'rgb-animation-style';
    style.innerHTML = `
        @keyframes rgbGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .rgb-text-effect {
            background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000);
            background-size: 400% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rgbGlow 6s linear infinite;
        }
    `;
    document.head.appendChild(style);
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (!fighter) {
        return fighterElement;
    }

    // main vertical container
    fighterElement.style.display = 'flex';
    fighterElement.style.flexDirection = 'column';
    fighterElement.style.gap = '15px';

    fighterElement.style.flexBasis = '650px';
    fighterElement.style.width = '650px';

    if (position === 'left') {
        fighterElement.style.alignItems = 'flex-start';
    } else {
        fighterElement.style.alignItems = 'flex-end';
    }

    // overhead name
    const nameElement = createElement({
        tagName: 'h3',
        className: 'fighter-preview___name rgb-text-effect'
    });
    nameElement.innerText = fighter.name;
    nameElement.style.fontSize = '80px';
    nameElement.style.fontWeight = 'bold';
    nameElement.style.margin = '0';
    nameElement.style.lineHeight = '1.1';

    // sub-row component layout
    const rowContainer = createElement({ tagName: 'div' });
    rowContainer.style.display = 'flex';
    rowContainer.style.flexDirection = 'row';
    rowContainer.style.alignItems = 'center';
    rowContainer.style.gap = '15px';
    rowContainer.style.width = '100%';

    const imageElement = createFighterImage(fighter);

    // lock the image down so it stays a constant layout width
    imageElement.style.flexShrink = '0';

    const detailsElement = createElement({
        tagName: 'div',
        className: 'fighter-preview___details'
    });

    detailsElement.style.textAlign = 'left';

    detailsElement.style.minWidth = '350px';
    detailsElement.style.flexShrink = '0';

    // player stats styles
    const healthElement = createElement({
        tagName: 'p',
        className: 'rgb-text-effect'
    });
    healthElement.innerText = `❤Health: ${fighter.health}`;
    healthElement.style.margin = '10px 0';
    healthElement.style.fontSize = '60px';
    healthElement.style.fontWeight = 'bold';
    healthElement.style.whiteSpace = 'nowrap';
    healthElement.style.lineHeight = '1.1';

    const attackElement = createElement({
        tagName: 'p',
        className: 'rgb-text-effect'
    });
    attackElement.innerText = `⚔ Attack: ${fighter.attack}`;
    attackElement.style.margin = '10px 0';
    attackElement.style.fontSize = '60px';
    attackElement.style.fontWeight = 'bold';
    attackElement.style.whiteSpace = 'nowrap';
    attackElement.style.lineHeight = '1.1';

    const defenseElement = createElement({
        tagName: 'p',
        className: 'rgb-text-effect'
    });
    defenseElement.innerText = `🛡 Defense: ${fighter.defense}`;
    defenseElement.style.margin = '10px 0';
    defenseElement.style.fontSize = '60px';
    defenseElement.style.fontWeight = 'bold';
    defenseElement.style.whiteSpace = 'nowrap';
    defenseElement.style.lineHeight = '1.1';

    detailsElement.append(healthElement, attackElement, defenseElement);

    // mirroring presentation logic based on position
    if (position === 'right') {
        rowContainer.append(imageElement, detailsElement);
    } else {
        rowContainer.append(detailsElement, imageElement);
    }

    // final assembly
    fighterElement.append(nameElement, rowContainer);

    return fighterElement;
}
