/*
 * Я знаю только то, что ничего не знаю, но другие не знают и этого/
 */

var HotNews = React.createClass({
    render: function () {
        return (
            <div className="hotNews">
                <h2 className="newsAuthor">
                    {this.props.author} /*Возьмет то, что мы передадим ему в автора? Родитель HotNewsList даст*/
                </h2>
                {this.props.children} /*Возьмет то, что будет во вложенной части*/
            </div>
        );
    }
});

var HotNewsBox = React.createClass({
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
    handleNewsSubmit: function (hotNews) {
        var news = this.state.data;
        hotNews.id = Date.now();
        var newNews = news.concat([hotNews]);
        this.setState({data: newNews});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: hotNews,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: news});
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
                <HotNewsList data={this.state.data}/> /*Берем текущее состояние data*/
                <HotNewsForm onNewsSubmit={this.handleNewsSubmit()}/>
            </div>
        );
    }
});

var HotNewsList = React.createClass({
    render: function () { /*Массив получаем с помощью this.props.data*/
        var newsNode = this.props.data.map(function (hotNews) { /*Получаем новый массив, состоящий из React элементов*/
            return (
                <HotNews author={hotNews.author} key={hotNews.id}>
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
    getInitialState: function () {
      return {author: '', text: ''};
    },
    handleAuthorChange: function (e) { /*Ловим изменения автора*/
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) { /*Ловим изменение текста*/
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault(); /*Говорим браузеру, что делать, мы. Метод останавливает стандартные действия браузера*/
        var author = this.state.author.trim(); /*Убираем незначащие пробелы*/
        var text = this.state.text.trim();
        if (!text || !author) { /*Если какая-то из строчек пустая, форма некорректная - выходим*/
            return;
        }
        this.props.onNewsSubmit({author: author, text: text});
        this.setState({author: '', text: ''}); /*Очистили значения форм после отправки на сервер*/
    },
    render: function () {
        return (
            <form className="hotNewsForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name?"
                    value={this.state.author} /*Учитываем изменения*/
                    onChange={this.handleAuthorChange} /*Учитываем изменения*/
                />
                <input
                    type="text"
                    placeholder="What is the hottest news today?"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="POST" />
            </form>
        );
    }

});

ReactDOM.render( // Всегда внизу, запускаем только когда все компоненты определены.
    <HotNewsBox url="/api/hotNews" pollInterval={2000} />, // А вот и те данные (массив data, заданный на самом верху) которые пойдут в this.props.data в HotNewsList через HotNewsBox
    document.getElementById('content')
);