import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import styles from './App.css';
import $ from "jquery";

var title;
var author; 
var image;

const IsbnForm = React.createClass({
  getInitialState() {
    return {
      isbn: '',
      bookName: '',
      author: '',
      image: ''
    }
  },

  addBook (e) {
    e.stopPropagation()
    e.preventDefault()

    if (this.state.isbn !== '' && 
        this.state.bookName !== '' &&
        this.state.author !== '') {
      this.props.addBookData(this.state.isbn, this.state.bookName, this.state.author)
      this.setState({
        isbn: '',
        bookName: '',
        author: '',
        image: ''
      })
    }
  },

  // this is where your google api should happen
  handleISBNForm (e) {
    e.stopPropagation()
    e.preventDefault()

    var isbn = this.state.isbn
    var self = this

    if (isbn === '') {
      return false
    }

    // use this to test --> s1gVAAAAYAAJ or 0716604892 
    // API call to google books
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn, function(data) {

      var item = '' 
      var title = ''
      var author = ''
      var image = ''

      if (data.items && data.items[0]) {
        item = data.items[0]
      }
      
      if (item && item.volumeInfo && item.volumeInfo.title) {
        title = item.volumeInfo.title
      }

      if (item && item.volumeInfo && item.volumeInfo.authors[0]) {
        author = data.items[0].volumeInfo.authors[0]
      }

      if (item && 
          item.volumeInfo && 
          item.volumeInfo.imageLinks && 
          item.volumeInfo.imageLinks.thumbnail) {
        image = item.volumeInfo.imageLinks.thumbnail
      }

      console.log(data);


      self.setState({isbn: isbn})
      self.setState({bookName: title})
      self.setState({author: author})
      self.setState({image: image})
    });
  },

  render() {
    const {
      isbn,
      bookName,
      author,
      image
    } = this.state

  var addBook = {
    height: '50px',
    width: '30%',
    paddingTop: '15px',
    backgroundColor: '#fec14b',
    color: 'black',
    border: 'none',
    marginLeft: '-8%'
  };

  var viewBook = {
    height: '50px',
    width: '63%',
    textAlign: 'center',
    paddingTop: '15px',
    backgroundColor: '#fec14b',
    color: 'black',
    border: 'none'
  };

  var marginBottom = {
        marginBottom: '5%'
  };

  var imageMargin = {
      marginTop: '30%',
      marginLeft: '50%'
    };

    var divStyle = {
      color: 'red',
      background: 'yellow'
    };


    var cssStyles = styles.mts
    var buttonStyles = 'btn btn-primary'

    console.log(styles.mtl);

    return (
      <div className="row" style={marginBottom}>
        <div className="col-sm-6">
          <h4>Book Information</h4>

          <div className="form-group row">
            <div className="col-sm-9">
              <label className="form-control-label">ISBN:</label>

              <input
                className="form-control"
                type="text"
                value={isbn}      
                onChange={(e) => {
                  this.setState({ isbn: e.target.value })
                }}
                onBlur={this.handleISBNForm}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-9">
              <label className="form-control-label">Book Name:</label>
              <input
                className="form-control"
                type="text"
                value={bookName}      
                onChange={(e) => {
                  this.setState({ bookName: e.target.value })
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-9">
              <label className="form-control-label">Author:</label>
              <input
                className="form-control"
                type="text"
                value={author}      
                onChange={(e) => {
                  this.setState({ author: e.target.value })
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="btn btn-primary" 
                  onClick={this.addBook}
                  style={viewBook} 
                  >VIEW BOOK</div>
          </div>
           
            <div class="col-sm-6">
              <div className="btn btn-primary" 
                  onClick={this.addBook}
                  style={addBook} 
                  >ADD BOOK</div>
            </div>
          </div>

          </div>

          <div className="col-sm-2"> 
            <img src={image} style={imageMargin} />
          </div>
      </div>


    )
  }
})

export default IsbnForm