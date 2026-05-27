import createElement from '../../helpers/domHelper';
import showModal from './modal';

// ensuring the winner-specific grand styles and RGB keyframes are mounted
if (!document.getElementById('winner-grand-styles')) {
    const style = document.createElement('style');
    style.id = 'winner-grand-styles';
    style.innerHTML = `
        @keyframes winnerRgbGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .winner-grand-title {
            background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000);
            background-size: 400% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: winnerRgbGlow 4s linear infinite;
            font-size: 90px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin: 10px 0;
            text-align: center;
            line-height: 1.1;
        }
        .winner-modal-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 20px;
        }
        .winner-grand-subtitle {
            font-size: 32px;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 0;
            font-family: monospace;
        }
        /* Style for the instruction text */
        .winner-restart-instruction {
            font-size: 18px;
            color: #aaaaaa;
            font-family: monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 10px;
            text-align: center;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

export default function showWinnerModal(fighter) {
    // create a centralized grand layout container for the modal body
    const modalBody = createElement({ tagName: 'div', className: 'winner-modal-body' });

    // create a grand victory subtitle
    const subtitleElement = createElement({ tagName: 'h4', className: 'winner-grand-subtitle' });
    subtitleElement.innerText = '🏆 MATCH WINNER 🏆';

    // create big, RGB title showing the champion's name
    const titleElement = createElement({ tagName: 'h1', className: 'winner-grand-title' });
    titleElement.innerText = fighter.name;

    // create a clean representation of the fighter's image
    const imageElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes: {
            src: fighter.source,
            alt: fighter.name,
            title: fighter.name
        }
    });
    imageElement.style.height = '300px';
    imageElement.style.objectFit = 'contain';

    // create the restart instruction element
    const restartInstructionElement = createElement({
        tagName: 'p',
        className: 'winner-restart-instruction'
    });
    restartInstructionElement.innerText = 'Refresh the page to restart the game';

    // assemble the components inside our body panel wrapper (added restartInstructionElement at the end)
    modalBody.append(subtitleElement, titleElement, imageElement, restartInstructionElement);

    // trigger the global modal layout utility to show the celebration
    showModal({
        title: 'VICTORY!',
        bodyElement: modalBody,
        onClose: () => {
            // reload the page to return safely to the selection dashboard
            window.location.reload();
        }
    });
}
