import React, { PureComponent } from 'react'
import * as d3 from "d3";

export default class Chart extends PureComponent {

  state = {
    data: [],
    datesFormated: false,
    radius: '',
    padding: '',
    numberOfTicksRemover: 1,
  }
  
  // Creates DOM ref
  svgRef = React.createRef(); 

  // Dimensions
  margin = {top: 20, right: 20, bottom: 20, left: 20};
  width = this.props.width - this.margin.left - this.margin.right;
  height = this.props.height - this.margin.top - this.margin.bottom;

  // If any of the conditions' data changes, readraw chart
  componentDidUpdate(prevProps) {
    if ((this.props.formatedDates !== prevProps.formatedDates) ||
        (this.props.displayOption !== prevProps.displayOption) ||
        (this.props.gradient !== prevProps.gradient)) {
          this.updtateSVG();
          this.updateChartParam();
          this.updtateSVG();
    }
  }

  // Draws chart on component did mount
  componentDidMount() {
    
    this.updateChartParam();

    if (this.props.formatedDates !== []) {

      const dateToState = new Promise((resolve) => {
        this.setState({data: this.props.formatedDates})
        resolve("done")
      });
  
      dateToState.then((value) => {
        this.setState({datesFormated: true});
        this.initSVG(this.props.formatedDates);
      });
    }
  }
  
  initSVG(data) {
    d3.format(".4r");

    // Defines Axis
    let x = d3.scaleBand()
      .range([0, this.width])
      .padding(this.state.padding)
      .domain(data.map(d => d.day));

    let y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(data, d => d.numberOfCount)]);

    // Creates SVG
    this.svg = d3.select(this.svgRef.current).append("svg")
      .attr("id", "svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  
    // Creates X axis in SVG
    this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x).tickSize(0).tickFormat((interval,i) => {
          return i%this.state.numberOfTicksRemover !== 0 ? " ": interval;
         }))
        .attr("class", "stats__xAxis")
        .selectAll("text")	
          .style("text-anchor", "end")
          .attr("dx", "-.6em")
          .attr("dy", ".3em")
          .attr("transform", "rotate(-65)");
    
    // Creates Y axis in SVG
    this.svg.append("g")
        .attr("class", "stats__yAxis")
        .call(d3.axisLeft(y).ticks(Math.max(0, 4)).tickFormat(d3.format("d"))); // ...data.map(d => d.numberOfCount), 5
      
    // Creates gradient ref
    let defs = this.svg.append("defs")

    var gradient = defs.append("linearGradient")
        .attr("id", "customGradient")
        .attr("gradientTransform", "rotate(65)")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
    
    gradient.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", this.props.gradients[this.props.gradient].color1)
        .attr("stop-opacity", 1);
    
    gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", this.props.gradients[this.props.gradient].color2)
        .attr("stop-opacity", 1);

    // Ajout des bars en utilisant les données de notre fichier data.tsv
    // La largeur de la barre est déterminée par la fonction x | La hauteur par la fonction y en tenant compte de la numberOfCount | La gestion des events de la souris pour le popup
    this.svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("ry", this.state.radius)
        .attr("fill", "url(#customGradient)")
        .attr("x", d => x(d.day))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.numberOfCount))
        .attr("height", d => this.height - y(d.numberOfCount))					
  }


  // Redraw chart
  updtateSVG() {
    d3.select(this.svgRef.current).selectAll('*').remove().exit();
    this.initSVG(this.props.formatedDates);
  }

  // Filter options, changes number of charts, date format
  updateChartParam = () => {
    if (this.props.displayOption === 'week') {
      this.setState({radius : '6'})
      this.setState({padding : '0.5'})
      this.setState({numberOfTicksRemover : 1})
    } else if (this.props.displayOption === 'month') {
      this.setState({radius : '2'})
      this.setState({padding : '0.3'})
      this.setState({numberOfTicksRemover : 2})
    }    
  }  
  
  render() {
    return (
      <div ref={this.svgRef}></div>
    )
  }

}