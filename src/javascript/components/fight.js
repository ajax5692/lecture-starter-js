import controls from '../../constants/controls';

// main combat math logic

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;
    return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    return Math.max(0, hitPower - blockPower);
}

// main async fight function

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const p1 = { ...firstFighter, currentHealth: firstFighter.health };
        const p2 = { ...secondFighter, currentHealth: secondFighter.health };

        const p1Bar =
            document.getElementById('left-fighter-indicator') || document.querySelector('.arena___health-bar');
        const p2Bar =
            document.getElementById('right-fighter-indicator') || document.querySelectorAll('.arena___health-bar')[1];

        const activeKeys = new Set();

        let p1LastCritTime = 0;
        let p2LastCritTime = 0;

        let handleKeyDown;
        let handleKeyUp;

        function endFight(winner) {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            resolve(winner);
        }

        handleKeyUp = event => {
            activeKeys.delete(event.code);
        };

        handleKeyDown = event => {
            const key = event.code;
            activeKeys.add(key);

            const currentTime = Date.now();

            // P1 critical combo check

            const isP1CritCombo = controls.PlayerOneCriticalHitCombination.every(critKey => activeKeys.has(critKey));
            if (isP1CritCombo && currentTime - p1LastCritTime >= 10000) {
                p1LastCritTime = currentTime;

                const p1CritDamage = p1.attack * 2;
                p2.currentHealth = Math.max(0, p2.currentHealth - p1CritDamage);

                if (p2Bar) {
                    p2Bar.style.width = `${(p2.currentHealth / p2.health) * 100}%`;
                }

                if (p2.currentHealth <= 0) {
                    endFight(firstFighter);
                    return;
                }
            }

            // P2 critical combo check

            const isP2CritCombo = controls.PlayerTwoCriticalHitCombination.every(critKey => activeKeys.has(critKey));
            if (isP2CritCombo && currentTime - p2LastCritTime >= 10000) {
                p2LastCritTime = currentTime;

                const p2CritDamage = p2.attack * 2;
                p1.currentHealth = Math.max(0, p1.currentHealth - p2CritDamage);

                if (p1Bar) {
                    p1Bar.style.width = `${(p1.currentHealth / p1.health) * 100}%`;
                }

                if (p1.currentHealth <= 0) {
                    endFight(secondFighter);
                    return;
                }
            }

            // P1 standard attack (KeyA)

            if (key === controls.PlayerOneAttack) {
                // P1 cannot strike if he is in a block.
                if (!activeKeys.has(controls.PlayerOneBlock)) {
                    const p2IsBlocking = activeKeys.has(controls.PlayerTwoBlock);

                    // if P2 blocks, they evade the attack completely (0 damage)
                    let damage = 0;
                    if (!p2IsBlocking) {
                        damage = getHitPower(p1);
                    }

                    p2.currentHealth = Math.max(0, p2.currentHealth - damage);

                    if (p2Bar) {
                        p2Bar.style.width = `${(p2.currentHealth / p2.health) * 100}%`;
                    }

                    if (p2.currentHealth <= 0) {
                        endFight(firstFighter);
                        return;
                    }
                }
            }

            // P2 standard attack (KeyL)

            if (key === controls.PlayerTwoAttack) {
                // P2 cannot strike if he is in a block.
                if (!activeKeys.has(controls.PlayerTwoBlock)) {
                    const p1IsBlocking = activeKeys.has(controls.PlayerOneBlock);

                    // if P1 blocks, they evade the attack completely (0 damage)
                    let damage = 0;
                    if (!p1IsBlocking) {
                        damage = getHitPower(p2);
                    }

                    p1.currentHealth = Math.max(0, p1.currentHealth - damage);

                    if (p1Bar) {
                        p1Bar.style.width = `${(p1.currentHealth / p1.health) * 100}%`;
                    }

                    if (p1.currentHealth <= 0) {
                        endFight(secondFighter);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    });
}
