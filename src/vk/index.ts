import { key2code } from './key2code'
import { name2code } from './name2code'
import { vk_infos } from './vk_infos'

export type key2codeT = typeof key2code
export type name2codeT = typeof name2code
export type vk_codesT = typeof vk_infos

const _keys = Object.entries(key2code).map((o) => o[0]) as (keyof key2codeT)[]
const _names = Object.entries(name2code).map(
  (o) => o[0]
) as (keyof name2codeT)[]
const _codes = Object.entries(vk_infos).map((o) => +o[0]) as (keyof vk_codesT)[]

export const vk = {
  keys: _keys,
  names: _names,
  codes: _codes,
  infos: vk_infos,
  key2code,
  name2code
}