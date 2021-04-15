function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let dummyData = (min, max, count) => {
	let data = []
	let _count = count ? count : 10
	
	for(let x = 0; x < _count; x++) {
		data.push([new Date().getTime() - ((_count - x)*1000), getRandomNumber(min, max)])
	}
	
	return data;
}
Vue.use(VueHighcharts);

var options = {
	credits: false,
	chart: {
		style: {
			fontFamily: "Roboto",
			fontSize: '0.8em'
		},
		
		backgroundColor: '#fa0000'
	},
  title: {
    text: ''
  },
  xAxis: {
		type: 'datetime',
		tickPixelInterval: 5000
	},
  yAxis: {
		labels: {
			style: {
				fontSize: '1.2em'
			}
		},
    title: {
      text: 'Temperature (°C 🔥)'
    },
    plotLines: [{
      value: 0,
      width: 1,
      color: '#fa0000'
    }]
  },
  tooltip: {
    valueSuffix: '°C 🔥',
		enabled: false
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    borderWidth: 0,
		labelFormatter() {
			return this.name.toUpperCase().split('_').join(' ').split('TEMP').join(' ')
		},
		itemStyle: {
			color: '#fa0000'
		}
  },
	plotOptions: {
    series: {
        enableMouseTracking: false
    }
	},
  series: [{
    name: 'room_temp',
    data: dummyData(31, 33)
  }, {
    name: 'case_temp',
    data: dummyData(45, 49)
  }, {
    name: 'radiator_temp',
    data: dummyData(49, 54)
  }, {
    name: 'gpu_1_temp',
    data: dummyData(65, 68)
  }, {
    name: 'gpu_2_temp',
    data: dummyData(65, 69)
  }]
};

new Vue({
	el: '#dashboard',
	template: `
	<div>
		<h2>{{name}}</h2>
		<div class="readings">
			<div class="reading">
				<div>
					<label>Ram 🔥</label>
					<span>{{room_temp}}</span>
				</div>
				<div id="room_chart" class="hide">
				</div>
			</div>
			<div class="reading">
				<div>
					<label>Tüm Sistem 🪔</label>
					<span>{{case_temp}}</span>
				</div>
				<div id="case_chart" class="hide">
				</div>
			</div>
			
			<div class="reading">
				<div>
					<label>İşlemci  🧨</label>
					<span>{{gpu_1_temp}}</span>
				</div>
				<div id="gpu_1_chart" class="hide">
				</div>
			</div>
			<div class="reading">
				<div>
					<label>Ekran Kartı 🔥</label>
					<span>{{gpu_2_temp}}</span>
				</div>
				<div id="gpu_2_chart" class="hide">
				</div>
			</div>
		</div>
		<div id="chart">
			<highcharts :options="options" ref="highcharts"></highcharts>
		</div>
	</div>
	`,
	data: {
		options: options,
		case_temp: '45',
		name: 'Sistem Özellikleri 🖥️',
		gpu_1_temp: '65',
		gpu_2_temp: '67',
		radiator_temp: '55',
		room_temp: '33🧊'
	},
	computed: {
	},
	created() {
		setInterval(() => {
			this.$data.room_temp = getRandomNumber(31, 34)
			this.$data.case_temp = getRandomNumber(45, 49)
			this.$data.radiator_temp = getRandomNumber(49, 55)
			this.$data.gpu_1_temp = getRandomNumber(65, 68)
			this.$data.gpu_2_temp = getRandomNumber(65, 68)
			let series = this.$refs.highcharts.chart.series
			let ticks = new Date().getTime()
			series[0].addPoint([ticks, this.$data.room_temp], false, true)
			series[1].addPoint([ticks, this.$data.case_temp], false, true)
			series[2].addPoint([ticks, this.$data.radiator_temp], false, true)
			series[3].addPoint([ticks, this.$data.gpu_1_temp], false, true)
			series[4].addPoint([ticks, this.$data.gpu_2_temp], true, true)
			
		}, 1000)
	}
});