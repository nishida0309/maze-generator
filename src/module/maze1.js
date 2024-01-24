

  function rand(n) {
    return Math.floor(Math.random() * n);
  }

  
  // 迷路のベースを作る
export function createArray(height, width){
  const maze = [];
    // 迷路のベースを作る
    for(let y = 1; y < height+1; y++){
      maze[y] = [];
      for(let x = 1; x < width+1; x++){
        // 1行目と最終行、1列目と最終列は1
        if(y == 1 || y == height || x == 1 || x == width){
        maze[y][x] = 1;
        }
        // 奇数行の奇数列は1
        else if(y % 2 == 1 && x % 2 == 1){
        maze[y][x] = 1;
        }
        // そのほかは0
        else{
        maze[y][x] = 0;
        }
      }
    }

  return maze
}

// 迷路を作成
export const createMazeArray = (height, width,maze) => {
  for(let y = 3; y < height; y+=2){
    for(let x = 3; x < width; x+=2){
      // 棒を倒せる方向を配列にする
      // 右と下は全パターンでOK
      const direction = ["right", "down"];
      // 1回目なら上もOK
      if(y == 3){
      direction.push("up");
      }
      // 左が壁じゃなければ左もOK
      if(maze[y][x-1] == 0){
      direction.push("left");
      }
      switch (direction[rand(direction.length)]) {
        case "up":
          maze[y-1][x] = 1;
          break;
        case "right":
          maze[y][x+1] = 1;
          break;
        case "down":
          maze[y+1][x] = 1;
          break;
        case "left":
          maze[y][x-1] = 1;
          break;
      }
    }
  }
  // 入口と出口を作成
  maze[1][2] = 0;
  maze[height][width - 1] = 0;
  return maze
}