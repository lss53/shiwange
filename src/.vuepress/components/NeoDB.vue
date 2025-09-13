<template>
  <div class="neodb-container">
    <!-- 导航栏 -->
    <nav class="neodb-nav">
      <span
        v-for="item in TYPES"
        :key="item"
        class="neodb-navItem"
        :class="{ current: selectedType === item }"
        @click="handleTypeClick(item)"
      >
        {{ item }}
      </span>
    </nav>

    <!-- 状态容器 -->
    <div class="neodb-status-container">
      <!-- 初始加载状态 -->
      <div v-if="isFetching && !isFetchingNextPage" class="neodb-loading">
        NeoDB 数据加载中...
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="neodb-error">
        数据加载失败：{{ error.message }}
      </div>

      <!-- 无数据提示 -->
      <div v-if="!isFetching && subjects.length === 0 && !error" class="neodb-no-data">
        抱歉，暂无数据！
      </div>
    </div>

    <!-- 数据列表 -->
    <div class="neodb-grid">
      <div v-for="subject in subjects" :key="subject.item.id" class="neodb-item">
        <a :href="subject.item.id" target="_blank" rel="noopener noreferrer" class="neodb-item-link">
          <div class="neodb-image-wrapper">
            <!-- 图片加载失败占位符 -->
            <div v-if="subject.imageError" class="neodb-image-error">
              <i class="fa-solid fa-cloud-bolt" style="font-size: 1.5em;"></i>
              <span>加载失败</span>
            </div>
            <img
              v-else
              :src="subject.item.cover_image_url"
              class="neodb-image"
              @error="subject.imageError = true"
              loading="lazy"
              alt="Cover image"
            />
            <!-- 评分 -->
            <div v-if="subject.item.rating" class="neodb-score">
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z" fill="#f5c518"></path>
              </svg>
              <span>{{ subject.item.rating }}</span>
            </div>
          </div>
          <!-- 标题 -->
          <div class="neodb-title">
            {{ subject.item.title }}
          </div>
        </a>
      </div>
    </div>

    <!-- 加载触发器 -->
    <div ref="loader" class="block-more" v-if="hasNextPage">
      <div v-if="isFetchingNextPage" class="lds-ripple"><div></div><div></div></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";

// --- 常量定义 ---
const TYPES = ["book", "movie", "tv", "music", "game"];
const BASE_API = "https://db.211777.xyz/api";
const MARK_TYPE = "complete";

// --- 状态管理 ---
const selectedType = ref("movie");

// --- API 数据获取函数 ---
const fetchSubjects = async ({ pageParam = 1 }) => {
  const params = new URLSearchParams({
    type: MARK_TYPE,
    category: selectedType.value,
    page: pageParam.toString(),
  });
  const url = `${BASE_API}?${params.toString()}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`网络响应错误 (Status: ${response.status})`);
  }
  const data = await response.json();
  return data.map(item => ({ ...item, imageError: false }));
};

// --- Vue Query 核心 Hook ---
const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['neodb', selectedType],
  queryFn: fetchSubjects,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length > 0 ? allPages.length + 1 : undefined;
  },
});

// --- 计算属性 ---
const subjects = computed(() => data.value?.pages.flat() || []);

// --- 事件处理 ---
const handleTypeClick = (type) => {
  if (selectedType.value === type) return;
  selectedType.value = type;
};

// --- 无限滚动逻辑 (IntersectionObserver) ---
const loader = ref(null);
let observer = null;

const setupObserver = () => {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
      fetchNextPage();
    }
  }, { threshold: 0.1 });

  if (loader.value) {
    observer.observe(loader.value);
  }
};

onMounted(setupObserver);
onUnmounted(() => {
  if (observer) observer.disconnect();
});
watch([loader, hasNextPage], setupObserver);

</script>

<style scoped>
/* --- 全局与变量 --- */
.neodb-container {
  /* CSS 变量继承自主题，无需重复定义 */
  margin: 2rem 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* --- 导航 --- */
.neodb-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem; /* 使用 gap 替代 margin */
  padding: 30px 0 20px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 2rem;
}

.neodb-navItem {
  font-size: 1.25rem; /* 使用 rem 单位 */
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  position: relative;
  transition: color 0.3s ease;
  padding-bottom: 8px;
}

.neodb-navItem::after {
  content: '';
  position: absolute;
  bottom: -1px; /* 紧贴父容器边框 */
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--theme-color);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.neodb-navItem:hover,
.neodb-navItem.current {
  color: var(--theme-color);
}

.neodb-navItem:hover::after,
.neodb-navItem.current::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* --- Grid 布局 --- */
.neodb-grid {
  display: grid;
  /* 
   * auto-fill: 自动填充尽可能多的列
   * minmax(150px, 1fr): 每列最小宽度 150px，最大平分剩余空间
   * 实现完美的响应式布局
  */
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
}

/* --- 卡片项 --- */
.neodb-item {
  position: relative;
}

.neodb-item-link {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  background-color: var(--bg-color-secondary);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.neodb-item-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  color: var(--theme-color);
}

.neodb-image-wrapper {
  position: relative;
  padding-top: 140%; /* 保持图片 10:14 的高宽比 */
  width: 100%;
}

.neodb-image, .neodb-image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.neodb-image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--bg-color-secondary);
  color: var(--text-light-color);
  font-size: 0.8rem;
}

/* --- 评分 --- */
.neodb-score {
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 3px 8px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

/* --- 标题 --- */
.neodb-title {
  padding: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.4;
  /* 文本溢出处理 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 最多显示两行 */
  overflow: hidden;
  text-overflow: ellipsis;
  height: calc(0.9rem * 1.4 * 2); /* 固定高度防止抖动 */
}

/* --- 状态显示容器 --- */
.neodb-status-container {
  min-height: 200px; /* 避免在加载时页面跳动 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.neodb-loading,
.neodb-no-data,
.neodb-error {
  padding: 2rem;
  font-size: 1rem;
  color: var(--text-light-color);
  background-color: var(--bg-color-secondary);
  border-radius: 8px;
}

.neodb-error {
  color: #c53030;
  background-color: #fff5f5;
  border: 1px solid #f56565;
}

/* --- 加载更多动画 --- */
.block-more {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  width: 100%;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid var(--theme-color);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% { top: 36px; left: 36px; width: 0; height: 0; opacity: 0; }
  4.9% { top: 36px; left: 36px; width: 0; height: 0; opacity: 0; }
  5% { top: 36px; left: 36px; width: 0; height: 0; opacity: 1; }
  100% { top: 0px; left: 0px; width: 72px; height: 72px; opacity: 0; }
}
</style>