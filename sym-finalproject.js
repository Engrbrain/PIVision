(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		// Declare the name of my symbol as the typename 
		typeName: "finalproject",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: "Table",
				Height: 150,
				Width: 150 
			} 
		}
	}

	function getConfig(){
		return {
			//Provide the Create Chat code from AMChart
			"type": "serial",
			// Rename Category Field 
	"categoryField": "attribute",
	"startDuration": 1,
	"categoryAxis": {
		"gridPosition": "start"
	},
	"trendLines": [],
	// Since i am only trending one dataset, I will comment out graph 2
	"graphs": [
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 0.7,
			"id": "AmGraph-1",
			"lineAlpha": 0,
			"title": /**scope.Label + **/" Trend",
			// Rename ValueField
			"valueField": "value"
		},
		/**{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"fillAlphas": 0.7,
			"id": "AmGraph-2",
			"lineAlpha": 0,
			"title": "graph 2",
			"valueField": "column-2"
		} **/
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"title": "Attribute Values"
		}
	],
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": true
	},
	"titles": [
		{
			"id": "Title-1",
			"size": 15,
			"text": /**scope.Label + **/"Trend Analysis"
		}
	],
	"dataProvider": [
		{
			"attribute": "attribute 1",
			"value": 8
			//maintain one attribute trend by commenting second attribute
			//"column-2": 5
		},
		{
			"attribute": "attribute 2",
			"value": 6
			//"column-2": 7
		}
			]
		}
	}
	
	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		//Assign the HTML div id to a variable
		var myContainerDiv = elem.find("#container")[0];
		//Generate a container ID to allow us use multiple of this symbol
		myContainerDiv.id = "attTrend_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(myContainerDiv.id, getConfig());
		
		//Map PI data
		function convertoChart(data){
			
			return data.Rows.map(function(item){
				return {
					value: item.Value,
					attribute: item.Label
				}
			});

		}

		this.onDataUpdate = dataUpdate;
		function dataUpdate(){
			//Check for sporadic update
			if(data.Label){
				scope.Label = data.Label;
				scope.Units = data.Units;
			}
			var dataProvider = convertoChart(data);
			chart.dataProvider = dataProvider;
			chart.validateData();
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
