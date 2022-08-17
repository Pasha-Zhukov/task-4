const readlineSync = require("readline-sync");

let healthPlayer = getNumber();

const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

const battleMage = {
    maxHealth: healthPlayer,
    name: "Евстафий ",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

let attackName = '';
let getAtackBot = '';
let getAtackPlayer = 0;
let cooldown3 = 0;
let cooldown2 = 0;
let cooldown22 = 0;
let cooldown33 = 0;
let cooldown44 = 0;

function getNumber() {
    console.log("Установить сложность игры (например 10) ");
    return readlineSync.question(">>> ");
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Функция которая генерирует удар компьютера с учетом условия игры ('cooldown')
function randomComputerMove() {
    getAtackBot = getRandom(0, 2)
    if (getAtackBot == 2 && cooldown3 < 1) {
        cooldown3 = 2 + 1;
        getAtackBot = 2;
    }
    else if (getAtackBot == 1 && cooldown2 < 1) {
        cooldown2 = 3 + 1;
        getAtackBot = 1;
    } else getAtackBot = 0;

    if (getAtackBot == 2 || getAtackBot == 1 || (getAtackBot == 0 && cooldown3 > 0 || cooldown2 > 0)) {
        cooldown3 = cooldown3 - 1;
        cooldown2 = cooldown2 - 1;
        cooldown3 < 0 ? cooldown3 = 0 : cooldown3 = cooldown3;
        cooldown2 < 0 ? cooldown2 = 0 : cooldown3 = cooldown3;
    }
    attackName = monster.moves[getAtackBot].name;
}

function start() {
    randomComputerMove();
    console.log(`Сейчас Лютый применит ${attackName}`)
    function getNumberConsole() {
        console.log(`
        Выберете один из четырех ударов и введите его номер в консоль:
        1) "Удар боевым кадилом"
        2) "Вертушка левой пяткой"
        3) "Каноничный фаербол"
        4) "Магический блок"
    `)
        return readlineSync.question("==> ");
    }
    getAtackPlayer = getNumberConsole();

    if (getAtackPlayer > 4 || getAtackPlayer <= 0) {
        console.log('Выберите удар от 1 до 4')
        start();
    };

    if (getAtackPlayer == 1) {
        batteryCooldown();
    } else if (getAtackPlayer == 2 && cooldown22 < 1) {
        cooldown22 = 5;
        batteryCooldown();
    } else if (getAtackPlayer == 3 && cooldown33 < 1) {
        cooldown33 = 4;
        batteryCooldown();
    } else if (getAtackPlayer == 4 && cooldown44 < 1) {
        cooldown44 = 5;
        batteryCooldown();
    } else {
        console.log(`Вы не можете использовать это действие, выбирите другое`);
        randomComputerMove();
        console.log(`Сейчас Лютый применит ${attackName}`);
        getAtackPlayer = getNumberConsole();
        batteryCooldown();
    }
    //Функция аккмулятор для (cooldown).
    function batteryCooldown() {
        if (getAtackPlayer == 2 || getAtackPlayer == 3 || getAtackPlayer == 4 || (getAtackBot == 1 && (cooldown22 > 0 || cooldown33 > 0 || cooldown44 > 0))) {
            cooldown22 = cooldown22 - 1;
            cooldown33 = cooldown33 - 1;
            cooldown44 = cooldown44 - 1;
            cooldown22 < 0 ? cooldown22 = 0 : cooldown22 = cooldown22;
            cooldown33 < 0 ? cooldown33 = 0 : cooldown33 = cooldown33;
            cooldown44 < 0 ? cooldown44 = 0 : cooldown44 = cooldown44;
        }
        playersFight();
    };
}
start();
// Функция выполняющая сражение.
function playersFight() {
    // Получаем в переменные данные из обьекта.
    a = monster.moves[getAtackBot].physicalDmg;  // физический урон
    b = monster.moves[getAtackBot].magicDmg;  // магический урон
    c = monster.moves[getAtackBot].physicArmorPercents;  // физическая броня
    d = monster.moves[getAtackBot].magicArmorPercents;  // магическая броня

    aa = battleMage.moves[getAtackPlayer - 1].physicalDmg;  // физический урон
    bb = battleMage.moves[getAtackPlayer - 1].magicDmg;  // магический урон
    cc = battleMage.moves[getAtackPlayer - 1].physicArmorPercents;  // физическая броня
    dd = battleMage.moves[getAtackPlayer - 1].magicArmorPercents;  // магическая броня

    // Используем данные и висчитываем урон.
    healthPlayer = healthPlayer - (a - (cc / 100 * a)) - (b - (dd / 100 * b));
    monster.maxHealth = monster.maxHealth - (aa - (c / 100 * aa)) - (bb - (d / 100 * bb));
    // Приводим к числу и округляем до одного знака после запятой.
    healthPlayer = parseInt(healthPlayer).toFixed(1);
    monster.maxHealth = monster.maxHealth.toFixed(1)



    if (healthPlayer < monster.maxHealth && healthPlayer <= 0) {
        console.log('Вы проиграли')
    } else if (healthPlayer > monster.maxHealth && monster.maxHealth <= 0) {
        console.log('Вы выиграли')
    } else {
        console.log(`Текущее здоровье Евстафия ${healthPlayer}`);
        console.log(`Текущее здоровье Лютого ${monster.maxHealth}`);
        start();
    }
}

