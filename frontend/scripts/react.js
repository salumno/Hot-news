var HotNewsList = React.createClass({
    render: function () {
        return (
            <div className="HotNewsList">
                Hello! I'm HotNewsList!
            </div>
        );
    }
});

var HotNewsForm = React.createClass({
    render: function () {
        return (
            <div className="HotNewsForm">
                Hello! I'm HotNewsForm!
            </div>
        );
    }
});
// Создали "внутренности/скелет" нашего бокса.

var HotNewsBox = React.createClass({ // Создаем лишь часть большой структуры. React знает, как ей управлять.
    render: function () {
        return (
            <div className="HotNewsBox">
                Hello, world! Imma HotNewsBox!
                <h1>HotNews</h1>  /*Оболочка познакомилась со своими компонентами*/
                <HotNewsList />
                <HotNewsForm />
            </div>
        );
    }
});

ReactDOM.render( // Всегда внизу, запускаем только когда все компоненты определены.
    <HotNewsBox />, // Рендерим оболочку всей нашей структуры
    document.getElementsById('content')
);