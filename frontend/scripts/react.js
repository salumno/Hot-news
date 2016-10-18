/*
 *
 *
 *
 */

var data = [
    {id: 1, author: "Pete Hunt", text: "This is one news"},
    {id: 2, author: "Michael Jordan", text: "This is another news"} /*чуть чуть JSON*/
];

var HotNewsBox = React.createClass({ // Создаем лишь часть большой структуры. React знает, как ей управлять.
    render: function () {
        return (
            <div className="hotNewsBox">
                Hello, world! Imma HotNewsBox!
                <h1>HotNews</h1>  /*Оболочка познакомилась со своими компонентами*/
                <HotNewsList data={this.props.data}/> /*Положили в список наши данные?*/
                <HotNewsForm /> /*в ячейку HotNewsList'a data положили значение data-массива*/
            </div>
        );
    }
});

var HotNewsList = React.createClass({
    render: function () { /*Массив получаем с помощью this.props.data*/
        var newsNode = this.props.data.map(function (hotNews) { /*Получаем новый массив, состоящий из React элементов*/
            return (
                <HotNews author={hotNews.author} key={hotNews.id}> /*???*/
                    {hotNews.text}
                 </HotNews>
            );
        });

        return (
            <div className="hotNewsList">
                Hello! I'm HotNewsList!
                {newsNode}
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
    <HotNewsBox data={data} />, // Рендерим оболочку всей нашей структуры.
    document.getElementsById('content')
);