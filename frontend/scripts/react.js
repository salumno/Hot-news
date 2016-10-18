
var HotNewsBox = React.createClass({ // Создаем лишь часть большой структуры. React знает, как ей управлять.
    render: function () {
        return (
            <div className="HotNewsBox">
                Hello, world! Imma HotNewsBox!
            </div>
        );
    }
});
//
ReactDOM.render( // Всегда внизу, запускаем только когда все компоненты определены.
    <HotNewsBox/>, // Рендерим оболочку всей нашей структуры
    document.getElementsById('content')
);