<template>
  <div class="neodb-container">
    <!-- 导航栏 -->
    <nav class="neodb-nav">
      <span
        v-for="item in types"
        :key="item"
        class="neodb-navItem"
        :class="{ current: state.type === item }"
        @click="handleTypeClick(item)"
      >
        {{ item }}
      </span>
    </nav>

    <!-- 全局调试信息 -->
    <div v-if="state.isLoading && state.subjects.length === 0" class="neodb-loading">
      NeoDB 数据加载中，请稍候...
    </div>

    <!-- 无数据提示 -->
    <div v-if="!state.isLoading && state.subjects.length === 0" class="neodb-no-data">
      抱歉，暂无数据！
    </div>

    <!-- 数据列表 -->
    <div class="neodb-list">
      <div
        v-for="subject in state.subjects"
        :key="subject.item.id"
        class="neodb-item"
      >
        <!-- 封面图片加载失败时显示提示 -->
        <div
          v-if="subject.imageError"
          class="neodb-image-error"
          :class="{ 'image-error-border': subject.imageError }"
        >
          <i class="fa-solid fa-face-sad-cry"></i>，需和谐上网！
        </div>
        <img
          v-else
          :src="subject.item.cover_image_url"
          class="neodb-image"
          @error="handleImageError(subject)"
          loading="lazy"
        />
        <!-- 评分 -->
        <div class="neodb-score" v-if="subject.item.rating">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"
            ></path>
          </svg>
          {{ subject.item.rating }}
        </div>
        <!-- 标题 -->
        <div class="neodb-title">
          <a :href="subject.item.id" target="_blank">{{ subject.item.title }}</a>
        </div>
      </div>
    </div>

    <!-- 加载更多 -->
    <div class="block-more block-more__centered" v-if="!state.finished && state.subjects.length > 0">
      <div class="lds-ripple"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from "vue";

// 常量定义
const types = ["book", "movie", "tv", "music", "game"];
const baseAPI = "https://db.211777.xyz/api";

// 状态管理
const state = reactive({
  type: "movie",
  status: "complete",
  finished: false,
  paged: 1,
  subjects: [],
  isLoading: false, // 加载状态锁
});

// 获取数据
const fetchData = async () => {
  if (state.isLoading || state.finished) return; // 如果正在加载或没有更多数据，则退出
  state.isLoading = true; // 加锁

  const params = new URLSearchParams({
    type: state.status,
    category: state.type,
    page: state.paged.toString(),
  });

  const url = `${baseAPI}?${params.toString()}`;
  console.log("Fetching data from:", url);

  try {
    const response = await fetch(url);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);

    if (data.length) {
      // 过滤重复项
      const newData = data.filter(
        (item) =>
          !state.subjects.some(
            (existing) => existing.item.id === item.item.id
          )
      );
      state.subjects = [...state.subjects, ...newData];
    } else {
      state.finished = true; // 没有更多数据
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    state.isLoading = false; // 解锁
  }
};

// 处理导航项点击
const handleTypeClick = (type) => {
  if (state.type === type) return;
  state.type = type;
  state.paged = 1;
  state.finished = false;
  state.subjects = [];
  fetchData();
};

// 处理图片加载失败
const handleImageError = (subject) => {
  console.error("Image failed to load:", subject.item.cover_image_url);
  subject.imageError = true; // 标记图片加载失败
};

// 防抖函数
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// 处理滚动加载
const handleScroll = debounce(() => {
  const scrollY = window.scrollY || window.pageYOffset;
  const moreElement = document.querySelector(".block-more");

  if (
    moreElement &&
    moreElement.offsetTop + moreElement.clientHeight <= scrollY + window.innerHeight &&
    !state.finished &&
    !state.isLoading
  ) {
    state.paged++;
    fetchData();
  }
}, 200); // 防抖延迟 200ms

// 生命周期钩子
onMounted(() => {
  fetchData();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 样式部分保持不变 */
.neodb-container {
  --db-item-width: 150px;
  --db-item-height: 180px;
  --db-primary-color: var(--theme-color);
  --db-background-white: var(--bg-color);
  --db-background-gray: var(--bg-color-secondary);
  --db-border-color: var(--border-color);
  --db-text-light: var(--text-light-color);
}

.neodb-nav {
  padding: 30px 0 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.neodb-navItem {
  font-size: 20px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  transition: 0.5s border-color;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-right: 20px;
}

.neodb-navItem.current,
.neodb-navItem:hover {
  border-color: var(--db-primary-color);
}

.neodb-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.neodb-item {
  width: var(--db-item-width);
  margin-bottom: 5px;
  position: relative;
}

.neodb-image {
  width: var(--db-item-width);
  height: var(--db-item-height);
  object-fit: cover;
  border-radius: 4px;
}

.neodb-image-error {
  width: var(--db-item-width);
  height: var(--db-item-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--db-background-gray);
  color: var(--db-text-light);
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
}

/* 图片加载失败时的红色边框 */
.image-error-border {
  border: 2px solid red;
}

.neodb-title {
  margin-top: 2px;
  font-size: 14px;
  line-height: 1.4;
}

.neodb-title a:hover {
  color: var(--db-primary-color);
  text-decoration: underline;
}

.neodb-score {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--db-text-light);
}

.neodb-score svg {
  fill: #f5c518;
  margin-right: 5px;
}

.block-more {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.lds-ripple {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid var(--db-primary-color);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes lds-ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

.neodb-loading {
  font-size: 16px;
  color: var(--db-text-light);
}

.neodb-no-data {
  font-size: 16px;
  color: var(--db-text-light);
}
</style>