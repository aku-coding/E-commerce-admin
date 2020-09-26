export type AriseText = string | number
export interface AriseElement<P extends Attributes = any, T = string> {
  type: T
  props: P
}
export type AriseNode =
  | AriseText
  | AriseElement
  | AriseNode[]
  | boolean
  | null
  | undefined

export type Key = AriseText

export interface RefObject<T> {
  current: T
}

export type RefCallback<T> = {
  bivarianceHack(instance: T | null): void
}['bivarianceHack']

export type Ref<T = any> = RefCallback<T> | RefObject<T> | null

export interface Attributes {
  key?: Key
  children?: AriseNode
  ref?: Ref
}


export interface IFiber<P extends Attributes = any> {
  tag: number
  key?: null | string
  type: string | FunctionComponent<P>
  node: HTMLElementEx
  parentNode: HTMLElementEx
  children: FiberMap<P>
  parent?: IFiber<P>
  child?: IFiber<P>
  sibling?: IFiber<P>
  ref: IRef
  hooks: IHook
  lastProps: P
  insertPoint: IFiber | null
  props: P
  oldProps: P
  time?: number
  promise?: Promise<Function>[]
  // 优先级相关
  lane?: boolean
}

export interface FunctionComponent<P extends Attributes = {}> {
  (props: P): AriseElement<P> | null
  fiber?: IFiber,
  tag?: number,
  type?: string
}

export type HookTypes = 'list' | 'effect' | 'layout'
export type HTMLElementEx = HTMLElement & { last: IFiber | null }
export type IEffect = [Function?, number?, Function?]

export interface IHook {
  list: IEffect[]
  layout: IEffect[]
  effect: IEffect[]
}

export type IRef = (
  e: HTMLElement | undefined
) => void | { current?: HTMLElement }

export type FiberMap<P> = Record<string, IFiber<P>>

export type SetStateAction<S> = S | ((prevState: S) => S)
export type Dispatch<A> = (value: A, resume?: boolean) => void
export type Reducer<S, A> = (prevState: S, action: A) => S
export type IVoidCb = () => void
export type EffectCallback = () => void | (IVoidCb | undefined)
export type DependencyList = Array<any>

export interface PropsWithChildren {
  children?: AriseNode
}

export type ITaskCallback =
  | ((time: number | boolean) => boolean)
  | boolean
  | null

export interface ITask {
  callback?: ITaskCallback
  time: number
}

export type DOM = HTMLElement | SVGElement

export type Option = Record<string, Function>