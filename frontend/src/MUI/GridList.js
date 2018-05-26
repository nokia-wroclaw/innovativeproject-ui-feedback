import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ZoomInIcon from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import MapsPlace from 'material-ui/svg-icons/maps/place'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {blue500} from 'material-ui/styles/colors';



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
    }
};

const screenshotUrl = "http://localhost:3000/screenshots";
const commentsUrl = "http://localhost:3000/comments";
const downloadUrl = "http://localhost:3000/download";
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
                description: null,
                x: null,
                y: null
            }
        };
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
        return fetch(`${commentsUrl}/${screenshotId}`)
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


    showImage(screenshot) {
        this.fetchComments(screenshot.id).then(comments => this.setState({
            ImageDialog: {
                open: true,
                src: screenshot.path,
                comments: comments
            },
        }));
    }

    handleCloseImage = () => {
        this.setState({
            ImageDialog: {
                open: false,
                src: null,
                comments: []
            }
        });
    };


    showFeedback(feedback) {
        this.setState({
            FeedbackDialog: {
                open: true,
                id: feedback.id,
                description: feedback.description,
                x: feedback.x,
                y: feedback.y
            }
        });
    }

    handleCloseFeedback = () => {
        this.setState({
            FeedbackDialog: {
                open: false,
                id: null,
                description: null,
                x: null,
                y: null
            }
        });
    };

    componentDidMount() {
        this.fetchScreenshots().then(screenshots => this.setState(() => ({screenshots})));
    }

    render() {
        const feedbackActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseFeedback}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleCloseFeedback}
            />,
        ];

        return <div>
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    cols={5}
                    style={styles.gridList}>

                    <Subheader>Screenshots</Subheader>
                    {this.state.screenshots.map((tile) => (
                        <GridTile
                            key={tile.id}
                            title='website'
                            subtitle={<span>by <b>some user</b></span>}
                            actionIcon={<IconButton><ZoomInIcon color="white" onClick={() =>
                                this.showImage(tile)}
                            /></IconButton>}>
                    <img src={tile.path}/>
                        </GridTile>
                    ))}
                </GridList>
            </div>
            <Dialog
                open={this.state.ImageDialog.open}
                modal={false}
                onRequestClose={this.handleCloseImage}>

                <div>
                    <img src={this.state.ImageDialog.src}/>
                        {this.state.ImageDialog.comments.map((obj) => (
                            <div style={{
                                top: obj.y+'px',
                                left: obj.x-pinCorrection+'px',
                                width:'20px',
                                height:'20px',
                                position:'absolute',
                                }}>
                            <IconButton><MapsPlace color={blue500} onClick={() => {
                            this.showFeedback(obj)
                        }}/></IconButton>
                            </div>))}
                </div>
            </Dialog>
            <Dialog open={this.state.FeedbackDialog.open}
                    modal={false}
                    actions={feedbackActions}>
                Feedback:
                <br/>
                {this.state.FeedbackDialog.description}
                <br/>
                id:{this.state.FeedbackDialog.id}
                <br/>
                x:{this.state.FeedbackDialog.x}
                <br/>
                y:{this.state.FeedbackDialog.y}
                <br/>
                <TextField
                    hintText="Write response"
                    floatingLabelText="Response"
                />
                <br/>
            </Dialog>
        </div>;
    }
}






