(function () {
  // 移动端不加载：省流量，也避免挡住正文
  if (window.matchMedia('(max-width: 768px)').matches) return;

  var BASE = '/live2d-widget/';

  function addCss(href) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function addJs(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  addCss(BASE + 'waifu.css');

  // 顺序不能反：先 Cubism 2 运行时，再 waifu-tips.js（它定义 initWidget）
  addJs(BASE + 'live2d.min.js')
    .then(function () { return addJs(BASE + 'waifu-tips.js'); })
    .then(function () {
      initWidget({
        // 台词/交互配置（第 4 步会改它）
        waifuPath: BASE + 'waifu-tips.json',
        // 模型库：先走 jsdelivr 镜像，稳了以后可以换成本地（见方案 C）
        cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
        // 左侧竖排按钮，就是你截图里那 5 个
        tools: ['hitokoto', 'photo', 'info', 'switch-model', 'switch-texture', 'quit']
      });
    })
    .catch(function (e) { console.warn('[live2d] 加载失败:', e); });
})();