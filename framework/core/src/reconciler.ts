/**
 * @name 调和
 */
import { IFiber, AriseElement, ITaskCallback, FunctionComponent, Attributes, HTMLElementEx, AriseNode, FiberMap, IRef, IEffect } from './type'
import { createDom, updateDom } from './dom'
import {} from './hooks'
import { scheduleWork, shouldYield, schedule } from "./scheduler"
import { createElement } from './createElement'

let preCommit: IFiber | undefined
let currentFiber: IFiber
let WIP: IFiber | undefined
let commits: IFiber[] = []

const microTask: IFiber[] = []

export const render = (element: AriseNode, container: Node, done?: () => void): void => {
  const rootFiber = {
    node: container,
    props: {
      children: element
    },
    done,
  } as IFiber
  dispatchUpdate(rootFiber)
}

function dispatchUpdate(fiber?: IFiber) {
  if(fiber && !fiber.lane) {
    fiber.lane = true
    microTask.push(fiber)
  }
  scheduleWork(reconcileWork as ITaskCallback)
}

function reconcileWork(timeout: boolean): boolean | null | ITaskCallback {
    if(!WIP) {
      WIP = microTask.shift()
    }
    while (WIP && (!shouldYield() || timeout)) {
      WIP = reconcile(WIP)
    }
    return null
}


function reconcile(WIP: IFiber): IFiber | undefined {
  WIP.parentNode = getParentNode(WIP) as HTMLElementEx
  try {
    if (typeof WIP.type === "function") {
      updateHook(WIP)
    } else {
      updateHost(WIP)
    }
  } catch (error) {
    
  }
  return undefined
}

function updateHook<P = Attributes>(WIP:IFiber): void {
  currentFiber = WIP
}

function updateHost(WIP:IFiber): void {
  // currentFiber = 
}

function getParentNode(WIP: IFiber) {
  while ((WIP = WIP.parent)) {
    if(typeof WIP.type !== "function") {
      return WIP.node
    }
  }
}