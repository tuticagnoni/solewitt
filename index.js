    import { select, range, symbols, symbol } from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
  
    //cuanto mide el width y height de la pantalla
    const width = window.innerWidth
    const height = window.innerHeight

    //set svg element
    const svg = select('body')
    .append('svg')
    .attr("width", width)
    .attr("height", height)

    const n = 100

    //referring to the object and invoque the object
    //horizontal rectangles
svg
    .append('g')
    .selectAll('rect')
    .data(range(n))
    .join('rect')
        .attr('y', (d) => d * 20) //d toma el lugar de i 
        .attr('width', width)
        .attr('height', 10)
        .attr('class', 'horizontal')
        .attr('mask', 'url(#mask-1)') 

        //vertical rectangles
svg
    .append('g')
    .selectAll('rect')
    .data(range(n))
    .join('rect')
        .attr('x', (d) => d * 20) //d toma el lugar de i 
        .attr('width', 10)
        .attr('height', height)
        .attr('class', 'vertical')
        .attr('mask', 'url(#mask-2)') 

    
const renderMask = (selection, id, inverted) => {
        //MASK 1
        const mask = svg.append('mask').attr('id', id)
        
        mask
            .append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', inverted ? 'black' : 'white') //operador ternario. Si inversido es true, deberia ser blanco, sino deberia ser negro

        // const g = mask
        //     .append('g') 
        //     .attr('transform', `translate(${width / 2} , ${height / 2})`)
            
        mask
        .selectAll('g')
        .data(range(symbols.length))
        .join((enter) => 
            enter
                .append('g')
                .attr(
                    'transform', 
                    d => `translate(${d * 150 + 150} , ${height / 2})`
                )
                .append('path')
                .attr('d', (d) => symbol(symbols[d], 8000)()) //d refiere a data (linea 57)
                .attr('fill', inverted ? 'white' : 'black')
        )
            // .append('path')
            // .attr('d', symbol(symbols[1], 100000)())
            // .attr('fill', inverted ? 'white' : 'black')
};

//insted of calling the functions in the usual way:
// renderMask(svg, 'mask-1', false)
// renderMask(svg, 'mask-2', true)

//d3 let u do this- selection.call - it can be chained
svg
.call(renderMask, 'mask-1', false)
.call(renderMask, 'mask-2', true)

    //MASK 2
    // const mask2 = svg.append('mask').attr('id', 'mask-2')

    // mask2.append('rect')
    // .attr('width', width)
    // .attr('height', height)
    // .attr('fill', 'white')

    // mask2.  append('g') 
    // .attr('transform', `translate(${width / 2} , ${height / 2})`)
    // .append('path')
    // .attr('d', symbol(symbols[1], 100000)())
    // .attr('fill', 'black') 

