<!--
 * @Descripttion: 
 * @Author: yatwah.fung
 * @Date: 2021-01-06 12:11:13
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2022-01-12 18:10:34
-->
# puhui_sales

## materiasl.html配置：
<pre>
{  
    "1011": {                                                                             // 匹配的场景值  
        "tips": "",                                                                       // 顶部提示信息  
        "scene": "微乐贷提额|新营业执照提额",                                               // 场景值1011的备注 无实际功能  
        "location": false,                                                                // 是否展示办单地址  
        "api": "/channel001/work_loan_sale/puhui/new_app/submit_scene_loan_order.json",   // 提交api  
        "list": [  
            {  
                "text": "经营场所",                                                         // 入口文案  
                "url": "https://sales.tiqianle.com/res/entry/materials/video.html",         // 跳转地址  
                "type": "place",                                                            // 自定义的材料key  
                "icon": "",                                                                 // 入口图标  色值#333 https://www.iconfont.cn/search/index 找svg改色值后天玑上传  
                "key": "merchant_pic.merchant_pic_outside_url",                             // 入口取值的路径'.'分割 支持1~n级 层级太深可能会导致渲染过慢  
                "require": true,                                                            // 是否必填  
                "before": [                                                                 // 提交的前置校验 若某个key取到的state === 3 (无需展示) 时，这个key不进行校验  
                    "zhi_ma_score.zm_score_video",  
                    "wei_xin_score.wechat_pay_score_video"  
                ]  
            },  
            {  
                "text": "专业市场报备",
                "type": "selector",                                                         // selector类型会出弹窗
                "submit_api": "",                                                           // 选中后提交的api
                "list_api": "",                                                             // 获取选项列表的api ，存在则会覆盖传入配置list
                "list_key": "",                                                             // 指定key  { label: i[item.list_key], value: i[item.list_value] } 
                "list_value": "",                                                           // 指定从接口取value值的key  不支持path
                "list_type": "radio",                                                       // 目前只支持radio  待拓展TODO！！！！！！
                "list": [],                                                                 // 选择器的列表list  (list_api获取的选项优先于list使用且互斥)
                "icon": "",
                "require": false,                                                           
                "key": "ext_info.professional_market_name"                                  // 取值的path
            },
         {
            "text": "尽职调查",
            "url": "https://rcs.fenqile.com/autoanswersystem.html",
            "type": "question",
            "icon": "",
            "require": false,
            "key": "enterprise_zm.enterprise_zm_url",
            "with_search": false,                                                       // 是否自动携带路由上的参数  默认true
            "query": [
               {
                  "key": "sales_uid",
                  "value": "",
                  "query_key": "uid"                                                    // query_key存在则会用这个key从$url.query上取值 去覆盖value
               },
               {
                  "key": "cb_url",
                  "value": "href"                                                       // 特定的value === 'href'  会取当前页面地址（用于配置cbUrl）
               }
            ]
         }
      ]
   }
</pre>
## materiasl/video.html配置：
<pre>
"qiye_zhima": {                                                                        // materials.html 页面入口中配置的自定义key  &video_type='qiye_zhima'
      "title": "企业芝麻分",                                                            // 页面中appHeader的标题
      "validate_handler": "enterprise_zm.need",                                        // 若存在开关的path 且开关值为假 (状态不为驳回331  驳回状态强制校验) 
      "api": "",                                                                       // 页面提交的api
      "list": [
         {
            "key": "enterprise_zm.need",                                                // 取值path
            "text": "是否有企业芝麻分：",                                                 
            "hide_states": [                                                            // 哪些订单状态下需要隐藏                        
               1,
               3,
               4,
               331
            ],
            "type": "radio",                                                            // 支持 radio、image、video、input、label
            "options": [
               {
                  "label": "无",
                  "value": false
               },
               {
                  "label": "有",
                  "value": true
               }
            ],
            "default_value": true                                                       // 默认值  表单/详情内无值时候才会写入
         },
         {
            "type": "label",
            "text": "请填写企业芝麻分",
            "show_item": "enterprise_zm.need"                                            // 存在show_item且根据path取值为false 则不可编辑（ui上为不展示本item）
         },
         {
            "type": "input",
            "label": "芝麻分",
            "key": "enterprise_zm.enterprise_zm_scores",
            "require": true,
            "placeholder": "请输入企业芝麻分",
            "clearable": true,
            "input_type": "number",                                                    // 默认text  支持：text、number(整型)、textarea(高度统一默认为两行自适应撑高)
            "show_item": "enterprise_zm.need",
            "max":999,                                                                 // max/min： Number类型 只在inputType为number时生效
            "min":0,
            "group_key":"rate",                                                        // group_key存在则纳入计算--自定义的分组key  用于实现n选1 (这些项都必须设为选填)
            "precision": 2                                                             // 精度 默认值0  Number类型  只在inputType为number时生效
         },
         {
            "type": "label",
            "text": "请拍摄企业芝麻分照片",
            "show_item": "enterprise_zm.need"
         },
         {
            "type": "image",                                                           // 默认video  支持video/image  
                                                                                       //（类型为video时  支持视频拍摄时长duration  重试次数retry_times即唤起摄像头n次后改用h5上传)
            "text": "点击拍摄照片",
            "duration":"25",                                                           // 视频拍摄时长duration(s)  类型String  默认'20'
            "key": "enterprise_zm.enterprise_zm_url",
            "domain": "",
            "require": true,
            "show_item": "enterprise_zm.need"
         },
         {
            "type": "tips",
            "title": "拍摄要点：",
            "url": "",                                                                                      // 图标的url优先icon   url和icon都不存在则不显示
            "icon": "info",                                                                                 // 内置的icon ： info、step
            "list": [
               {
                  "list": [
                     {
                        "text": "1、如何查看企业芝麻分："
                     },
                     {
                        "text": "支付宝芝麻信用分->个人芝麻分页面右上角->点击“企”",
                        "type": "strong"                                                                    // strong：文字加强   button：引导图按钮
                     },
                     {
                        "text": " 切换至企业芝麻分。"
                     }
                  ]
               },
               {
                  "list": [
                     {
                        "text": "2、如未开通，可按照操作指引开通查看。"
                     }
                  ]
               }
            ]
         }
      ],
      "guide": {                                                                                           // 引导图片
         "title": "视频上传示例",                                                                           // 文案
         "message": [                                                                                      // 内容
            {
               "text": "需在同一镜头下、20s内完成拍摄，包括"
            },
            {
               "text": "添加银行卡中的姓名--微信支付分",
               "type": "strong"                                                                             // 文本加强
            }
         ],
         "image": "/res/img/wechat_guide.gif",                                                              // gif图片地址 
         "buttons": [
            {
               "text": "我知道了"                                                                            // 按钮文案
            }
         ]
      }
   }
</pre>
