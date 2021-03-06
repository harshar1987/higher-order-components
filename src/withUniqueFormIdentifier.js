import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import seededRandom from 'seed-random'

const TOKENS = /[xy]/g

const uuid = seed => {
  const random = seed === undefined ? Math.random : seededRandom(seed)

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(TOKENS, c => {
    const r = (random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

let counter = 0
export default Target => {
  class WithUniqueFormIdentifier extends Component {
    constructor() {
      super()

      this.uniqueFormIdentifier = `${Target.displayName || Target.name}-${uuid(counter++)}`
    }

    render() {
      return <Target name={this.uniqueFormIdentifier} {...this.props} />
    }
  }

  WithUniqueFormIdentifier.displayName = wrapDisplayName(Target, 'withUniqueFormIdentifier')

  return WithUniqueFormIdentifier
}
