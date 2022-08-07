import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Avatar, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import Options from './Options';
// import useFirestore from '../../firebase/useFirestore';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useState } from 'react';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const ImagesList = ({ documents }) => {
  // const { documents } = useFirestore('gallery');
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);



  return (
    <div>
      <ImageList variant="quilted" cols={4} rowHeight={200}>
        {documents.map((item, index) => (
          <ImageListItem
            key={item?.id}
            cols={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].cols
            }
            rows={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].rows
            }
            sx={{
              opacity: '.93',
              transition: 'opacity .3s linear',
              cursor: 'pointer',
              padding: '2px',
              '&:hover': { opacity: 1 },
            }}
          >
            <Options
              imageId={item?.id}
              uid={item?.id}
              imageURL={item?.meta_content_url}
            />

            <img
              {...srcset(
                item?.meta_content_url,
                200,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              )}
              // alt={item?.data?.uName || item?.data?.uEmail?.split('@')[0]}
              alt={item?.meta_content_url?.split('/')[3]}
              loading="lazy"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
      
            />
            <Typography
              variant="body2"
              component="span"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                color: 'blue',
                textShadow: '3px 3px yellow',
                background: 'rgba(1,0,0, .3)',
                fontSize: '25px',
                fontWeight: '1000',
                p: '10px',
                borderBottomRightRadius: 20,
              }}
            >
        
              {/* {moment(item?.data?.timestamp?.toDate()).fromNow()} */}
              RANK:  {index + 1}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                color: 'yellow',
                textShadow: '4px 4px 3px black',
                background: 'rgba(0,0,0, .3)',
                fontSize: '14px',
                fontWeight: '1000',
                p: '12px',
                borderTopLeftRadius: 20,
              }}

            >
              {/* Price: {Math.abs(documents[photoIndex]?.lastsale_price) + " ETH"} */}
              {/* Price: {Math.abs(item?.price)} $  */}
            </Typography>
            {/* <Tooltip
              title={item?.data?.uName || item?.data?.uEmail?.split('@')[0]}
              sx={{
                position: 'absolute',
                bottom: '3px',
                right: '3px',
              }}
            >
              <Avatar
                src={item?.data?.uPhoto}
                imgProps={{ 'aria-hidden': true }}
              />
            </Tooltip> */}
          </ImageListItem>
        ))}
      </ImageList>
      {isOpen && (
        <Lightbox
          reactModalStyle={{
            content: {
              position: 'fixed',
              margin: '150px 0% 45px 0%',
              backgroundColor: 'white',
            }
          }}
          mainSrc={documents[photoIndex]?.meta_content_url}
          nextSrc={
            documents[(photoIndex + 1) % documents.length]?.meta_content_url
          }
          prevSrc={
            documents[(photoIndex + documents.length - 1) % documents.length]
              ?.meta_content_url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % documents.length)
          }
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + documents.length - 1) % documents.length
            )
          }
          imageTitle={"Name: " + documents[photoIndex]?.meta_name + " - Lastsale Price: " + Math.abs(documents[photoIndex]?.lastsale_price) + " ETH"}
          imageCaption={documents[photoIndex]?.meta_description}

        />
      )}
    </div>
  );
}

const pattern = [
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  }
];

const documents = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    id: 8,
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  }


];

