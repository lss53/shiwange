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

    <!-- 初始加载提示 -->
    <div v-if="state.isLoading && state.subjects.length === 0" class="neodb-loading">
      NeoDB 数据加载中，请稍候...
    </div>

    <!-- [优化] 错误提示 -->
    <div v-if="state.error" class="neodb-error">
      {{ state.error }}
    </div>

    <!-- 无数据提示 (在没有错误时显示) -->
    <div v-if="!state.isLoading && state.subjects.length === 0 && !state.error" class="neodb-no-data">
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
        >
          <i class="fa-solid fa-face-sad-cry"></i>，图片加载失败！
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

    <!-- 加载更多指示器 -->
    <div ref="moreElementRef" class="block-more" v-if="!state.finished && state.subjects.length > 0">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, ref, watch } from "vue";

// 常量定义
const types = ["book", "movie", "tv", "music", "game"];
const baseAPI = "https://db.211777.xyz/api";

const moreElementRef = ref(null);
let observer = null;

// 状态管理
const state = reactive({
  type: "movie",
  status: "complete",
  finished: false,
  paged: 1,
  subjects: [],
  isLoading: false,
  error: null, // [优化] 新增错误状态
});

// 获取数据
const fetchData = async () => {
  if (state.isLoading || state.finished) return;
  state.isLoading = true;

  const params = new URLSearchParams({
    type: state.status,
    category: state.type,
    page: state.paged.toString(),
  });

  const url = `${baseAPI}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.length > 0) {
      // [说明] 保留此去重逻辑是为了防止 API 在分页边界返回重复数据，增强组件健壮性。
      // 如果能确保 API 不会返回重复项，可以移除此 .filter 逻辑以提升性能。
      const newData = data.filter(
        (item) =>
          !state.subjects.some(
            (existing) => existing.item.id === item.item.id
          )
      );

      if (newData.length > 0) {
        state.subjects.push(...newData);
      } else {
        // 如果 API 返回了数据，但所有数据都已存在，也标记为完成
        state.finished = true;
      }
    } else {
      state.finished = true;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // [优化] 设置错误信息给用户，并停止后续加载
    state.error = "数据加载失败，请检查网络连接后重试。";
    state.finished = true;
  } finally {
    state.isLoading = false;
  }
};

// 加载更多的逻辑
const loadMore = () => {
  if (!state.isLoading && !state.finished) {
    state.paged++;
    fetchData();
  }
};

// 处理导航项点击
const handleTypeClick = (type) => {
  if (state.type === type) return;
  // 重置状态
  state.type = type;
  state.paged = 1;
  state.finished = false;
  state.subjects = [];
  state.error = null; // [优化] 切换分类时重置错误状态
  fetchData();
};

// 处理图片加载失败
const handleImageError = (subject) => {
  subject.imageError = true;
};

// 生命周期钩子
onMounted(() => {
  fetchData();

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });

  if (moreElementRef.value) {
    observer.observe(moreElementRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// 监视 ref 的变化，确保观察器始终观察正确的元素
watch(moreElementRef, (newValue, oldValue) => {
  if (observer) {
    if (oldValue) {
      observer.unobserve(oldValue);
    }
    if (newValue) {
      observer.observe(newValue);
    }
  }
});

</script>

<style scoped>
/* 样式部分 (与原版基本一致，仅增加 error 样式) */
.neodb-container {
  --db-item-width: 150px;
  --db-item-height: 180px;
  --db-primary-color: var(--theme-color, #096dd9);
  --db-background-white: var(--bg-color, #ffffff);
  --db-background-gray: var(--bg-color-secondary, #f8f8f8);
  --db-border-color: var(--border-color, #eaeaea);
  --db-text-light: var(--text-light-color, #888888);
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
  border-bottom: 2px solid transparent;
  transition: 0.3s all;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-right: 20px;
  padding-bottom: 5px;
}

.neodb-navItem.current {
  border-color: var(--db-primary-color);
  color: var(--db-primary-color);
}
.neodb-navItem:hover {
  color: var(--db-primary-color);
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
  background-color: var(--db-background-gray);
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
  border: 1px solid var(--db-border-color);
}

.neodb-title {
  margin-top: 5px;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-all;
}

.neodb-title a:hover {
  color: var(--db-primary-color);
  text-decoration: underline;
}

.neodb-score {
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2px 6px;
  border-radius: 4px;
}

.neodb-score svg {
  fill: #f5c518;
  margin-right: 4px;
}

.block-more {
  display: flex;
  justify-content: center;
  padding: 20px 0;
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
  border: 4px solid var(--db-primary-color);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

.neodb-loading,
.neodb-no-data,
.neodb-error { /* [优化] 为 error 添加通用样式 */
  padding: 40px 0;
  text-align: center;
  font-size: 16px;
  color: var(--db-text-light);
}

/* [优化] 让错误提示更醒目 */
.neodb-error {
  color: #f5222d;
}
</style>