import { expect as chaiExpect } from 'chai'
import * as Sinon from 'sinon'

declare global {
    export const expect: typeof chaiExpect
    export const sinon: typeof Sinon
}