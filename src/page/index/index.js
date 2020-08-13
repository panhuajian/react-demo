import React from 'react';
// import {Card} from 'antd';
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import nanjingGeoJson from '../../assets/nanjing.json';

export default class App extends React.Component{

  getMapOption =()=> {
    echarts.registerMap('nanjing', nanjingGeoJson);
    var geoCoordMap = {
      '鼓楼区': [118.77, 32.07],
      '玄武区': [118.80, 32.05],
      '秦淮区': [118.80, 32.02],
      '江宁区': [118.85, 31.95],
      '栖霞区': [118.88, 32.12],
      '雨花台区': [118.77, 32.00],
      '浦口区': [118.62, 32.05],
      '高淳区': [118.88, 31.33],
      '六合区': [118.83, 32.35],
      '溧水区': [119.02, 31.65],
      '建邺区': [118.75, 32.03],
    }

    var data = [{
        name: '鼓楼区',
        value: 149
    }, {
        name: '玄武区',
        value: 107
    }, {
        name: '秦淮区',
        value: 85
    }, {
        name: '江宁区',
        value: 63
    }, {
        name: '栖霞区',
        value: 36
    }, {
        name: '雨花台区',
        value: 32
    },
    {
        name: '浦口区',
        value: 34
    },
    {
        name: '高淳区',
        value: 30
    },
    {
        name: '六合区',
        value: 19
    },
    {
        name: '溧水区',
        value: 16
    },
    {
        name: '建邺区',
        value: 9
    }];

    var max = 200, min = 9; // todo 
    var maxSize4Pin = 0, minSize4Pin = 20;

    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
              res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
              });
          }
      }
      return res;
    };


    const option = {
        backgroundColor: '#020933',
        title: {
            top:20,
            text: '南京市各区文物保护单位分布',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#ccc'
            }
        },    

        tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if(typeof(params.value)[2] == "undefined"){
                return params.name + ' : ' + params.value;
              }else{
                return params.name + ' : ' + params.value[2];
              }
            }
        },
    /*   legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data:['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },*/
            legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['pm2.5'],
        textStyle: {
            color: '#fff'
        }
    }, 
        visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
                // color: ['#3B5077', '#031525'] // 蓝黑
                // color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                //color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                //color: ['#23074d', '#cc5333'] // 紫红
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#1488CC', '#2B32B2'] // 浅蓝
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿

            }
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //             dataView: {readOnly: false},
        //             restore: {},
        //             saveAsImage: {}
        //             }
        // },
        geo: {
            show: true,
            map: 'nanjing',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#3fdaff',
                    borderWidth: 2,
                    shadowColor: 'rgba(63, 218, 255, 0.5)',
                    shadowBlur: 50
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series : [
      {
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#F4E925'
                }
            }
        },
        {
            type: 'map',
            map: 'nanjing',
            geoIndex: 0,
            aspectScale: 0.5, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#FFFFFF',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },
        
    ]};
    return option
  }

  // state = {
  //   valueData: [1000,2000,1500,3000,2000,1200,800],
  //   xData: ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天'],
  // }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     valueData: [...this.state.valueData, 2000],
    //     xData: [...this.state.xData, `第${this.state.xData.length}天`],
    //   })
    // }, 1000)
    // const main: HTMLDivElement  = document.querySelector('#main') as HTMLDivElement;
    // var myChart = echarts.init(main);
    // // 绘制图表
    // const option = {
    //   xAxis: { 
    //     type: 'category' as 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value' as 'value'
    //   },
    //   series: [{
    //     data: [820, 932, 901, 934, 1290, 1330, 1320],
    //     type: 'line' as 'line',
    //   }]
    // };
    // myChart.setOption(option);
  }  

  // getOption =()=> {
  //   const option = {
  //     xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //     },
  //     yAxis: {
  //         type: 'value'
  //     },
  //     series: [{
  //         data: [820, 932, 901, 934, 1290, 1330, 1320],
  //         type: 'line'
  //     }]
  // };
  
  //  return option
  // }

  // getOption2 =()=> {
  //   let option = {
  //       title:{
  //         text:'用户骑行订单'
  //       },
  //       legend:{
  //         data:['OFO','摩拜','小蓝']
  //       },
  //       tooltip:{   //展示数据
  //         trigger:'axis'
  //       },
  //       xAxis:{
  //         data:['周一','周二','周三','周四','周五','周六','周日']
  //       },
  //       yAxis:{
  //         type:'value'
  //       },
  //       series:[
  //         {
  //           name:'OFO',
  //           type:'bar',
  //           data:[2000,3000,5500,7000,8000,12000,20000]
  //         },{
  //           name:'摩拜',
  //           type:'bar',
  //           data:[1500,3000,4500,6000,8000,10000,15000]
  //         },{
  //           name:'小蓝',
  //           type:'bar',
  //           data:[1000,2000,2500,4000,6000,7000,8000]
  //         }
  //       ]
  //   }
  //   return option;
  // }

  // getOption3 =()=> {
  //   let option = {
  //     title:{
  //       text:'用户骑行订单',
  //       x:'center'
  //     },
  //     legend:{
  //       orient:'vertical',
  //       right:10,
  //       top:20,
  //       bottom:20,
  //       data:['周一','周二','周三','周四','周五','周六','周日']
  //     },
  //     tooltip:{
  //       trigger:'item',
  //       formatter:'{a}<br/>{b}:{c}({d}%)' //自定义展示的tootip
  //     },
  //     series:[
  //       //饼图中的series没有x,y轴，所以通过series中必须有value和name
  //       {
  //         name:'订单量',
  //         type:'pie',
  //         radius:['50%','80%'], //控制内环、外环
  //         data:[
  //         { 
  //           value:1000,
  //           name:'周一'
  //         },{ 
  //           value:2000,
  //           name:'周二'
  //         },{ 
  //           value:1000,
  //           name:'周三'
  //         },{ 
  //           value:1000,
  //           name:'周四'
  //         },{ 
  //           value:1000,
  //           name:'周5五'
  //         },{ 
  //           value:1000,
  //           name:'周六'
  //         },{ 
  //           value:1000,
  //           name:'周日'
  //         },
  //         ]
  //       }
  //     ]
  //   }
  //  return option
  // }

  render(){
    // const {valueData, xData} = this.state;
    return(
      <div>
        <div title="折线图表之一999">
            <ReactEcharts option={this.getMapOption()} theme="Imooc"  style={{height:'800px'}}/>
        </div>
        {/* <div title="折线图表之一">
            <ReactEcharts option={this.getOption()} theme="Imooc"  style={{height:'400px'}}/>
        </div> */}
        {/* <div id="main" style={{height: 600, width: 800}}></div> */}
        {/* <div title="柱形图表之一">
            <ReactEcharts option={this.getOption2()} theme="Imooc"  style={{height:'500px'}}/>
        </div> */}
        {/* <div title="饼形图表之三" style={{marginTop:"10px"}}>
            <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:'400px'}}/>
        </div> */}
      </div>
    )
  }
}