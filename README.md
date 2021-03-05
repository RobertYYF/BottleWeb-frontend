# frontend

# 本地开发环境配置

Clone repo到本地，用vscode打开folder

安装npm，方法很多种，仅供参考

```
sudo apt update

sudo apt install nodejs npm
```

安装好npm后，按以下顺序安装

```
sudo npm install vue

sudo npm install -g npm-install-peers

# 这里很容易出现error，解决方案按照报错Google
sudo npm install -g @vue/cli

sudo npm install axios

sudo npm install vue-axios

sudo npm install vue-particles

sudo npm install element-ui

sudo npm install vue-router
```

## 如何运行前端代码

首次运行，需要先跑一次 ```npm install```

之后运行只需要跑 ```npm run serve```


# 代码解析

核心三部件： main.js, router.js, App.vue和其他components

## main.js

初始化vue实例并使用需要的插件,加载各种公共组件，理解为配置中心

## router.js

路由管理器, 分配页面url，里面的router.beforeEach()理解为过滤器，比如可以防止普通用户访问ADMIN页面

## App.vue 

整个网站的父组件，里面```<router-view class="view"></router-view>```这行用于显示子组件

子组件在components文件夹中，文件夹中有4个folder: admin, error, home, public-page

以admin为例，里面有Admin.vue，这个会被App.vue调用，放进刚刚提到的```<router-view class="view"></router-view>```里面，此时网页内容为Admin.vue里的内容。在Admin.vue里也能看到一行```<router-view class="home-view"></router-view>```，这里用于显示Admin.vue页面内的子组件，也就是admin/componenets/AdminOption.vue和同一directory里另外那俩。

### 小总结

到这应该就能理解vue的套娃机制，外部一个父组件，里面能嵌套很多个子组件，子组件能被替换以展示不同的页面，好处是页面灵活度很高，组件也能被其他页面重复利用。

有了上述的三部件以后就可以得到一个能跑的网站了，剩下的文件是为login/register等功能出现的

## user.js

models中的user.js定义了这个网站的用户User，等同于Java中的Class User然后确定了几个variable

## service

service中可以进行与后端沟通的操作

service中的auth.service.js定义了几个function会在登录登出注册时被调用，

调用方式为```AuthService.login, AuthService.logout```等

比如login(user)是用于提取user输入的username和password然后发给后端（ .post()部分 ），让后端验证用户名密码是否正确，得到返回值以后进入.then()，如果登录成功，后端会返回一个json给前端，json中包含的内容去看bottle部分，重点是里面有个token，如果有token就说明登陆成功，此时代码中localStorage.setItem()意思为在本地以JSON存储这个user的信息, 并返回```Promise.resolve(response.data)```, 这个Promise.resolve()理解为给response.data包了个外包装，上面写着OK，同理下面的登录失败会返回```Promise.reject(response.data)```意思为外包装上写了Fail，有利于调用该func的地方可以直接获得登录成功/登录失败的结果。

auth-header.js中的那个func用于提取用户登录成功以后得到的token，我们先不管这个，暂时用不上

## store (难点)

store是个难点，Vue官方定义： ”store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)

我们的store分为俩部分，其中

auth.module.js负责初始化store容器，并提供一堆login,register时会被调用的function用于修改store状态

举个完整的例子，登录:

用户login的时候会访问components/public-page/components/Login.vue中写好的login页面，url为'/welcome/login'(在router.js中分配)，
此时页面创建了一个new User() （在Login.vue的data()中），用于存储一会儿输入的用户名和密码

用户输入的username和password在按下login button以后会被收集（收集方式我写的很粗鲁，直接赋值给刚刚new的User），onclick会调用Login.vue中的handleLogin()，在这个func里username和password会以一个User的形式传递给store，这里会看到```dispatch("auth/login", this.user)```，意思为调用auth.module.js中的login action，login action会调用刚刚说过的Service中的AuthService.login进行登录验证，如果成功会进入user => {}部分的代码块，失败进入 error => {}的代码块。以user => {}的代码块为例子，```commit('loginSuccess', user);```会调用下面mutations中的loginSuccess(state, user) 以修改几个显而易见的state，修改完以后返回Promise.resolve(user)，此时登录成功，回到Login.vue中，进入() => {}代码块，```this.$router.push("/home");```会把页面跳转到home

这就是完整的一个登录操作,其他操作都会进行类似的步骤，以此类推就看得懂了

index.js很简单，打包刚刚的auth.module.js，通过export default传出一个store module，在main.js中被调用：```import store from './store'```,这行的这个store就是指这个export出来的store module,给他取了名叫store

## 总结

到这应该能搞懂整个前端是咋跑的了，可以根据刚刚的login步骤推断出其他操作的运行流程

有问题直接群里滴滴哈


## 安全

使用JWT（JSON Web Token 可以Google一下），后端bottle的代码里有生成和验证token的部分，前端有储存token的能力

在用户登录以后，前端得到的token被储存到store里，在后续前端需要向后端发request拿信息的时候，该token需要被添加到request header中（request的JSON里加一个"accessToken": token-value），让后端能够识别该用户，增加安全性（不能让后端给谁都回复）

目前代码里还没有添加token到header并发送request的部分（可以写一个service负责封装token到request再发送），但后续例如message部分应该就得用token header了，这个部分留给巨巨们完成。

后续安全性功能可能还要加个WAF(Web Application Firewall)用来防止网站攻击（过滤请求），这个部分应该很难，有兴趣的巨佬可以先写写看

