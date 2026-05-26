import createElement from '../helpers/domHelper';
import renderArena from './arena';
import versusImg from '../../../resources/versus.png';
import { createFighterPreview } from './fighterPreview';
import fightersService from '../services/fightersService'; // this path can be adjusted based on your project structure

const fighterDetailsMap = new Map();

export async function getFighterInfo(fighterId) {
    try {
        // sanity check if we already fetched this fighter's details before
        if (fighterDetailsMap.has(fighterId)) {
            return fighterDetailsMap.get(fighterId);
        }

        const fighterDetails = await fightersService.getFighterDetails(fighterId);

        fighterDetailsMap.set(fighterId, fighterDetails);

        return fighterDetails;
    } catch (error) {
        console.error('Failed to load fighter info:', error);
        throw error;
    }
}

function startFight(selectedFighters) {
    renderArena(selectedFighters);
}

function createVersusBlock(selectedFighters) {
    const canStartFight = selectedFighters.filter(Boolean).length === 2;
    const onClick = () => startFight(selectedFighters);
    const container = createElement({ tagName: 'div', className: 'preview-container___versus-block' });
    const image = createElement({
        tagName: 'img',
        className: 'preview-container___versus-img',
        attributes: { src: versusImg }
    });
    const disabledBtn = canStartFight ? '' : 'disabled';
    const fightBtn = createElement({
        tagName: 'button',
        className: `preview-container___fight-btn ${disabledBtn}`
    });

    fightBtn.addEventListener('click', onClick, false);
    fightBtn.innerText = 'Fight';
    container.append(image, fightBtn);

    return container;
}

function renderSelectedFighters(selectedFighters) {
    const fightersPreview = document.querySelector('.preview-container___root');
    const [playerOne, playerTwo] = selectedFighters;
    const firstPreview = createFighterPreview(playerOne, 'left');
    const secondPreview = createFighterPreview(playerTwo, 'right');
    const versusBlock = createVersusBlock(selectedFighters);

    fightersPreview.innerHTML = '';
    fightersPreview.append(firstPreview, versusBlock, secondPreview);
}

export function createFightersSelector() {
    let selectedFighters = [];

    return async (event, fighterId) => {
        const fighter = await getFighterInfo(fighterId);
        const [playerOne, playerTwo] = selectedFighters;
        const firstFighter = playerOne ?? fighter;
        const secondFighter = playerOne ? playerTwo ?? fighter : playerTwo;
        selectedFighters = [firstFighter, secondFighter];

        renderSelectedFighters(selectedFighters);
    };
}
