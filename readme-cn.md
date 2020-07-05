# Sync Sofa - 在线视频同步播放插件

> 以稳定，快捷的方式远程同步观看在线/本地视频

![GitHub go.mod Go version (subfolder of monorepo)](https://img.shields.io/github/go-mod/go-version/LouisYLWang/Sync-Sofa?filename=server%2Fgo.mod&style=flat-square) [![Chrome web store users][chrome-image]][chrome-url]

Sync Sofa是一个稳定易用的Chrome浏览器拓展插件，可同步两端用户的视频播放操作，提高与身处异地的小伙伴一同观看视频的体验，目前支持以下主要功能：

- 平等双人连接：任意一端均可控制对方播放状态
- 同步播放进度：支持播放、暂停、进度切换等操作
- 本地视频同步：可通过VLC同步本地视频播放状态

## 当前版本特性:

**v1.0.7 - 2020年7月5日更新**

⚠⚠⚠ 注意，此版本与<= 1.0.5的任何版本都不兼容，请务必确保你的版本与小伙伴的版本一致。

- 新增功能：
    - 新增版本检测（高版本用户与低版本用户连接时，若连接码由低版本用户申请，高版本用户将收到提示，请根据提示告知对方升级最新版本）
- 修复功能:
    - 修复对 [bilibili movie](https://www.bilibili.com/bangumi/*) 的支持
    - 修复了优酷及芒果TV无法同步操作的问题

---

## 支持网站列表

* [爱奇艺](https://www.iqiyi.com/) 
* [优酷](https://www.youku.com/)
* [微云](https://www.weiyun.com/)
* [腾讯视频](https://v.qq.com/)
* [油管](https://www.youtube.com/)
* [芒果](https://www.mgtv.com/)
* 通过浏览器播放本地视频（仅支持AVC/H.264编码）
* [通过VLC视频播放器播放本地视频](https://www.videolan.org/vlc/index.html)

[点击这里向我们反馈更多网站](https://github.com/LouisYLWang/Sync-Sofa/issues/22)

## 设置

😊 此部分为可选设置，我们已经为你配置好默认服务器，如果你不感兴趣，或者没有修改服务器的需求，请移步至[下一部分](#usage).

### 服务器列表

最近许多用户反映国内的访问不稳定，是因为我们的默认服务器在美国，因此我们提供了备用服务器列表，你可以根据你的位置切换到离你距离更近的服务器。

* https://app.ylwang.me (美国)
* https://sync-cn.onns.xyz (国内)

在设置服务器前，请检查服务器的状态：[https://sync-status.onns.xyz/](https://sync-status.onns.xyz/).

我们会感谢你对该开源项目作出的贡献，你可以通过**提供自己部署的服务**来支持我们，也可以帮我们**分担一点服务器费用**的压力。（~~也可以一键三连~~）

**支付宝, 微信支付, 贝宝**

![alipay](https://onns.xyz/blog/image/20200704-1.png) ![wechat pay](https://onns.xyz/blog/image/20200704-2.png) ![paypal](https://onns.xyz/blog/image/20200704-3.jpg)

### 选项页

打开选项页有下列两种方法：

1. 右键点击`Sync Sofa`插件图标, 选择`选项`。
2. 左键点击`Sync Sofa`插件图标, 在插件弹窗中选择底部`设置`图标。

设置界面如下：

![Sync Sofa - Options](https://onns.xyz/blog/image/20200629-3.png)

### 刷新视频页面

修改设置并保存后，请刷新视频网站页面/本地视频页面/ [http://127.0.0.1:8080/](http://127.0.0.1:8080/)（如果你使用VLC播放本地视频）来使设置生效。



## 使用说明

### 注意事项

⚠️ 使用前请确保两个`客户端版本号`一致。

⚠️ 使用前请确保两个`服务器域名`一致。

⚠️ 如需播放本地`.mp4`文件，请在扩展详细信息页面启用“允许访问文件url”。


方法1. 在地址栏输入`chrome://extensions/`，找到`Sync Sofa`，点击`详情`按钮，启用`允许访问文件网址`。

方法2.右击浏览器左上角`Sync Sofa`图标，选择`管理拓展程序`, 启用`允许访问文件网址`。

⚠️ 如果你的浏览器中安装了`多个不同版本`的`Sync Sofa`,请只启用其中一个并禁用其他版本。


### 打开视频页面

你们可以同步观看不同来源的视频，在播放本地`.mp4`视频文件时，你的小伙伴可以选择在视频网站上和你同步观看，此外，你们还可以在不同的视频网站看观看相同的视频。


例如，`用户A`在Bilibili上观看此视频：
* [https://www.bilibili.com/video/BV1k5411Y7Rc](https://www.bilibili.com/video/BV1k5411Y7Rc)
![User A](https://onns.xyz/blog/image/20200627-1.png)

此时`用户B`可在YouTube上同步观看同一视频：
* [https://www.youtube.com/watch?v=QAelMP1PoNA](https://www.youtube.com/watch?v=QAelMP1PoNA)
![User B](https://onns.xyz/blog/image/20200627-2.png)

如果视频开始前有广告，请在广告结束后进入下一步。

### 获取连接码

点击 `Sync Sofa` 插件图标并点击`REQUEST NEW CODE`（获取链接码） 按钮.

![User A](https://onns.xyz/blog/image/20200627-3.png)


如一切正常，你会收到弹窗提示`Room created and room code copied to clipboard` （房间已建立，连接码已复制到剪贴板），同时`连接码`将自动拷贝到剪切板中，请将它发给你的小伙伴。

### 开始连接

你的小伙伴收到`room code（连接码）`后，点击`Sync Sofa`插件图标，粘贴到输入栏中点击`START（开始）`按钮。

![User B](https://onns.xyz/blog/image/20200627-4.png)

### 愉快观看吧
![User A](https://onns.xyz/blog/image/20200627-5.png)
![User B](https://onns.xyz/blog/image/20200627-6.png)


现在你可以播放视频了，你的播放，暂停，更改时间等操作都会同步给你的小伙伴。愉快地同步观看吧!

## VLC支持
如果你们都通过`VLC 媒体播放器`播放视频，`Sync Sofa`也可以同步你们的操作。

### 通过Web控制界面操控VLC播放
首先你们需要开启VLC的Web控制界面，使浏览器可以控制VLC的播放，请参考以下官方文档：
* [通过浏览器控制VLC](https://wiki.videolan.org/Control_VLC_via_a_browser/)
* [开启VLC的web控制界面](https://wiki.videolan.org/Documentation:Modules/http_intf/#VLC_2.0.0_and_later)

1. 打开VLC媒体播放器
2. 进入 `工具 → 偏好设置 (左下角显示设置选择 "全部") → 界面 → 主界面`, 勾选 "Web"
  ![Step 2](https://onns.xyz/blog/image/20200628-1.png)
3. 进入 `工具 → 偏好设置 (左下角显示设置选择 "全部") → 界面 → 主界面 → Lua`, 设置 `Lua HTTP - 密码`
  ![Step 3](https://onns.xyz/blog/image/20200628-2.png)
4. 点击`保存` 并重启VLC媒体播放器
5. 在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) 

这时你的网页应该如下图所示:

![VLC media player - Web Interface](https://onns.xyz/blog/image/20200628-3.png)

### 获取连接码
确认已在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/),
点击 `Sync Sofa` 插件图标并点击`REQUEST NEW CODE`（获取链接码） 按钮.

如一切正常，你会收到弹窗提示`Room created and room code copied to clipboard`（房间已建立，连接码已复制到剪贴板，同时`连接码`将自动拷贝到剪切板中，请将它发给你的小伙伴。

### 开始连接

你的小伙伴收到`room code`后，点击`Sync Sofa`插件图标，粘贴到输入栏中点击`START`（开始）按钮。

### 愉快观看吧

现在你可以使用`Sync Sofa`通过VLC同步本地视频播放状态了，你的播放，暂停，更改时间等操作都会同步给你的小伙伴。愉快地同步观看吧!


**注意**:


⚠️ 在播放时，切勿关闭[http://127.0.0.1:8080/](http://127.0.0.1:8080/)页面。

### 关闭控制页面

视频播放完毕后，点击`Sync Sofa`插件页面上的`STOP`按钮，或关闭[http://127.0.0.1:8080/](http://127.0.0.1:8080/)页面。

## 安装

### Google Chrome

#### 从谷歌商店安装

1. 在Chrome浏览器中打开 [Sync Sofa - Online Video Synchronizer - Chrome Web Store](https://chrome.google.com/webstore/detail/sync-sofa-online-video-sy/kgpnhgmpijhpkefpddoehhminpfiddmg) 
2. 点击 `Add to Chrome` 按钮
3. 选择 `Add extension`

#### 从本地 .crx 文件安装

1. 打开 [Github release page（版本发布页面）](https://github.com/LouisYLWang/Sync-Sofa/releases/latest)
2. 下载 `sync_sofa.[version].crx`, *[version]* 为当前最新版本编号
3. 在Chrome浏览器地址栏中输入 `chrome://extensions/` 
4. 启用 `开发者模式` (页面右上角)
5. 将 `sync_sofa.[版本号].crx` 拖入 `chrome://extensions/` 页面
6. 点击 `添加插件` 按钮


**注意**: 
如果该插件被Chrome浏览器禁用，请尝试 [从chrome web store下载安装]() 或者 [安装未打包的插件]()

> This extension is not listed in the Chrome Web Store and may have been added without your knowledge.

#### 安装未打包的插件

1. 下载 [稳定版本](https://github.com/LouisYLWang/Sync-Sofa/archive/master.zip) or [开发版本](https://github.com/LouisYLWang/Sync-Sofa/archive/dev.zip) (新特性，也许也有bug)
2. 解压你下载的`.zip` 压缩文件
3. 在Chrome地址栏输入 `chrome://extensions/` 打开插件管理页面
4. 开启右上角`开发者模式` 按钮
5. 点击左上角`加载未打包的拓展` 按钮
6. 选择 `下载路径/解压路径/client/chrome_extension`
7. 点击 `选择`

#### 微软Edge浏览器: 

#### 从Edge浏览器插件中心安装

1. 在Edge浏览器中打开 [Sync Sofa - Online Video Synchronizer - Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/kpfbclpafmmjalikjjlcoddffpfgghgp) 
2. 点击 `获取` 按钮

### Firefox (后续版本添加支持~~其实也可能不会~~) 

## 服务端部署指南

**注意**:

⚠️ 部署前，建议你的服务器已经部署了SSL/TLS证书，并已连接到域名。以下部署脚本基于使用Let's Encrypt certificates验证的服务器，如使用其他的证书提供商，可能需要修改部分脚本以正常运行。

⚠️ dev模式使用http协议进行传输，prod使用https协议进行传输

### 直接部署（不使用Docker容器）:

**1. 获取执行文件**

- 如果你想要修改源代码并自行编译，请执行以下shell脚本获取二进制文件。在执行前，请确认服务器已安装`Go`的环境

  ```shell
  go get github.com/LouisYLWang/Sync-Sofa/server
  # 如果你不清楚 $GOPATH
  # 请尝试输入并执行 "go env GOPATH"
  cd $GOPATH/src/github.com/LouisYLWang/Sync-Sofa/server

  # （下一步可省略）
  # 如果你看到了这条消息:
  # "dial tcp 216.58.200.49:443: i/o timeout"
  # 请添加并执行下一条命令
  export GOPROXY=https://goproxy.io

  go install
  cd $GOPATH/bin
  ```

- 如果无需修改源代码并自行编译，你也可以直接下载二进制文件:
    1. 打开 [Github release page](https://github.com/LouisYLWang/Sync-Sofa/releases/latest)
    2. 下载 `server` 文件（适用于linux服务器）
    3. 下载 `config.json` 文件，移动至`server`同一路径

**2. 修改配置文件：**

- 配置变量：

  - `addr`: 服务器端口
  - `runmode`:
    - dev: 开发模式（建议本地使用，不包含对HTTPS的支持）
    - prod: 生产模式
  - `tlsdir`:
    - `tlskey`: TLS证书私钥路径 
    - `tlscert`: TLS证书路径 

  **Notices**: `addr`, `runmode` 为必须参数, `tlskey`, `tlscert` 参数在使用HTTPS连接时（生产环境下）为必须参数

- 开发模式（http）配置文件样例:

  ```json
  {
    "addr": ":80",
    "runmode": "dev"
  }
  ```

- 生产模式（https）配置文件样例:
  ```json
  {
    "addr": ":443",
    "runmode": "prod",
    "tlsdir": {
      "tlskey": "/etc/letsencrypt/live/your.host.url/privkey.pem",
      "tlscert": "/etc/letsencrypt/live/your.host.url/fullchain.pem"
    }
  }

**3. 在执行文件所在路径下，执行 `./server` 部署服务器, 部署成功信息如下:**


```
found config file, read parameters from config file...
server is listening at {your_port_number}...
```

### 使用Docker容器部署

在部署前请确认Docker容器在服务器端可正常运行，请按照如下提示修改参数

- 配置变量：
  - `ADDR`: 服务器端口
  - `RUNMODE`:
    - dev: 开发模式（建议本地使用，不包含对HTTPS的支持）
    - prod: 生产模式
  - `APIHOST`: 服务器网址
  - `IMGNAME`: docker容器名称（可自选）
  - `TLSKEYPATH`: TLS证书私钥路径 
  - `TLSCERTPATH`: TLS证书路径 

- 开发模式（http）配置文件样例:

  ```sh
  docker pull louisylwang/watchtogether

  export ADDR=:4000 \      
  export RUNMODE=dev \   
  export IMGNAME=yourimagename \   

  docker run -d \
  -e ADDR=:4000 \
  -e RUNMODE=RUNMODE \
  -p 4000:4000 \
  --name IMGNAME louisylwang/watchtogether
  ```

- 生产模式（https）配置文件样例:

  ```sh
  docker pull louisylwang/watchtogether

  export ADDR=:443 \      
  export RUNMODE=prod \   
  export APIHOST=your.host.name \   
  export IMGNAME=yourimagename \   
  export TLSKEYPATH=/your/path/to/TLS/privatekey \
  export TLSCERTPATH=/your/path/to/TLS/certification \


  docker run -d \
  -e ADDR=:ADDR \
  #docker port to server:server port to docker, not necessarily the same
  -p ADDR:ADDR \ 
  -e RUNMODE=RUNMODE \
  #if you use letsencrypt, TLSKEY value should be /etc/letsencrypt/live/$APIHOST/privkey.pem
  -e TLSKEY=TLSKEYPATH \ 
  #if you use letsencrypt, TLSCERT value should be /etc/letsencrypt/live/$APIHOST/fullchain.pem 
  -e TLSCERT=TLSCERTPATH \ 
  #need to expose your TLS certification file to docker
  -v /etc/letsencrypt:/etc/letsencrypt:ro \ 
  --name IMGNAME louisylwang/watchtogether \
  --restart=always
  ```


- 部署成功后，执行 `docker logs {your docker image name}`将会提示下列日志信息:

  ```
  not found config file, read parameters from system variables...
  YYYY/MM/DD HH:MM:SS server is listening at :ADDR...
  ```

## 版本日志

### v1.0.7
🛠 2020年7月5日更新
---
⚠⚠⚠ 注意，此版本与<= 1.0.5的任何版本都不兼容，请务必确保你的版本与小伙伴的版本一致。

- 新增功能：
    - 新增版本检测（高版本用户与低版本用户连接时，若连接码由低版本用户申请，高版本用户将收到提示，请根据提示告知对方升级最新版本）
- 修复功能:
    - 修复对 [bilibili movie](https://www.bilibili.com/bangumi/*) 的支持
    - 修复了优酷及芒果TV无法同步操作的问题


### v1.0.6
🛠 2020年6月28日更新
---
⚠⚠⚠ 注意，此版本与之前的任何版本都不兼容，请务必确保你的版本与小伙伴的版本一致。


- 新增功能：
    - 支持芒果TV（来乘风破浪吧！🤣）
    - 支持使用VLC播放器同步播放本地视频文件
    - 新增设置页面-调试模式
    - 新增捐赠页面
    - 新增wiki页面
- 修复功能:
    - 提高同步的稳定性:
      - 更新了同步逻辑（不与之前的任何版本兼容，请尽快更新至1.0.6+）
      - 增加缓冲检测

### v1.0.5
🛠 2020年5月12日更新
---
- 新增功能：
    - 增加对Edge浏览器的支持
- 修复功能：
    - 提高同步的稳定性


### v1.0.4
🛠 2020年5月10日更新
---
- 新增功能：
    - 新增成功连接提示
- 修复功能：
    - 提高同步的稳定性
    - 修改消息弹窗样式

### v1.0.3
🛠 2020年5月8日更新
---

- 新增功能：
    - 新增对以下视频网站的支持
      - [爱奇艺](https://www.iqiyi.com/) 
      - [优酷](https://www.youku.com/)
      - [微云](https://www.weiyun.com/)
      - [腾讯视频](https://v.qq.com/)
- 修复功能：
    - 提高同步的稳定性
    - 修改文档

### v1.0.2
🛠 2020年3月31日更新
---
- 新增功能：
    - 支持对修改播放进度的同步
- 修复功能：
    - 提高同步的稳定性

### v0.0.1
🛠 2020年3月26日更新 (测试版)
---
- 新增功能：
    - 支持播放暂停同步
    - 支持断开连接提示

## 开发者

Yiliang "Louis" Wang – [@blog](https://ylwang.codes/) – [@mail](mailto:louis.yl.wang@outlook.com)

Onns – [@blog](https://onns.xyz/) – [@mail](mailto:onns@onns.xyz)

## Contributing

1. Fork it (<https://github.com/LouisYLWang/Sync-Sofa/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->

[chrome-image]: https://img.shields.io/chrome-web-store/users/kgpnhgmpijhpkefpddoehhminpfiddmg?style=flat-square
[chrome-url]: https://chrome.google.com/webstore/detail/sync-sofa-beta-online-vid/kgpnhgmpijhpkefpddoehhminpfiddmg

## 常见问题
1. **Q:** 在我安装的时候，Chrome提示我Sync Sofa可以`读取和更改您在一些网站上的数据`以及`读取您的浏览记录`，听起来很严重，它安全吗？
    
    **A:** 我们不会收集你的浏览数据，我们只会读取你当前标签页的标题，用来判断你是否在访问我们支持的页面([支持网站列表](#supported-list))，以避免影响使用体验的事情发生。所有对你浏览数据的收集和处理只会发生在本地；事实上我们也不会随意修改网站的数据，我们只会使用一个同步脚本来监测你播放，暂停及更新进度等操作（我们不得不这样做）。**所有的源码都可以在 [我们的项目主页]审核(https://github.com/LouisYLWang/Sync-Sofa), 我们承诺目前做的所有事情都是必要且无害的.**

2. 如果你发现**按钮变灰**, 请确认你是否在我们支持的网站操作([支持网站列表](#supported-list)).

3. 如果你发现插件**无法获取同步码**，请按以下顺序检查问题：
    1. 请检查 [选项页面](#options-page) 并点击`重置` 按钮
    2. 请参考 [选项页面](#options-page) 根据你所在的位置选择并设置合适的服务器
    3. 请检查服务器当前状态 [https://sync-status.onns.xyz/](https://sync-status.onns.xyz/)是否正常启动
    4. 如以上都不能解决你的问题，请通过[项目反馈页面](https://github.com/LouisYLWang/Sync-Sofa/issues)或[项目wiki页面](https://onns.xyz/sync-sofa/)右下角的反馈按钮通知我们。


4. 如果你发现插件**无法正常同步操作**，请按以下顺序检查问题：
    1. 请务必确认两方版本号是否一致，欲检测版本号，需打开[chrome extension page](chrome://extensions/)，并找到`Sync Sofa - Online Video Synchronizer *.*.*`，其中 `*.*.*` 为当前版本。
    2. 请检查 [选项页面](#options-page) 并点击`重置` 按钮
    3. 请参考 [选项页面](#options-page) 根据你所在的位置选择并设置合适的服务器
    4. 请检查服务器当前状态 [https://sync-status.onns.xyz/](https://sync-status.onns.xyz/)是否正常启动.
    5. 如以上都不能解决你的问题，请通过[项目反馈页面](https://github.com/LouisYLWang/Sync-Sofa/issues)或[项目wiki页面](https://onns.xyz/sync-sofa/)右下角的反馈按钮通知我们。



