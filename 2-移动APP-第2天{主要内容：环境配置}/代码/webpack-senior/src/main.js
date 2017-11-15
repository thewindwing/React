// JS 打包入口文件
import $ from 'jquery'

import './css/index.scss'

$(function () {
  $('li:odd').css('backgroundColor', 'pink')
  $('li:even').css('backgroundColor', 'lightblue')
})

class Person {
  static info = { name: 'zs' }
}

console.log(Person.info)


// Yarn 的使用命令：  http://blog.csdn.net/zhu1500527791/article/details/69730748