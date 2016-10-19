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

    loadNewsFromServer: function () { // Первое получение обновлений* и дальнейшее из получение и обработка раз в 2 секунды
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function () {
        return {data: []};  // Установка-закрепление изначального состояния data
    },

    componentDidMount: function () {
        this.loadNewsFromServer();
        setInterval(this.loadNewsFromServer, this.props.pollInterval); // Установка временного интервала между запросами
    },

    render: function () {
        return (
            <div className="hotNewsBox">
                Hello, world! Imma HotNewsBox!
                <h1>HotNews</h1>  /*Оболочка познакомилась со своими компонентами*/
                <HotNewsList data={this.state.data}/> /*Берем текущее состояние data/
                <HotNewsForm /> /**/
            </div>
        );
    }

});

var HotNewsList = React.createClass({

    render: function () { /*Массив получаем с помощью this.props.data*/

        var newsNode = this.props.data.map(function (hotNews) { /*Получаем новый массив, состоящий из React элементов*/
            return (
                <HotNews author={hotNews.author} key={hotNews.id}> /*??? TODO*/
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
                    {this.props.author} /*Возьмет то, что мы передадим ему в автора? Родитель HotNewsList даст*/
                </h2>
                {this.props.children} /*Возьмет то, что будет во вложенной фигне*/
            </div>
        );
    }

});

ReactDOM.render( // Всегда внизу, запускаем только когда все компоненты определены.
    <HotNewsBox url="/api/news" pollInterval={2000} />, // А вот и те данные (массив data, заданный на самом верху) которые пойдут в this.props.data в HotNewsList через HotNewsBox
    document.getElementsById('content')
);