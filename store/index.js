import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import counter from './modules/counter'
import manager from './modules/manager'
const createStore = () => {
    return new Vuex.Store({

        plugins: [pathify.plugin],

        modules: {
            counter, manager
        },
        actions: {
        }
    })
}

export default createStore
