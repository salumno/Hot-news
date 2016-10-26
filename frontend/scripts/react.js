
var HotNewsBox = React.createClass({
    loadNewsFromServer: function () {
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
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: hotNews,
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
            <div className="body">
                <div className="header">
                    <h1 className="title">Hot News</h1>
                    <div className="headerP">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <HotNewsForm onNewsSubmit={this.handleNewsSubmit}/>
                </div>
                <HotNewsList data={this.state.data}/>
                <div id="footer">
                    <p>&copy;2016, HotNews, Inc. Все права защищены.</p>
                </div>
            </div>
        );
    }
});

var HotNewsList = React.createClass({
    render: function () {
        var newsNode = this.props.data.map(function (hotNews) {
            return (
                <HotNews title={hotNews.title} author={hotNews.author} date={hotNews.date} key={hotNews.id}>
                    {hotNews.text}
                </HotNews>
            );
        });

        return (
            <div className="hotNewsList">
                {newsNode}
            </div>
        );
    }
});

var HotNewsForm = React.createClass({
    getInitialState: function () {
        return {title: '', author: '', text: ''};
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value});
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        var title = this.state.title.trim();
        if (!text || !author || !title) {
            return;
        }
        this.props.onNewsSubmit({title: title, author: author, text: text});
        this.setState({title: '', author: '', text: ''});
    },

    render: function () {
        return (
            <div className="form">
                <form className="hotNewsForm" onSubmit={this.handleSubmit}>
                    <p><i>Please, add your news!</i></p>
                    <fieldset>
                        <legend>Hot Title</legend>
                        <input
                            type="text"
                            placeholder="Your hot title is?"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Hot News</legend>
                            <input className="inputSize"
                                type="text"
                                placeholder="There is the hottest news today?"
                                value={this.state.text}
                                onChange={this.handleTextChange}
                            />
                    </fieldset>
                    <fieldset>
                        <legend>The best author</legend>
                        <input
                            type="text"
                            placeholder="What is your name?"
                            value={this.state.author}
                            onChange={this.handleAuthorChange}
                        />
                    </fieldset>
                    <p><input type="submit" value="Send" /></p>
                </form>
            </div>
        );
    }
});


var HotNews = React.createClass({
    render: function () {
        return (
            <div className="hotNews">
                <div className="newsTitle">
                    <h3>{this.props.title}</h3>
                </div>
                <div className="newsText">
                    <p>{this.props.children}</p>
                </div>
                <div className="newsAuthor">
                    <p>{this.props.author}</p>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <HotNewsBox url="/api" pollInterval={10000} />,
    document.getElementById('content')
);