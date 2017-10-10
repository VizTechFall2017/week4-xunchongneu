
document.bgColor="#3c3c3c"

var svg = d3.select('svg')
    .append('g')
    .attr('transform','translate(100,50)');


var allData;
var scaleX = d3.scaleLinear().domain ([2000,2017]). range ([0,700]);
var scaleY = d3.scaleLinear().domain ([250,350]). range ([0,400]);

var currentYear = '2016'

d3.csv('./data.csv', function(dataIn) {

    allData = dataIn;

    data2016 = dataIn.filter(function(d){
        return d.year == 2016;
    })

    svg.selectAll('circle')
        .data(data2016)
        .enter()
        .append('circle')
        .attr('class','myCircles');



    svg .append('g')
        .attr('transform','translate(0,400)')
        .attr("class", "axisRed")
        .attr('stroke-width', 3)
        .call(d3.axisBottom(scaleX));


    svg .append('g')
        .attr("class", "axisRed")
        .attr('stroke-width', 3)
        .call(d3.axisLeft(scaleY));
    updateData(data2016);


    svg.append('text')
        .attr('x',280)
        .attr('y',450)
        .attr('font-size',24)
        .text('Years')
        .attr('fill','white')
       ;

    svg.append('text')
        .attr('x',-200)
        .attr('y',-50)
        .attr('font-size',24)
        .text('Prices')
        .attr('transform','rotate(270)')
        .attr('fill','white');


});


function updateData (dataPoints){
    console.log(dataPoints);
    svg.selectAll('.myCircles')
        .data(dataPoints)
        .attr('cx',function(d) {
            return d.x;
        })
        .attr('cy',function(d) {
            return d.y;
        })

        .attr('r',function(d) {
            return d.r;
        })
        .attr('fill',"grey")
        .attr('stroke-width', 2)
        .attr('stroke', 'yellowgreen')
        .attr('fill-opacity',2)
        .attr('stroke-opacity',10)

}


function buttonClicked(){

    if (currentYear == "2016"){
        data2017 = allData.filter(function(d){
            return d.year == 2017;
        });

        console.log(data2017);

        currentYear = 2017;
        updateData(data2017);
    }
    else{

        data2016 = allData.filter(function(d){
            return d.year == 2016;
        });

        console.log(data2016);

        updateData(data2016);
        currentYear = '2016'
    }

}

//auto update the data( moving data)

window.setInterval(function() {
    buttonClicked();
},1300)
