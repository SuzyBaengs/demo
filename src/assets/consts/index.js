/**
 * 常量文件，不可改动
 */
const CONSTS = {
  // 上传内部文件域名
  UPLOAD_INNER_DOMAIN: 'oss-mms-inner.tiqianle.com',
  // 上传内部文件地址
  UPLOAD_INNER_FILE_URL: 'https://oss-mms-inner.tiqianle.com/upload4base64?output_type=json&fileExt=png&plusflag=1',
  // 普惠-上传内部文件场景值
  UPLOAD_INNER_SCENE: 'mms_inner',
  // 普惠-上传内部文件场景值
  UPLOAD_SECRET_SCENE: 'mms_secret',
  // 客服-上传文件场景值
  UPLOAD_CUSTOMER_SERVICE_SCENE: 'customerservice_outer',
  // 通用文件路径
  COMMON_FILE_URL: '//img1.fenqile.com',
  // 下载内部文件地址
  DOWNLOAD_INNER_FILE_URL: '//oss-mms-inner.tiqianle.com/getUrl?output_type=json',
  // 下载内部文件场景值
  DOWNLOAD_INNER_FILE_SCENES: 'mmsinner',
  // PDF预览插件
  PDF_VIEWER_PAGE: 'https://pm.m.fenqile.com/entry/support/pdf_viewer/index.html',
  // 身份类型
  IDENTITY_TYPE: {
    0: '企业法人（企业主、公司法人）',
    1: '个体法人（个体工商户）',
    2: '工薪族（正常缴纳五险一金）',
    3: '自由职业',
    4: '在校生',
    5: '学生后'
  },
  // 婚姻状态
  MARRIAGE_TYPE: [
    { value: 1, title: '已婚有子女' },
    { value: 2, title: '已婚无子女' },
    { value: 3, title: '未婚' },
    { value: 4, title: '离异' },
    { value: 6, title: '丧偶' }
  ],
  // 有无子女
  HAS_CHILDREN: [
    { value: 1, title: '有' },
    { value: 0, title: '无' }
  ],
  // 个人月收入映射
  INCOME_TYPE: [
    { value: 5000, title: '0~5千（含）' },
    { value: 10000, title: '5千~1万（含）' },
    { value: 20000, title: '1万~2万（含）' },
    { value: 30000, title: '2万~3万（含）' },
    { value: 40000, title: '3万~4万（含）' },
    { value: 50000, title: '4万（不含）以上' }
  ],
  // 住宅性质
  HOUSE_TYPE: [
    { value: 1, title: '商品房' },
    { value: 2, title: '自建房' },
    { value: 3, title: '商住两用房' }
  ],
  // 学历水平
  COLLEGE_LEVEL: [
    { value: 7, title: '初中及初中以下' },
    { value: 12, title: '高中毕业' },
    { value: 11, title: '中专毕业' },
    { value: 2, title: '大专毕业' },
    { value: 1, title: '本科毕业' },
    { value: 3, title: '硕士毕业' },
    { value: 4, title: '博士毕业' }
  ],
  // 公司所属行业映射
  COMPANY_FOR_INDUSTRY: [
    { title: '信息传输、软件和信息技术服务业', value: 1 },
    { title: '金融业', value: 2 },
    { title: '制造业', value: 3 },
    { title: '卫生和社会工作', value: 4 },
    { title: '建筑业', value: 5 },
    { title: '文化、体育和娱乐业', value: 6 },
    { title: '租赁和商务服务业', value: 7 },
    { title: '住宿和餐饮业', value: 8 },
    { title: '交通运输、仓储和邮政业', value: 9 },
    { title: '采矿业', value: 10 },
    { title: '电力、热力、燃气及水生产和供应业', value: 11 },
    { title: '科学研究和技术服务业', value: 12 },
    { title: '农、林、牧、渔业', value: 13 },
    { title: '水利、环境和公共设施管理业', value: 14 },
    { title: '其他', value: 15 },
    { title: '批发和零售业', value: 77 },
    { title: '居民服务、修理和其他服务业', value: 78 },
    { title: '房地产业', value: 79 },
    { title: '国际组织', value: 80 },
    { title: '教育', value: 81 },
    { title: '公共管理、社会保障和社会组织', value: 82 }
  ],
  // 公司所属一级行业
  COMPANY_FOR_INDUSTRY_FIRST: [
    { title: '加工制造业', value: 1 },
    { title: '批发业', value: 2 },
    { title: '零售业', value: 3 },
    { title: '餐饮业', value: 4 },
    { title: '生活服务业', value: 5 }
  ],
  // 公司所属二级行业
  COMPANY_FOR_INDUSTRY_SENCOND: [
    { title: '食品类加工制造（食品、烟酒、饮料等）', value: 1001, type: 1 },
    { title: '纺织类加工制造（服装、鞋、窗帘等加工）', value: 1002, type: 1 },
    { title: '家居家具加工制造', value: 1003, type: 1 },
    { title: '电子类加工制造（电子元器件等）', value: 1004, type: 1 },
    { title: '其他', value: 1005, type: 1 },
    { title: '食品类批发（食品、烟酒、饮料等）', value: 2001, type: 2 },
    { title: '服装、鞋、窗帘等纺织类批发', value: 2002, type: 2 },
    { title: '家居日化类批发', value: 2003, type: 2 },
    { title: '其他', value: 2004, type: 2 },
    { title: '服装、鞋帽、皮具箱包类', value: 3001, type: 3 },
    { title: '珠宝首饰、钟表、眼镜类', value: 3002, type: 3 },
    { title: '零食、烟酒茶类', value: 3003, type: 3 },
    { title: '电子、数码类', value: 3004, type: 3 },
    { title: '母婴、玩具类', value: 3005, type: 3 },
    { title: '家居、家电、家具类', value: 3006, type: 3 },
    { title: '摩托车、自行车类', value: 3007, type: 3 },
    { title: '花艺', value: 3008, type: 3 },
    { title: '药店', value: 3009, type: 3 },
    { title: '美妆日化类', value: 3010, type: 3 },
    { title: '日用百货、超市、便利店等', value: 3011, type: 3 },
    { title: '其他', value: 3012, type: 3 },
    { title: '酒吧', value: 4001, type: 4 },
    { title: '饮品', value: 4002, type: 4 },
    { title: '餐厅', value: 4003, type: 4 },
    { title: 'KTV、密室逃脱、电影院等文娱类', value: 5001, type: 5 },
    { title: '美容、美发、美甲美睫', value: 5002, type: 5 },
    { title: '瑜伽、舞蹈、健身类', value: 5003, type: 5 },
    { title: '足浴按摩', value: 5004, type: 5 },
    { title: '洗涤护理', value: 5005, type: 5 },
    { title: '教育培训类', value: 5006, type: 5 },
    { title: '婚纱摄影类', value: 5007, type: 5 },
    { title: '宠物', value: 5008, type: 5 },
    { title: '旅游', value: 5009, type: 5 },
    { title: '其他', value: 5010, type: 5 }
  ],
  // 职业岗位
  OCCUPATION: [
    {
      text: '国家机关、党群组织、企业、事业单位负责人',
      value: '1',
      children: [
        { text: '中国共产党机关负责人', value: '1001' },
        { text: '国家机关负责人', value: '1002' },
        { text: '民主党派和工商联负责人', value: '1003' },
        { text: '人民团体和群众团体、社会组织及其他成员组织负责人', value: '1004' },
        { text: '基层群众自治组织负责人', value: '1005' },
        { text: '企事业单位负责人', value: '1006' }
      ]
    },
    {
      text: '专业技术人员',
      value: '2',
      children: [
        { text: '科学研究人员', value: '2001' },
        { text: '工程技术人员', value: '2002' },
        { text: '农业技术人员', value: '2003' },
        { text: '飞机和船舶技术人员', value: '2004' },
        { text: '卫生专业技术人员', value: '2005' },
        { text: '经济和金融专业人员', value: '2006' },
        { text: '法律、社会和宗教专业人员', value: '2007' },
        { text: '教学人员', value: '2008' },
        { text: '文学艺术、体育专业人员', value: '2009' },
        { text: '新闻出版、文化专业人员', value: '2010' },
        { text: '其他专业技术人员', value: '2011' }
      ]
    },
    {
      text: '办事人员和有关人员',
      value: '3',
      children: [
        { text: '办事人员', value: '3001' },
        { text: '安全和消防人员', value: '3002' },
        { text: '其他办事人员和有关人员', value: '3003' }
      ]
    },
    {
      text: '商业、服务业人员',
      value: '4',
      children: [
        { text: '批发与零售服务人员', value: '4001' },
        { text: '交通运输、仓储和邮政业服务人员', value: '4002' },
        { text: '住宿和餐饮服务人员', value: '4003' },
        { text: '信息传输、软件和信息技术服务人员', value: '4004' },
        { text: '金融服务人员', value: '4005' },
        { text: '房地产服务人员', value: '4006' },
        { text: '租赁和商务服务人员', value: '4007' },
        { text: '技术辅助服务人员', value: '4008' },
        { text: '水利、环境和公共设施管理服务人员', value: '4009' },
        { text: '居民服务人员', value: '4010' },
        { text: '其他社会生产和生活服务人员', value: '4011' }
      ]
    },
    {
      text: '农、林、牧、渔、水利业生产人员',
      value: '5',
      children: [
        { text: '农业生产人员', value: '5001' },
        { text: '林业生产人员', value: '5002' },
        { text: '畜牧业生产人员', value: '5003' },
        { text: '渔业生产人员', value: '5004' },
        { text: '农林牧渔生产辅助人员', value: '5005' },
        { text: '其他农、林、牧、渔业生产及辅助人员', value: '5006' }
      ]
    },
    {
      text: '生产、运输设备操作人员及有关人员',
      value: '6',
      children: [
        { text: '农副产品加工人员', value: '6001' },
        { text: '食品、饮料生产加工人员', value: '6002' },
        { text: '烟草及其制品加工人员', value: '6003' },
        { text: '纺织、针织、印染人员', value: '6004' },
        { text: '纺织品、服装和皮革、毛皮制品加工制作人员', value: '6005' },
        { text: '木材加工、家具与木制品制作人员', value: '6006' },
        { text: '纸及纸制品生产加工人员', value: '6007' },
        { text: '印刷和记录媒介复制人员', value: '6008' },
        { text: '文教、工美、体育和娱乐用品制作人员', value: '6009' },
        { text: '石油加工和炼焦、煤化工生产人员', value: '6010' },
        { text: '通用设备制造人员', value: '6011' },
        { text: '运输设备和通用工程机械操作人员及有关人员', value: '6012' },
        { text: '其他生产制造及有关人员', value: '6013' }
      ]
    },
    {
      text: '军人',
      value: '7',
      children: [{ text: '军人', value: '7001' }]
    },
    {
      text: '不便分类的其他从业人员',
      value: '8',
      children: [
        { text: '离退休人员', value: '8003' },
        { text: '自由职业', value: '8004' },
        { text: '私营业主', value: '8005' },
        { text: '网商经营者', value: '8006' },
        { text: '家庭主妇/主夫', value: '8007' },
        { text: '无业', value: '8008' }
      ]
    }
  ],
  // 门店主要收款方式
  PAYINWAY: [
    { value: 1, title: '微信收款' },
    { value: 2, title: '支付宝收款' },
    { value: 3, title: '第三方收银软件' },
    { value: 0, title: '其他' }
  ],
  // 店铺进货货款支付方式
  PAYOUTWAY: [
    { value: 1, title: '微信支付' },
    { value: 2, title: '支付宝支付' },
    { value: 3, title: '银行卡/信用卡' },
    { value: 0, title: '其他' }
  ],
  // 经营数据类型
  OPERATETYPES: [
    { value: 1, title: '收银机' },
    { value: 2, title: 'pos机' },
    { value: 3, title: '银行流水' },
    { value: 0, title: '无' }
  ],
  // 经营形式
  OPERATEMODE: [
    { value: 0, title: '无实际经营' },
    { value: 1, title: '实体线下经营' },
    { value: 2, title: '纯线上网络经营' }
  ],
  // 其它收入来源
  OTHERINCOME: [
    { value: 1, title: '是' },
    { value: 0, title: '不清楚' }
  ],
  // 是否分淡旺季
  MERCHANTMONTH: [
    { value: 1, title: '是' },
    { value: 0, title: '否' }
  ],
  // 是否分淡旺季
  MERCHANTINCOMEMONTH: [
    { value: 11, title: '1月' },
    { value: 12, title: '2月' },
    { value: 13, title: '3月' },
    { value: 14, title: '4月' },
    { value: 15, title: '5月' },
    { value: 16, title: '6月' },
    { value: 17, title: '7月' },
    { value: 18, title: '8月' },
    { value: 19, title: '9月' },
    { value: 20, title: '10月' },
    { value: 21, title: '11月' },
    { value: 22, title: '12月' }
  ],
  // 尽调报告-客户来源-枚举值
  PH_USER_SOURCE_ENUM: [
    { value: 1, title: '地推' },
    { value: 2, title: '电销' },
    { value: 3, title: '转介绍' },
    { value: 4, title: '客户自主' },
    { value: 5, title: '其他' }
  ],
  // 尽调报告-贷款用途-枚举值
  PH_LOAN_PURPOSE_ENUM: [
    { value: 1, title: '经营周转' },
    { value: 2, title: '扩大规模' },
    { value: 3, title: '设备购置' },
    { value: 4, title: '店铺装修' },
    { value: 5, title: '发工资' },
    { value: 6, title: '房租' },
    { value: 7, title: '合伙投资' },
    { value: 8, title: '生活消费' },
    { value: 9, title: '其他' }
  ],
  ALL_PHOTO_SELECT_MODES: [
    { title: '相机拍摄', value: 0 },
    { title: '相册选取', value: 1 }
  ],
  // 质量-提还-交易筛选项
  REPAY_FILTERS: ['交易30天内提还', '交易30-60天内提还', '交易60-90天内提还', '交易90天以上提还'],
  // 竞品提额中，涉及度小满及网商贷最近1次借款/还款日期，当用户未选择或清空时，由原来的未上报，改为上报为'0'
  NULLDATE: '0'
}
export default Object.freeze(CONSTS)
