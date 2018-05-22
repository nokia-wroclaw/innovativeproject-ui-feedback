import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ZoomInIcon from 'material-ui/svg-icons/action/zoom-in';
import Dialog from '@material-ui/core/Dialog';
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
const path = "http://localhost:3000/download";


export class ListExample extends Component {
    constructor() {
        super();
        this.state = {
            paths: [],
            ImageDialog: {
                open: true,
                src: null
            }
        };
    }



    generate() {
        return fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data.map((img) => path + '/' + img.title + '.png');
            });
    }

    componentDidMount() {
        this.generate().then(paths => this.setState(() => ({'paths': paths})));
    }

    showImage(image_src) {
        this.setState({
            ImageDialog:{
                open: true,
                src: image_src
            }
        });
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
                        {this.state.paths.map((tile) => (
                            <GridTile
                                key={tile}
                                title='website'
                                subtitle={<span>by <b>some user</b></span>}
                                actionIcon={<IconButton><ZoomInIcon onClick={(e) => this.showImage(tile, e)} color="white"/></IconButton>}>
                                <img src={tile}/>
                            </GridTile>
                        ))}
                    </GridList>
                </div>
                <Dialog
                    open={this.state.ImageDialog.open}
                    onClose={this.handleClose}>
                    <DialogContent>
                        Some content
                    </DialogContent>

                </Dialog>
            </div>

        );
    }
}

