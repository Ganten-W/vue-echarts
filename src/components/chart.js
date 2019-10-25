function createOption () {
  var rawData = [
    [55, 9, 'a'],
    [25, 11],
    [56, 7],
    [33, 7],
    [42, 24],
    [82, 58],
    [74, 49],
    [78, 55],
    [267, 216],
    [185, 127],
    [39, 19],
    [41, 11]
  ]
  var arr = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6']
  var CATEGORY_DIM_COUNT = 6
  var GAP = 1
  var BASE_LEFT = 5
  var BASE_TOP = 10
  var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP
  var GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP
  // var CATEGORY_DIM = 7
  var SYMBOL_SIZE = 3

  function addVariable (option) {
    var index = 0
    for (let i = 0; i < arr.length; i++) {
      option.grid.push({
        left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
        top: BASE_TOP + i * (GRID_HEIGHT + GAP) + '%',
        width: GRID_WIDTH + '%',
        height: GRID_HEIGHT + '%'
      })

      option.xAxis.push({
        show: false,
        type: 'category',
        gridIndex: index
      })

      option.yAxis.push({
        show: false,
        type: 'category',
        gridIndex: index
      })

      option.series.push(
        {
          type: 'heatmap',
          data: [[0, 0, 0]],
          xAxisIndex: index,
          yAxisIndex: index,
          label: {
            fontSize: 20,
            color: '#409eff',
            show: true,
            formatter () {
              return arr[i]
            }
          }

        })
      index++
    }
    return index
  }

  function generateGrids (option, index) {
    var lindex = index
    console.log(lindex)
    for (var i = 0; i < CATEGORY_DIM_COUNT; i++) {
      for (var j = 0; j < CATEGORY_DIM_COUNT; j++) {
        if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
          continue
        }

        option.grid.push({
          left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
          top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
          width: GRID_WIDTH + '%',
          height: GRID_HEIGHT + '%',
        })

        option.xAxis.push({
          splitNumber: 3,
          position: 'top',
          axisLine: {
            show: j === 0,
            onZero: false
          },
          axisTick: {
            show: j === 0,
            inside: true
          },
          axisLabel: {
            show: j === 0
          },
          type: 'value',
          gridIndex: lindex,
          scale: true
        })

        option.yAxis.push({
          splitNumber: 3,
          position: 'right',
          axisLine: {
            show: i === CATEGORY_DIM_COUNT - 1,
            onZero: false
          },
          axisTick: {
            show: i === CATEGORY_DIM_COUNT - 1,
            inside: true
          },
          axisLabel: {
            show: i === CATEGORY_DIM_COUNT - 1
          },
          type: 'value',
          gridIndex: lindex,
          scale: true
        })

        option.series.push({
          type: 'scatter',
          symbolSize: SYMBOL_SIZE,
          xAxisIndex: lindex,
          yAxisIndex: lindex,
          data: rawData
        })

        lindex++
      }
    }
    return lindex
  }

  function addData (option, index) {
    var lindex = index

    for (var i = 0; i < CATEGORY_DIM_COUNT; i++) {
      for (var j = 0; j < CATEGORY_DIM_COUNT; j++) {
        if (CATEGORY_DIM_COUNT - i + j <= CATEGORY_DIM_COUNT) {
          continue
        }

        option.grid.push({
          left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
          top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
          width: GRID_WIDTH + '%',
          height: GRID_HEIGHT + '%'
        })

        option.xAxis.push({
          show: false,
          type: 'category',
          gridIndex: lindex
        })

        option.yAxis.push({
          show: false,
          type: 'category',
          gridIndex: lindex
        })

        option.series.push(
          {
            type: 'heatmap',
            data: [[0, 0, 0.7]],
            xAxisIndex: lindex,
            yAxisIndex: lindex,
            label: {
              fontSize: 14,
              show: true,
            }

          })

        lindex++
      }
    }
    return lindex
  }

  var option = {
    visualMap: [
      {
        type: 'continuous',
        min: -1,
        max: 1,
        orient: 'horizontal',
        left: 'center',
        top: '1%',
        precision: 1,
        inRange: {
          color: ['#f0ccbe', '#f4d2f1', '#d7d7d7', '#cfd5c1', '#d8e3ec'],
        },
        outOfRange: {
          color: ['#d7d7d7']
        }
      }
    ],
    grid: [],
    xAxis: [],
    yAxis: [],
    graphic: [],
    series: []
  }

  var index = addVariable(option)

  var lindex = generateGrids(option, index)

  addData(option, lindex)

  return option
}

export {createOption}
