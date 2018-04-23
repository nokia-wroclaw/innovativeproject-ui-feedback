import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
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
            paths: []
        };
    }

    generate() {
        return fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data.map((img) =>
                    path + '/' + img.title + '.png'
                );
            });
    }

    componentDidMount() {
        this.generate().then(paths => this.setState(() => ({'paths': paths})));
    }

    render() {
        return (
            <div style={styles.root}>

                <GridList
                    cellHeight={180}
                    style={styles.gridList}
                >
                    <Subheader>Obrazki</Subheader>
                    {this.state.paths.map((tile) => (
                        <GridTile
                            actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                        >
                            <img src={tile}/>
                        </GridTile>
                    ))}
                </GridList>
            </div>

        );
    }
}

