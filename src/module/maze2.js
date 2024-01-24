// export function createMaze(width, height) {
//     const maze = Array(height).fill(null).map(() => Array(width).fill(1)); // 1は壁

//     // 乱数生成関数
//     function rand(n) {
//         return Math.floor(Math.random() * n);
//     }

//     // 掘れる方向を取得
//     function getDirections(x, y) {
//         const directions = [];
//         if (x > 1 && maze[y][x - 2] === 1) directions.push([-1, 0]);
//         if (x < width - 2 && maze[y][x + 2] === 1) directions.push([1, 0]);
//         if (y > 1 && maze[y - 2][x] === 1) directions.push([0, -1]);
//         if (y < height - 2 && maze[y + 2][x] === 1) directions.push([0, 1]);
//         return directions;
//     }

//     // 穴を掘る関数
//     function dig(x, y) {
//         maze[y][x] = 0; // 0は通路
//         let directions = getDirections(x, y);

//         while (directions.length) {
//             const [dx, dy] = directions.splice(rand(directions.length), 1)[0];
//             const nx = x + dx * 2, ny = y + dy * 2;

//             if (maze[ny][nx] === 1) {
//                 maze[ny][nx] = 0;
//                 maze[y + dy][x + dx] = 0;
//                 dig(nx, ny);
//             }
//             directions = getDirections(x, y);
//         }
//     }

//     // スタート地点から掘り始める
//     dig(1, 1);
//     console.log(maze);
//     return maze;
// }
