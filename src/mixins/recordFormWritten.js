import { apiBase } from '@/api'
import { Dialog } from '@/components'
export default function () {
  return {
    filters: {
      dateFilter: function (v) {
        if (!v) return ''
        const _v = new Date(v)
        const _d = {
          y: _v.getFullYear(),
          m: _v.getMonth() + 1,
          d: _v.getDate(),
          h: _v.getHours(),
          min: _v.getMinutes()
        }
        return `${_d.y}年${_d.m}月${_d.d}日 ${_d.h}:${_d.min < 10 ? '0' + _d.min : _d.min}`
      }
    },
    data () {
      return {}
    },
    computed: {
      // 显示选项弹窗
      showPop: {
        get: function () {
          return !!this.popupObj
        },
        set: function (v) {
          this.popupObj = null
        }
      },
      visibleTxt: function () {
        return this.limit ? '仅自己可见' : '领导可见'
      },
      // 提交按钮灰显
      saveAble: function () {
        let saveAble = true
        if (this.R.record_form) {
          Object.keys(this.R.record_form).forEach(key => {
            const v = this.R.record_form[key]
            if (v instanceof Array && !v.length) {
              saveAble = false
            }
            if (!v) {
              saveAble = false
              return false
            }
          })
        } else {
          saveAble = false
        }
        return saveAble
      }
    },
    created () {},
    methods: {
      /**
       * interface begin
       * 获取问卷选项配置
       */
      async getTemplate () {
        const R = await apiBase.getHippoConfig({ name_space: 'hippo.work_common_config', name: 'reocrd_template1' })
        R && this.$set(this, 'R', R)
      },
      // 是否展示选项
      showOption (group) {
        // 判断选线是否有show属性，如果有则判断show依赖的选项的值
        return !group.show || (group.show && group.show.every((item) => item.target === this.R.record_form[item.key]))
      },
      // 设置record_form表单中图片项的值
      setRecordForm (list, key) {
        this.$set(this.R.record_form, key, list)
      },
      // 格式化图片上传数量
      imgLengthFormatter (val) {
        if (val && val.length) {
          return `${val.length}`
        }
        return '0'
      },
      // 获取day天前时间
      getReqTime (day) {
        const t = new Date(new Date().getTime() - (day ? day * 24 * 3600 * 1000 : 0))
        return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${('0' + t.getHours()).substr(-2)}:${('0' + t.getMinutes()).substr(-2)}:${('0' + t.getSeconds()).substr(-2)}`
      },
      // 提交使用时间格式
      timeFormater (v) {
        if (!v) return
        const _t = {
          y: v.getFullYear(),
          m: v.getMonth() + 1,
          d: v.getDate()
        }
        const today = new Date()
        const time = {
          h: today.getHours(),
          m: today.getMinutes(),
          s: today.getSeconds()
        }
        return `${_t.y}-${_t.m}-${_t.d} ${('0' + time.h).substr(-2)}:${('0' + time.m).substr(-2)}:${('0' + time.s).substr(-2)}`
      },
      // 显示tips说明
      showTips (val) {
        const h = this.$createElement
        const content = []
        val.forEach((item) => {
          const template = h('p', { style: { marginTop: '12px' } }, item)
          content.push(template)
        })
        const message = h(
          'div',
          {
            style: {
              textAlign: 'left',
              color: '#050C1C',
              fontSize: '14px',
              lineHeight: '20px'
            }
          },
          content
        )
        Dialog({
          message,
          buttons: [
            {
              text: '知道了',
              handler: (done) => {
                done()
              }
            }
          ]
        })
      },
      // 数据反写
      templateWrite (res) {
        this.recordMsg = res.detail || res.content_detail
        this.address = res.address
        this.date = new Date(res.follow_time.replace(/-/g, '/'))
        this.limit = !!res.only_flag
        // 选项
        const list = res.user_follow_answer_d_t_o_list
        if (list && list.length) {
          list.forEach((l) => {
            const qL = l.question_choose_d_t_o_list || []
            const item = this.getItemByKeyInGroup(l.question_key)
            const multi = item.multiple
            const imageType = item.image_type
            if (imageType) {
              // 从choose_desc中取出图片链接渲染
              const arr = qL.map((q) => q.choose_desc)
              this.$set(this.R.record_form, l.question_key, arr)
              // 设置跟进凭证默认图片
              this.setImageUpload(arr)
            } else if (multi) {
              const arr = qL.map((q) => +q.choose_key)
              this.$set(this.R.record_form, l.question_key, arr)
            } else {
              this.$set(this.R.record_form, l.question_key, +qL[0].choose_key)
            }
          })
        }
      },
      // 根据key获取Group中的Item
      getItemByKeyInGroup (key) {
        let curItemInGroup = null
        this.R.record_groups.forEach((g) => {
          const target = g.list.filter((l) => l.key === key)
          if (target && target.length) {
            curItemInGroup = target[0]
            return false
          }
        })
        return curItemInGroup || {}
      },
      // 弹出层item选择状态
      itemChecked (item) {
        const { multiple, key } = this.popupObj
        if (!multiple) {
          // 非多选
          return item.value === this.R.record_form[key]
        } else {
          return (this.R.record_form[key] && this.R.record_form[key].includes(item.value)) || this.multiCheckArr.includes(item.value)
        }
      },
      // 主页 每项选中文案title
      showSelectItem (gIdx, lIdx) {
        const { multiple = false, key } = this.R.record_groups[gIdx].list[lIdx]
        const reflecList = this.R.record_popup[key] || []
        if (multiple && this.R.record_form[key]) {
          // this.R.record_form[key].sort((a, b) => a - b)
          const title = []
          for (let i = 0; i < reflecList.length; i++) {
            if (this.R.record_form[key].includes(reflecList[i].value)) {
              title.push(reflecList[i].title)
            }
          }
          return title.join(',') || '请选择'
        } else {
          const selected = reflecList.filter((v) => v.value === this.R.record_form[key])[0]
          return selected ? selected.title : '请选择'
        }
      },
      // pop弹窗弹出
      popSelect (gIdx, lIdx) {
        if (this.rid) return
        const item = this.R.record_groups[gIdx].list[lIdx]
        const { key, multiple = false, add, changer } = item
        this.popupObj = {
          title: item.title,
          list: this.R.record_popup[key] || [],
          multiple,
          key,
          add,
          changer
        }
        if (multiple) {
          this.multiCheckArr = this.R.record_form[key]
        }
      },
      // pop选项选择
      checkHandler (item) {
        const { multiple, key, add = null, changer = null } = this.popupObj
        if (multiple) {
          // 多选 - 保存在下
          const index = this.multiCheckArr.indexOf(item.value)
          if (index !== -1) {
            this.multiCheckArr.splice(index, 1)
          } else {
            this.multiCheckArr.push(item.value)
          }
        } else {
          this.$set(this.R.record_form, key, item.value)
          add &&
            add.forEach((addItem) => {
              if (addItem && addItem.new_attr && addItem.new_attr.length) {
                for (let i = 0; i < addItem.new_attr.length; i++) {
                  if (item.value === addItem.target) {
                    // 写入
                    // 判断新增的项是不是多选
                    let multiKey = ''
                    this.R.record_groups.forEach((v) => {
                      v.list.forEach((vv) => {
                        if (vv.multiple) {
                          multiKey = vv.key
                        }
                      })
                    })
                    // 选了未下单-7天内是否有填写过的数据-默认填入===找出tempInSeven保存的值
                    if (key === 'record_order' && this.tempInSeven) {
                      this.tempInSeven.user_follow_answer_d_t_o_list.forEach((ts) => {
                        if (ts.question_key === addItem.new_attr[i]) {
                          const defaultV = ts.question_choose_d_t_o_list.map((tl) => +tl.choose_key)
                          if (addItem.new_attr[i] === multiKey) {
                            this.$set(this.R.record_form, addItem.new_attr[i], defaultV)
                          } else {
                            this.$set(this.R.record_form, addItem.new_attr[i], defaultV[0])
                          }
                        }
                      })
                    } else {
                      // 选择是否成功联系
                      if (key === 'record_contact') {
                        // 判断是否选择过跟进事项，且跟进事项为1||2才新增选项
                        if (+this.R.record_form.record_matter === 1 || +this.R.record_form.record_matter === 2) {
                          // 跟进事项选择1-逾期提醒，则新增逾期原因；跟进事项选择2-促交易，则新增是否下单成功
                          this.$set(this.R.record_form, addItem.new_attr[this.R.record_form.record_matter - 1], addItem.new_attr[i] === multiKey ? [] : null)
                        }
                        // 选择跟进事项
                      } else if (key === 'record_matter') {
                        // 跟进事项为 1-逾期提醒
                        if (+item.value === 1) {
                          // 新增非关联的选项
                          if (!addItem.related_attr.includes(addItem.new_attr[i])) {
                            this.$set(this.R.record_form, addItem.new_attr[i], addItem.new_attr[i] === multiKey ? [] : null)
                          }
                          // 是否成功联系选择1-是时，才新增关联的选项
                          if (addItem.related_attr.includes(addItem.new_attr[i]) && +this.R.record_form.record_contact === 1) {
                            // 新增逾期原因
                            this.$set(this.R.record_form, addItem.new_attr[i], addItem.new_attr[i] === multiKey ? [] : null)
                          }
                        }
                        // 跟进事项为 2-促交易，且是否成功联系选择1-是时，才新增选项
                        if (+item.value === 2 && +this.R.record_form.record_contact === 1) {
                          // 新增是否下单成功
                          this.$set(this.R.record_form, addItem.new_attr[i], addItem.new_attr[i] === multiKey ? [] : null)
                        }
                        // 跟进事项为 3-还款提醒,新增选项
                        if (+item.value === 3) {
                          // 新增是否下单成功
                          this.$set(this.R.record_form, addItem.new_attr[i], addItem.new_attr[i] === multiKey ? [] : null)
                        }
                      } else {
                        this.$set(this.R.record_form, addItem.new_attr[i], addItem.new_attr[i] === multiKey ? [] : null)
                      }
                    }
                  } else {
                    // 删除
                    this.$delete(this.R.record_form, addItem.new_attr[i])
                    // 删除的add属性为record_voucher时，需要清空图片
                    if (addItem.new_attr[i] === 'record_voucher') {
                      this.clearImgs()
                    }
                    // 删除的时候还需要判断被删除对象是否还有add项，有的话也要全部删除
                    if (addItem.new_attr[i]) {
                      let addObj = null
                      this.R.record_groups.forEach((groupsItem) => {
                        groupsItem.list.forEach((listItem) => {
                          if (listItem.key === addItem.new_attr[i]) {
                            addObj = listItem.add
                          }
                        })
                      })
                      // 如果这个被删属性带有add对象，删除add里面所有属性
                      addObj &&
                        addObj.forEach((objItem) => {
                          if (objItem && objItem.new_attr) {
                            objItem.new_attr.forEach((attrItem) => {
                              this.$delete(this.R.record_form, attrItem)
                            })
                          }
                        })
                    }
                  }
                }
              }
            })
          // 选中模板值后设置其他项默认值
          if (changer && changer.target === item.value) {
            changer.default.forEach((df) => {
              this.$set(this.R.record_form, df.key, df.value)
            })
          }
          this.$nextTick(() => {
            console.log('form: ', this.R.record_form)
          })
          this.popupObj = null
        }
      },
      // 多选保存
      multiSave () {
        const { key } = this.popupObj
        this.multiCheckArr.forEach((v, i) => {
          this.$set(this.R.record_form[key], i, v)
        })
        this.multiCheckArr = []
        this.popupObj = null
      },
      // 提交接口参数
      submitParams () {
        let followRelaType = 0
        if (+this.R.record_form.record_matter === 1) {
          followRelaType = 1
        } else if (+this.R.record_form.record_matter === 3) {
          followRelaType = 2
        }
        const params = {
          address: this.address,
          detail: this.recordMsg,
          follow_time: this.timeFormater(this.date),
          mid: this.$user.mid,
          uid: this.uid, // 客户详情-跟进记录提交uid
          visit_id: this.visitId, // 意向客户详情-跟进记录提交visit_id
          only_flag: this.limit ? 1 : 0,
          questionInfoDTOList: [],
          // 逾期跟进添加提交权限
          extendJson: this.overdue_uid ? { overdue_uid: +this.overdue_uid } : undefined,
          // 是否是逾期跟进
          overdueFollow: this.R.record_form.record_matter === 1,
          // 跟进记录关联场景类型；1：逾期；2：还款
          follow_rela_type: followRelaType
        }
        const forms = Object.keys(this.R.record_form)
        // 推送目标字段到第一位置start
        const targetPlace = ['record_type']
        forms.forEach((v, i) => {
          if (targetPlace.includes(v)) {
            forms.splice(i, 1)
          }
        })
        targetPlace.forEach(v => {
          forms.unshift(v)
        })
        // 推送目标字段到第一位置end
        forms.forEach(v => {
          let curItemInGroup = null
          this.R.record_groups.forEach(g => {
            const target = g.list.filter(l => l.key === v)
            if (target && target.length) {
              curItemInGroup = target[0]
              return false
            }
          })
          let curItemInPopup = null
          // 如果是图片类型，需要从record_form表单中取值提交
          if (curItemInGroup.image_type) {
            curItemInPopup = this.R.record_form[v].map((item, index) => {
              // choose_key限制64字节，图片链接存放在choose_desc中
              return { value: index + 1, title: item }
            })
          } else if (curItemInGroup.multiple) {
            curItemInPopup = this.R.record_popup[v].filter(p => this.R.record_form[v].includes(p.value))
          } else {
            curItemInPopup = this.R.record_popup[v].filter(p => this.R.record_form[v] === p.value)
          }
          // 问题类型：20-多选，10-单选，30-图片
          let questionType = 10
          if (curItemInGroup.multiple) {
            questionType = 20
          } else if (curItemInGroup.image_type) {
            questionType = 30
          }
          params.questionInfoDTOList.push({
            questionKey: v,
            questionDesc: curItemInGroup.title,
            questionType,
            questionChooseDTOList: curItemInPopup.map(c => {
              return {
                chooseDesc: c.title,
                chooseKey: c.value
              }
            })
          })
        })
        return params
      }
    }
  }
}
