import Demo from './demo/demo'
import MGrid from './grid/grid'
import MItem from './grid/item'

let Plugin = {}
Plugin.install = function(Vm, parms) {
	Vm.component(Demo.name, Demo)
	Vm.component(MGrid.name, MGrid)
	Vm.component(MItem.name, MItem)
}

export default Plugin
