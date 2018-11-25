import { makeGeometry } from 'utils/Draw'

const createBoundaryLines = (bound, props) => ([
  makeGeometry(-bound, -bound, -bound, bound, props.maxLineWidth),
  makeGeometry(-bound, bound, bound, bound, props.maxLineWidth),
  makeGeometry(bound, bound, bound, -bound, props.maxLineWidth),
  makeGeometry(bound, -bound, -bound, -bound, props.maxLineWidth),
])

export default createBoundaryLines
