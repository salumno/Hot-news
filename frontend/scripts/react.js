/*
 *
 *
 *
 */


var HotNewsBox = React.createClass({ // Создаем лишь часть большой структуры. React знает, как ей управлять.
    render: function () {
        return (
            <div className="hotNewsBox">
                Hello, world! Imma HotNewsBox!
                <h1>HotNews</h1>  /*Оболочка познакомилась со своими компонентами*/
                <HotNewsList />
                <HotNewsForm />
            </div>
        );
    }
});

var HotNewsList = React.createClass({
    render: function () {
        return (
            <div className="hotNewsList">
                Hello! I'm HotNewsList!
                <HotNews author="Vasya">This is one comment</HotNews> /*Добавлены 2 новости. Компонент HotNews получает к ним доступ через this.props*/
                <HotNews author="Sasha">This is another comment</HotNews> /*this.props.author - к автору. this.props.children - к вложенному тексту*/
            </div>
        );
    }
});

var HotNewsForm = React.createClass({
    render: function () {
        return (
            <div className="hotNewsForm">
                Hello! I'm HotNewsForm!
            </div>
        );
    }
});
// Создали "внутренности/скелет" нашего бокса.

var HotNews = React.createClass({
    render: function () {
        return (
            <div className="hotNews">
                <h2 className="newsAuthor">
                    {this.props.author} /*Доступ к автору*/
                </h2>
                {this.props.children} /*Доступ к вложенным элементам*/
            </div>
        );
    }
});

ReactDOM.render( // Всегда внизу, запускаем только когда все компоненты определены.
    <HotNewsBox />, // Рендерим оболочку всей нашей структуры
    document.getElementsById('content')
);