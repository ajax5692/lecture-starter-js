import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call the base modal function passing a title and the fighter content body
    showModal({
        title: `${fighter.name} wins the battle!`,
        bodyElement: fighter.name
    });
}
