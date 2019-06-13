import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export function secondsFormat(date, format = 'H[h] m[m] ss[s]') {
  return moment.utc(date).format(format)
}

export function TimeCounter({ finishTime, initialTime, format, addTime }) {
  const [milliseconds, setMilliseconds] = useState(moment().valueOf())

  useEffect(() => {
    let timer = null
    if (!finishTime) {
      timer = setInterval(() => setMilliseconds(ms => ms + 1000), 1000)
    }
    return () => clearInterval(timer)
  }, [finishTime])

  const start = moment(initialTime).valueOf()
  const end = finishTime ? moment(finishTime).valueOf() : milliseconds

  return <span>{secondsFormat(initialTime ? Math.max(0, end - start + addTime) : 0, format)}</span>
}

TimeCounter.defaultProps = {
  addTime: 0,
  finishTime: 0,
  format: 'H[h] m[m] ss[s]'
}

TimeCounter.propTypes = {
  initialTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  finishTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addTime: PropTypes.number,
  format: PropTypes.string
}
