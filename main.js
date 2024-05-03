const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerPos = { x: canvas.width / 2, y: canvas.height / 2 , hp: 3 };
const enemies = [];
const enemySpeed = 2;
let lastEnemySpawnTime = 0;
const enemySpawnRate = 10; // 적 생성 간격 (밀리초)
let gameOver = false;
let playerHp = 3;

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
}

function spawnEnemy() {
    const side = Math.floor(Math.random() * 4);
    const position = Math.random();
    let x, y;
    switch (side) {
        case 0: // 위
            x = position * canvas.width;
            y = -20;
            break;
        case 1: // 오른쪽
            x = canvas.width + 20;
            y = position * canvas.height;
            break;
        case 2: // 아래
            x = position * canvas.width;
            y = canvas.height + 20;
            break;
        case 3: // 왼쪽
            x = -20;
            y = position * canvas.height;
            break;
    }
    const angle = Math.atan2(playerPos.y - y, playerPos.x - x);
    const speed = enemySpeed;
    enemies.push({ x, y, speed, angle });
}

function checkCollision(player, enemy) {
    const distance = Math.sqrt((player.x - enemy.x) ** 2 + (player.y - enemy.y) ** 2);
    return distance < 30 + 10; // 플레이어 반지름(30) + 적 반지름(10)
}






requestAnimationFrame(update);
