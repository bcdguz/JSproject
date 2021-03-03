const mousePointer = (ctx, e) => {
    const rect = ctx.getBoundingClientRect();

    //x y coord reference to the canvas size
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return {x, y}
}

export default mousePointer