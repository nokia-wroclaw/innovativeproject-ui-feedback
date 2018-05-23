import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ZoomInIcon from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


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
};

const url = "http://localhost:3000/screenshots";
const commentsUrl = "http://localhost:3000/comments";
const path = "http://localhost:3000/download";


export class ListExample extends Component {
    constructor() {
        super();
        this.state = {
            screenshots: [],
            ImageDialog: {
                open: false,
                src: null,
                comments: []
            }
        };
    }


    fetchComments(screenshotId) {
        return fetch(`${commentsUrl}/${screenshotId}`)
            .then((res) => {
                return res.json()
            });
    }

    generate() {
        return fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data.map((img) => ({
                    path: path + '/' + img.title + '.png',
                    id : img.id
                }));
            });
    }

    componentDidMount() {
        this.generate().then(screenshots => this.setState(() => ({screenshots})));
    }

    showImage(screenshot) {
        this.fetchComments(screenshot.id).then(comments => this.setState({
            ImageDialog: {
                open: true,
                src: screenshot.path,
                comments
            }
        }));


    }

    handleClose = () => {
        this.setState({
            ImageDialog: {
                open: false,
                src: null
            }
        });
    };

    render() {
        return (
            <div>
                <div style={styles.root}>
                    <GridList
                        cellHeight={180}
                        cols={5}
                        style={styles.gridList}
                    >
                        <Subheader>Obrazki</Subheader>
                        {this.state.screenshots.map((tile) => (
                            <GridTile
                                key={tile.id}
                                title='website'
                                subtitle={<span>by <b>some user</b></span>}
                                actionIcon={<IconButton><ZoomInIcon onClick={() => this.showImage(tile)} color="white"/></IconButton>}>
                                <img src={tile.path}/>
                            </GridTile>
                        ))}
                    </GridList>
                </div>
                <Dialog
                    open={this.state.ImageDialog.open}
                    modal={false}
                    onRequestClose={this.handleClose}>
                    <img src={this.state.ImageDialog.src}/>
                    {console.log(this.state.ImageDialog.comments)}

                </Dialog>
            </div>

        );
    }
}

