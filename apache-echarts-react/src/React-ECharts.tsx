import {
  ECharts,
  EChartsOption,
  getInstanceByDom,
  init,
  SetOptionOpts
} from 'echarts'
import { CSSProperties, useEffect, useRef } from 'react'

interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
}

function ReactECharts ({
  option,
  style,
  settings,
  loading,
  theme
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let chart: ECharts | undefined
    if (chartRef.current != null) {
      chart = init(chartRef.current, theme)
    }

    function resizeChart () {
      chart?.resize()
    }

    window.addEventListener('resize', resizeChart)
    chart?.setOption(option)

    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [theme, option])

  useEffect(() => {
    if (chartRef.current != null) {
      const chart = getInstanceByDom(chartRef.current)

      if (loading) {
        chart?.showLoading()
        return
      }

      chart?.hideLoading()
    }
  }, [loading, theme])

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '500px', ...style }}
    ></div>
  )
}

export { ReactECharts }
export type { ReactEChartsProps }
