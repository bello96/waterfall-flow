import _Water_ from './components/_Water_.vue'
import _Water_Cell_ from './components/_Water_Cell_.vue'
const components = [_Water_,_Water_Cell_]
const install = function (Vue) {
  components.forEach(function (item) {
    Vue.component(item.name, item)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  _Water_,
  _Water_Cell_,
  install
}