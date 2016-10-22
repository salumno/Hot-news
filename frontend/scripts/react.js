
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
            <div className="hotNewsBox">
                Hello, world! Im HotNewsBox!
                <h1>HotNews</h1>
                <HotNewsList data={this.state.data}/>
                <HotNewsForm onNewsSubmit={this.handleNewsSubmit}/>
            </div>
        );
    }
});

var HotNewsList = React.createClass({
    render: function () {
        var newsNode = this.props.data.map(function (hotNews) {
            return (
                <HotNews author={hotNews.author} num={hotNews.id} key={hotNews.id}>
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
        if (!text || !author) {
            return;
        }
        this.props.onNewsSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },

    render: function () {
        return (
            <form className="hotNewsForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name?"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
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


var HotNews = React.createClass({
    render: function () {
        return (
            <div className="hotNews">
                <h2 className="newsAuthor">
                    <font color="FF0000">{this.props.author}</font>
                </h2>
                <h3>
                    <font color="00FF00">{this.props.num}</font>
                </h3>
                {this.props.children}
            </div>
        );
    }
});

ReactDOM.render(
    <HotNewsBox url="/api" pollInterval={10000} />,
    document.getElementById('content')
);