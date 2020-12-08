import moment from 'miment';

export const xAsixData = ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50",
"1:00", "1:10", "1:20", "1:30", "1:40", "1:50",
"2:00", "2:10", "2:20", "2:30", "2:40", "2:50",
"3:00", "3:10", "3:20", "3:30", "3:40", "3:50",
"4:00", "4:10", "4:20", "4:30", "4:40", "4:50",
"5:00", "5:10", "5:20", "5:30", "5:40", "5:50",
"6:00", "6:10", "6:20", "6:30", "6:40", "6:50",
"7:00", "7:10", "7:20", "7:30", "7:40", "7:50",
"8:00", "8:10", "8:20", "8:30", "8:40", "8:50",
"9:00", "9:10", "9:20", "9:30", "9:40", "9:50",
"10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
"11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
"12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
"13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
"14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
"15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
"16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
"17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
"18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
"19:00", "19:10", "19:20", "19:30", "19:40", "19:50",
"20:00", "20:10", "20:20", "20:30", "20:40", "20:50",
"21:00", "21:10", "21:20", "21:30", "21:40", "21:50",
"22:00", "22:10", "22:20", "22:30", "22:40", "22:50",
"23:00", "23:10", "23:20", "23:30", "23:40", "23:50","00:00"
];

let test = [0, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,80,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
let test2 = [50,{
  value:100,
  symbol: 'star',  // 数据级个性化拐点图形
  symbolSize : 15,
  itemStyle : { normal: {label : {
      show: true,
      textStyle : {
          fontSize : '20',
          fontFamily : '微软雅黑',
          fontWeight : 'bold'
      }
  }}}
},,null,null,null,null,null,100,0,null]

export const getOptions = (data,selected,onHandleChange) => {
    return {
        title: {
          show: false
          // text: '测试下面legend的红色区域不应被裁剪',
          // left: 'center'
        },
        color: ["#1890ff"],
        legend: {
          show: false
        },
        grid: {
          // show: true,
          containLabel: true,
          top: 10,
          left: 2,
          right: 25,
          bottom: 60,
          // borderColor: '#ff0000'
        },
        xAxis: [{
          type: "category",
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          },
          axisPointer: {
            value: xAsixData[selected],
            snap: true,
            lineStyle: {
                color: '#f79e44',
                width: 2
            },
            label: {
                show: true,
                backgroundColor: '#7581BD',
                formatter: function (params) {
                    onHandleChange(params.value);
                    return params.value;
                },
            },
            handle: {
                show: true,
                color: '#f79e44'
            },

        },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#f79e44",
            }
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            color: "#f79e44",
            showMaxLabel: true,
            interval: 23
          },
          data: xAsixData,
        },{
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#f79e44",
            }
          },
          axisTick: {
            show: true,
            inside:true
          },
          axisLabel: {
            color: "#f79e44",
            showMaxLabel: true,
            interval: 23
          },
          data: xAsixData,
        }
      ],
        yAxis: {
          x: "center",
          type: "value",
          max:110,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#f79e44"
          },
          splitLine: {
            lineStyle: {
              color: "#C2C0C0",
              type: "dashed"
            }
          }
          // show: false
        },
        series: [{
            name: "l1",
            type: "line",
            smooth: true,
            data: data.l1,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#6b4e8a"
                  }
              }
          },
          },{
            name: "l2",
            type: "line",
            smooth: true,
            data: data.l2,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#8662ac"
                  }
              }
          },
          },{
            name: "l3",
            type: "line",
            smooth: true,
            data: data.l3,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#2277a2"
                  }
              }
          },
          },{
            name: "l4",
            type: "line",
            smooth: true,
            data: data.l4,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#4d91b4"
                  }
              }
          },
          },{
            name: "l5",
            type: "line",
            smooth: true,
            data: data.l5,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#1b5f82"
                  }
              }
          },
          },{
            name: "l6",
            type: "line",
            smooth: true,
            data: data.l6,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#4f805d"
                  }
              }
          },
          },{
            name: "l7",
            type: "line",
            smooth: true,
            data: data.l7,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#b34a4a"
                  }
              }
          },
          },{
            name: "l8",
            type: "line",
            smooth: true,
            data: data.l8,
            connectNulls:true,
            itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#7e8790"
                  }
              }
          },
          }],
    
        
      };
}

export const getCurrentIndex = () => {
    let currenthour:number = moment().format("hh");
    let currentmin:number = moment().format("mm");
    if(currentmin <= 10) currentmin = 10;
    if(currentmin >10 && currentmin <=20 ) currentmin = 20;
    if(currentmin > 20 && currentmin <= 30) currentmin = 30;
    if(currentmin > 30 && currentmin <= 40) currentmin = 40;
    if(currentmin > 40 && currentmin <= 50) currentmin = 50;
    if(currentmin > 50 && currentmin <= 59) {
        currentmin = 10;
        currenthour += 1;
    }
    let result:string = `${parseInt(currenthour)}:${currentmin}`;
    return result;
}