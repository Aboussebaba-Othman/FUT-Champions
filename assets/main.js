
function switchform() {
    const position = document.getElementById('position').value;
    const outfieldFields = document.getElementById('palyer');
    const goalkeeperFields = document.getElementById('gGoalkeeper');

    if (position === 'GK') {
        outfieldFields.classList.add('hidden');
        goalkeeperFields.classList.remove('hidden');
    } else {
        outfieldFields.classList.remove('hidden');
        goalkeeperFields.classList.add('hidden');
    }
}