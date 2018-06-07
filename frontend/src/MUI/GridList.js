import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ZoomInIcon from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import MapsPlace from 'material-ui/svg-icons/maps/place'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {blue500, red500, purple900} from 'material-ui/styles/colors';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 1200,
        height: 450,
        overflowY: 'auto',
    },
    responseCards: {
        overflowY: 'auto',
        height: 400
    },
    imageDialog: {
        width : "100vw",
        maxWidth:"100%"
    },
    pinIconButton:{
        padding : 0,
        width : 20,
        height : 20
    }

};


const screenshotUrl = "http://localhost:3000/screenshots";
const commentUrl = "http://localhost:3000/comments";
const downloadUrl = "http://localhost:3000/download";
const responseUrl = "http://localhost:3000/responses";
const pinCorrection = 10;


export class ListExample extends Component {
    constructor() {
        super();
        this.state = {
            screenshots: [],
            ImageDialog: {
                open: false,
                src: null,
                comments: []
            },
            FeedbackDialog: {
                open: false,
                id: null,
                description: "",
                x: null,
                y: null,
                responses: []
            },
            ResponseText: {
                description: "",
                commentId: null
            }

        };
        this.saveResponse = this.saveResponse.bind(this);
    }


    fetchScreenshots() {
        return fetch(screenshotUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data.map((img) => ({
                    id: img.id,
                    path: downloadUrl + '/' + img.title + '.png'
                }));
            });
    }


    fetchComments(screenshotId) {
        return fetch(`${commentUrl}/${screenshotId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data.map((comment) => ({
                    id: comment.id,
                    x: comment.x,
                    y: comment.y,
                    description: comment.description,
                    screenshotId: comment.ScreenshotId

                }));
            });
    }


    fetchResponses(commentId) {
        return fetch(`${responseUrl}/${commentId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data.map((response) => ({
                    id: response.id,
                    description: response.description,
                    commentId: response.commentId

                }));
            });
    }


    saveResponse(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            FeedbackDialog: {
                ...prevState.FeedbackDialog,
                responses: [...prevState.FeedbackDialog.responses, prevState.ResponseText]
            }
        }));
        console.log(event.currentTarget);
        event.currentTarget.parentElement.scrollTo(0, window.clientHeight);
        fetch(responseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                description: this.state.ResponseText.description,
                commentId: this.state.ResponseText.commentId
            }),
        }).then(response => {
            console.log(response);
            return response.json()
        });
        this.setState({
            ResponseText: {
                description: ""
            }
        })
    }


    showScreenshot(screenshot) {
        this.fetchComments(screenshot.id).then(comments => this.setState({
            ImageDialog: {
                open: true,
                src: screenshot.path,
                comments: comments
            },
        }));
    }


    showComment(comment) {
        this.fetchResponses(comment.id).then(responses => this.setState({
            FeedbackDialog: {
                open: true,
                id: comment.id,
                description: comment.description,
                x: comment.x,
                y: comment.y,
                responses: responses
            }
        }));
    }


    handleCloseScreenshot = () => {
        this.setState({
            ImageDialog: {
                open: false,
                src: null,
                comments: []
            }
        });
    };


    handleCloseFeedback = () => {
        this.setState({
            FeedbackDialog: {
                open: false,
                id: null,
                description: null,
                x: null,
                y: null,
                responses: []
            }
        });
    };


    handleResponse(id, event) {
        this.setState({
            ResponseText: {
                description: event.target.value,
                commentId: id,
            }
        });
    }


    componentDidMount() {
        this.fetchScreenshots().then(screenshots => this.setState(() => ({screenshots})));
    }


    render() {

        return <div>
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    cols={5}
                    style={styles.gridList}>

                    <Subheader>Screenshots</Subheader>
                    {this.state.screenshots.map((obj) => (
                        <GridTile
                            key={obj.id}
                            title='website'
                            subtitle={<span>by <b>some user</b></span>}
                            actionIcon={<IconButton><ZoomInIcon color="white" onClick={() =>
                                this.showScreenshot(obj)}
                            /></IconButton>}>
                            <img src={obj.path}/>
                        </GridTile>
                    ))}
                </GridList>
            </div>
            <Dialog
                open={this.state.ImageDialog.open}
                modal={false}
                autoScrollBodyContent={true}
                onRequestClose={this.handleCloseScreenshot}
                contentStyle={styles.imageDialog}>
                <div style={{
                    position: 'relative'
                }}>
                    <img src={this.state.ImageDialog.src}/>
                    {this.state.ImageDialog.comments.map((obj) => (
                        <div style={{
                            top: obj.y - pinCorrection + 'px',
                            left: obj.x - 24 + 'px',
                            width: '20px',
                            height: '20px',
                            position: 'absolute',
                        }}>
                            <IconButton style={styles.pinIconButton}><MapsPlace  color={blue500} onClick={() => {
                                this.showComment(obj)
                            }}/></IconButton>
                        </div>))}
                </div>
            </Dialog>
            <Dialog open={this.state.FeedbackDialog.open}
                    modal={false}
                    ref={"FeedbackDialog"}
                    actions={
                        <FlatButton
                            label="Done"
                            primary={true}
                            onClick={this.handleCloseFeedback}
                        />
                    }>
                <Card>
                    <CardHeader
                        title="Feedback"
                    />
                    <CardText color={purple900}>
                        Comment: {this.state.FeedbackDialog.description}
                    </CardText>
                </Card>
                <TextField
                    hintText="Write response"
                    floatingLabelText="Response"
                    onChange={(e) => this.handleResponse(this.state.FeedbackDialog.id, e)}
                    value={this.state.ResponseText.description}
                />
                <br/>
                <div>
                    <RaisedButton onClick={this.saveResponse} label="Submit" primary={true}/>
                </div>
                <br/>
                <div style={styles.responseCards}>
                    {this.state.FeedbackDialog.responses.map((obj) => (
                        <Card>
                            <CardText color={blue500}>
                                {obj.description}
                            </CardText>
                        </Card>
                    ))}
                </div>
            </Dialog>
        </div>;
    }
}






