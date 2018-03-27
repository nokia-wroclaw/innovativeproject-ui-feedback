import React from 'react';
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

const tilesData = [
  {
    img: 'https://www.tabletowo.pl/wp-content/uploads/2018/01/Doge-Piese%C5%82.jpg',
    title: 'Pieseł',
    author: 'Andrzej',
  },
  {
    img: 'https://samequizy.pl/wp-content/uploads/2017/01/filing_images_1acae313e5ef.jpg',
    title: 'Pieseł #2',
    author: 'Aniela',
  },
  {
    img: 'https://i.ytimg.com/vi/GnrkCXk4BNs/hqdefault.jpg',
    title: 'Git',
    author: 'Jan',
  },
  {
    img: 'https://zdnet2.cbsistatic.com/hub/i/2017/05/24/6754c961-0679-4a70-84a9-9280da617d2f/ab9be362c48461dcd40c9218786e62d6/nokia-3310-main.jpg',
    title: 'Nokia',
    author: 'unnamed',
  }, 
  
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const ListExample = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>Obrazki</Subheader>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default ListExample;