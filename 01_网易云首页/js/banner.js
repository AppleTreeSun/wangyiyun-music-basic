var bannerCount = banners.length

// 轮播图外部的 wrapper
var bannerEl = document.querySelector('.banner-left .list')

var containerEl = document.querySelector('.banner-left')

var bannerWrapperEl = document.querySelector('.banner')
// 记录哪一个是active的
var activeEl = null

// 1.动态添加轮播图数据
// 1.1 动态添加图片相关内容
for (var i = 0; i < bannerCount; i++) {
  // 获取数据
  var bannerItem = banners[i]

  // 创建li元素
  var itemEl = document.createElement('li')
  itemEl.classList.add("item")

  if (i === 0) {
    itemEl.classList.add('active')
    bannerWrapperEl.style.backgroundImage = `url(${bannerItem.bgUrl})`
    activeEl = itemEl
  }
  bannerEl.append(itemEl)

  itemEl.innerHTML = `
    <a href="#">
      <img src="${bannerItem.imgUrl}" alt="">
    </a>`
}

// 1.2 动态添加指示器内容
var indicatorEl = document.querySelector('.banner-left .indicator')
for (var i = 0; i < bannerCount; i++) {
  var itemEl = document.createElement('li')
  itemEl.classList.add('item')
  itemEl.innerHTML = '<a href="#"></a>'
  if (i === 0) {
    itemEl.classList.add('active')
  }
  indicatorEl.append(itemEl)

  // 监听指示器的点击
  itemEl.index = i
  itemEl.onclick = function() {
    previousIndex = currentIndex
    currentIndex = this.index

    switchBannerItem()
  }
}

// 上一张/下一章
var previousIndex = 0
var currentIndex = 0
var prevEl = document.querySelector('.btn.prev')
var nextEl = document.querySelector('.btn.next')

prevEl.onclick = function() {
  // 找到上一张
  previousIndex = currentIndex
  currentIndex--
  if (currentIndex === -1) {
    currentIndex = bannerCount - 1
  }

  // 重新渲染
  switchBannerItem()
}

nextEl.onclick = nextSwitch

// 自动轮播
var timer = null
startTimer() 

// 暂停自动轮播
containerEl.onmouseenter = function() {
  stopTimer()
}
containerEl.onmouseleave = function() {
  startTimer()
}

// 封装到函数：渲染轮播图的切换
function switchBannerItem() {
  // 更换背景
  bannerWrapperEl.style.backgroundImage = `url(${banners[currentIndex].bgUrl})`
    activeEl = itemEl
  // 1.切换图片的item
  var currentItemEl = bannerEl.children[currentIndex]
  var previousItemEl = bannerEl.children[previousIndex]
  previousItemEl.classList.remove('active')
  currentItemEl.classList.add('active')

  // 2.切换图片的指示器
  var currentIndicatorEl = indicatorEl.children[currentIndex]
  var previousIndicatorEl = indicatorEl.children[previousIndex]
  previousIndicatorEl.classList.remove('active')
  currentIndicatorEl.classList.add('active')
}

// 封装到函数：开启定时器
function startTimer() {
  timer = setInterval(nextSwitch, 2000)
}

function stopTimer() {
  clearInterval(timer)
}


// 封装到函数：下一张
function nextSwitch() {
  // 找到上一张
  previousIndex = currentIndex
  currentIndex++
  if (currentIndex === bannerCount) {
    currentIndex = 0
  }

  // 重新渲染
  switchBannerItem()
}