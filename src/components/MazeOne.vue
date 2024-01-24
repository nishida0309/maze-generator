<script setup>
import { ref, onMounted } from "vue";

const height = 33;
const width = 33;
const maze = ref([]);

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function rand(n) {
  return Math.floor(Math.random() * n);
}

function createArray(height, width) {
  // 迷路のベースを作る
  for (let y = 1; y < height + 1; y++) {
    maze.value[y] = [];
    for (let x = 1; x < width + 1; x++) {
      // 1行目と最終行、1列目と最終列は1
      if (y == 1 || y == height || x == 1 || x == width) {
        maze.value[y][x] = 1;
      }
      // 奇数行の奇数列は1
      else if (y % 2 == 1 && x % 2 == 1) {
        maze.value[y][x] = 1;
      }
      // そのほかは0
      else {
        maze.value[y][x] = 0;
      }
    }
  }
}

const createMazeArray = async (height, width) => {
  for (let y = 3; y < height; y += 2) {
    for (let x = 3; x < width; x += 2) {
      await delay(100);
      // 棒を倒せる方向を配列にする
      // 右と下は全パターンでOK
      const direction = ["right", "down"];
      // 1回目なら上もOK
      if (y == 3) {
        direction.push("up");
      }
      // 左が壁じゃなければ左もOK
      if (maze.value[y][x - 1] == 0) {
        direction.push("left");
      }
      switch (direction[rand(direction.length)]) {
        case "up":
          maze.value[y - 1][x] = 1;
          break;
        case "right":
          maze.value[y][x + 1] = 1;
          break;
        case "down":
          maze.value[y + 1][x] = 1;
          break;
        case "left":
          maze.value[y][x - 1] = 1;
          break;
      }
    }
  }
  // 入口と出口を作成
  maze.value[1][2] = 0;
  maze.value[height][width - 1] = 0;
}

onMounted(() => {
  createArray(height, width);
});

</script>
<template>
  <h1>棒倒し法</h1>
  <button @click="createMazeArray(height, width)">作成</button>
  <div class="flex" v-for="(row,index) in maze" :key="index">
    <div v-for="(cell, index) in row" :key="index">
      <div class="flex">
        <div v-if="cell === 1" class="wall"></div>
        <div v-else-if="cell === 0" class="blank"></div>

        <!-- <div class="cell">{{ cell }}</div> -->

      </div>
    </div>
  </div>
</template>
<style scoped >
.flex {
  display: flex;
}
.wall {
  width: 10px;
  height: 10px;
  background-color: black;
}
.blank {
  width: 10px;
  height: 10px;
  background-color: white;
}
.cell{
  width: 15px;
  height: 15px;

}
</style>