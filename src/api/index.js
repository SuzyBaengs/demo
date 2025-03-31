import Generator from './generator'
import base from './modules/base'
import agent from './modules/agent'
import info from './modules/info'
import customer from './modules/customer'
import coupon from './modules/coupon'
import home from './modules/home'
import workbench from './modules/workbench'
import order from './modules/order'
import face from './modules/face'
import longhu from './modules/longhu'
import tools from './modules/tools'
import complaint from './modules/complaint'
import booking from './modules/booking'
import management from './modules/management'
import riskmanager from './modules/riskmanager'
import puhui from './modules/puhui'
import ordermonitor from './modules/ordermonitor'
import data from './modules/data'
import agencyData from './modules/agency-data'
import lehuaLock from './modules/lehua-lock'
import orderV2 from './modules/order_v2'
import businessManagement from './modules/business-management'
import members from './modules/members'
import notice from './modules/notice'
import redpack from './modules/redpack'
import assistant from './modules/assistant'
import orderMaterials from './modules/order-materials'
import activity from './modules/activity'
import salary from './modules/salary'
import help from './modules/help'
import login from './modules/login'
import overdue from './modules/overdue'
import rr2 from './modules/rr2'
import business from './modules/business'
import scheduleManagement from './modules/schedule-management'
import preFilter from './modules/pre-filter'
import businessTrack from './modules/business-track'
import mall from './modules/mall'

const apiBase = new Generator(base)
const apiAgent = new Generator(agent)
const apiInfo = new Generator(info)
const apiCustomer = new Generator(customer)
const apiCoupon = new Generator(coupon)
const apiHome = new Generator(home)
const apiWorkbench = new Generator(workbench)
const apiOrder = new Generator(order)
const apiFace = new Generator(face)
const apiLonghu = new Generator(longhu)
const apiTools = new Generator(tools)
const apiComplaint = new Generator(complaint)
const apiBooking = new Generator(booking)
const apiManagement = new Generator(management)
const apiRiskmanager = new Generator(riskmanager)
const apiPuhui = new Generator(puhui)
const apiOrdermonitor = new Generator(ordermonitor)
const apiData = new Generator(data)
const apiAgencyData = new Generator(agencyData)
const apiLehuaLock = new Generator(lehuaLock)
const apiOrder2 = new Generator(orderV2)
const apiBusinessManagement = new Generator(businessManagement)
const apiMembers = new Generator(members)
const apiNotice = new Generator(notice)
const apiRedpack = new Generator(redpack)
const apiAssistant = new Generator(assistant)
const apiOrderMaterials = new Generator(orderMaterials)
const apiActivity = new Generator(activity)
const apiSalary = new Generator(salary)
const apiHelp = new Generator(help)
const apiLogin = new Generator(login)
const apiOverdue = new Generator(overdue)
const apiRR2 = new Generator(rr2)
const apiBusiness = new Generator(business)
const apiScheduleManagement = new Generator(scheduleManagement)
const apiPreFilter = new Generator(preFilter)
const apiBusinessTrack = new Generator(businessTrack)
const apiMall = new Generator(mall)

export {
  apiBase,
  apiAgent,
  apiInfo,
  apiCustomer,
  apiHome,
  apiWorkbench,
  apiOrder,
  apiCoupon,
  apiFace,
  apiLonghu,
  apiTools,
  apiComplaint,
  apiBooking,
  apiManagement,
  apiRiskmanager,
  apiPuhui,
  apiOrdermonitor,
  apiData,
  apiAgencyData,
  apiLehuaLock,
  apiOrder2,
  apiBusinessManagement,
  apiMembers,
  apiNotice,
  apiRedpack,
  apiAssistant,
  apiOrderMaterials,
  apiActivity,
  apiSalary,
  apiHelp,
  apiLogin,
  apiOverdue,
  apiRR2,
  apiBusiness,
  apiScheduleManagement,
  apiPreFilter,
  apiBusinessTrack,
  apiMall
}
