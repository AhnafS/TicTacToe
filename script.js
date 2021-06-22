const player = function(name, marker){
    return {name, marker};
};

(function(){
    const board = {
        board: ['','','','','','','','',''],
        init: function(){ 
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        bindEvents : function(){
            this.boardContainer.addEventListener('click', this.addX);
        },
        render: function(){
            // this.createBoard();
            this.updateContainer();
        },
        cacheDom: function(){
            this.boardContainer = document.querySelector('#boardContainer')
            this.boardDivs = document.querySelectorAll('.playerMove');
        },
        updateContainer: function() {
            this.board.forEach((spot, i) => {
                let div = document.createElement('div');
                div.classList.add('playerMove');
                div.setAttribute('data-index', i)
                let span = document.createElement('span');
                span.textContent = spot;
                div.appendChild(span);
                this.boardContainer.appendChild(div);
            })
        },
        addX: function(e){
            let tempBoard = this.board;
            let index = e.target.getAttribute('data-index');
            index = parseInt(index);
            console.log(typeof(index));
            if(tempBoard[index] == ''){
                console.log('it works');
            }
        },
        makeMove: function(e){
            console.log(e);
            addX(e);
        },
    }

    board.init();
})();
