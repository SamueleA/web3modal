import { proxy, subscribe as valtioSub } from 'valtio/vanilla'
import type { ConfigCtrlState, ConfigOptions } from '../types/controllerTypes'
import { OptionsCtrl } from './OptionsCtrl'

// -- initial state ------------------------------------------------ //
function isDarkMode() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
}

const state = proxy<ConfigCtrlState>({
  configured: false,
  projectId: '',
  theme: isDarkMode() ? 'dark' : 'light',
  accentColor: 'default',
  standaloneChains: undefined
})

// -- controller --------------------------------------------------- //
export const ConfigCtrl = {
  state,

  subscribe(callback: (newState: ConfigCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  setConfig(config: ConfigOptions) {
    if (config.standaloneChains?.length) OptionsCtrl.setStandaloneChains(config.standaloneChains)
    Object.assign(state, config)
    state.configured = true
  }
}