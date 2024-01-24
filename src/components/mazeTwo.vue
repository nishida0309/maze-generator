<script setup>
// import { createMaze } from "@/module/maze2.js";

import { ref, onMounted } from "vue";
// import { maze } from "@/module/maze1.js";
const height = 33;
const width = 33;
const maze = ref([]);
maze.value = Array(height).fill(null).map(() => Array(width).fill(1)); // 1は壁
// const create = () => {
//   maze.value = createMaze(height, width);
//   console.log(maze.value);

// }
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function createMaze(width, height) {

  // 乱数生成関数
  function rand(n) {
    return Math.floor(Math.random() * n);
  }
  // 掘れる方向を取得
  function getDirections(x, y) {
    const directions = [];
    if (x > 1 && maze.value[y][x - 2] === 1) directions.push([-1, 0]);
    if (x < width - 2 && maze.value[y][x + 2] === 1) directions.push([1, 0]);
    if (y > 1 && maze.value[y - 2][x] === 1) directions.push([0, -1]);
    if (y < height - 2 && maze.value[y + 2][x] === 1) directions.push([0, 1]);
    return directions;
  }

  // 穴を掘る関数
  const dig = async(x, y)=> {
    maze.value[y][x] = 0; // 0は通路
    let directions = getDirections(x, y);

    while (directions.length) {
      await delay(100);
      const [dx, dy] = directions.splice(rand(directions.length), 1)[0];
      const nx = x + dx * 2, ny = y + dy * 2;

      if (maze.value[ny][nx] === 1) {
        maze.value[ny][nx] = 0;
        maze.value[y + dy][x + dx] = 0;
        dig(nx, ny);
      }
      directions = getDirections(x, y);
    }
  }
  // スタート地点から掘り始める
  dig(1, 1);
}
</script>
<template>
    <button @click="createMaze(width, height)">作成</button>
    <div class="flex" v-for="(row, index) in maze" :key="index">
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