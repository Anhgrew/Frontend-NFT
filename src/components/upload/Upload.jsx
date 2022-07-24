import {
  // Avatar,
  Box,
  Button,
  // DialogActions,
  // DialogContent,
  // DialogContentText,
  // IconButton,
  // TextField,
} from '@mui/material';
import Effects from "uploadcare-widget-tab-effects";
import { Widget } from "@uploadcare/react-widget";
import { useState } from 'react';

// import { useAuth } from '../../context/AuthContext';
// import { Image } from 'mui-image'
// import SubmitButton from './SubmitButton';
// import { v4 as uuidv4 } from 'uuid';
// import uploadFile from '../../firebase/uploadFile';
// import { updateProfile } from 'firebase/auth';
// import deleteFile from '../../firebase/deleteFile';
// import updateUserRecords from '../../firebase/updateUserRecords';
// import CropEasy from '../crop/CropEasy';
// import { Crop } from '@mui/icons-material';
import { useEffect } from 'react';
import axios from "axios";
import { ImagesList } from '../imagesList/ImagesList';
import Spinner from '../loader/Spinner';
function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: "image/jpg" })
}
const Upload = () => {
  // const { currentUser, setLoading, setAlert, modal, setModal } = useAuth();
  // const [name, setName] = useState(currentUser?.displayName);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  // const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);
  const [openCrop, setOpenCrop] = useState(false);
  const [recieveResponse, setRecieveResponse] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const uploadImage = async file => {
    try {
      console.log("Upload Image", file);
      const formData = new FormData();
      formData.append("data", file);

      const config = {
        headers: {

          "accept": "application/json",
          "content-type": "multipart/form-data"
        }
      };
      const api = process.env.REACT_APP_API
      const host = process.env.REACT_APP_HOST
      const url = `${host}/${api}`



      await axios.post(url, formData, config, { timeout: 1500000 }).then(result => {
        console.log("Result: ", result.data.result);
        setLoading(false)
        setData(result.data.result)
      })

      setRecieveResponse(true)
    } catch (error) {
      setLoading(false)
      setData(null)
      alert("Server maintenance !!!")
      console.error(error);
    }
  };

  const reset = () => {
    window.location.href = "/";
  }

  const handleChange = async (file, fileUrlCdn) => {
    // file = file.sourceInfo.file
    if (file === undefined) {
      fetch(fileUrlCdn)
        .then(response => response.blob())
        .then(async imageBlob => {
          file = blobToFile(imageBlob, fileUrlCdn + "uploaded.jpg");
          console.log("File Image: " + file)
          setFile(file);
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
          await uploadImage(file);
        });


    }


    else {
      console.log("File XXX: " + file)
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
      await uploadImage(file);
    }

  };

  // // const handleSubmit = async (e) => {
  // //   e.preventDefault();
  //   // setLoading(true);

  //   // let userObj = { displayName: name };
  //   // let imagesObj = { uName: name };
  //   try {
  //     if (file) {
  //       const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  //       console.log(imageName)
  //       // const url = await uploadFile(
  //       //   file,
  //       //   `profile/${currentUser?.uid}/${imageName}`
  //       // );

  //       // if (currentUser?.photoURL) {
  //       //   const prevImage = currentUser?.photoURL     ?.split(`${currentUser?.uid}%2F`)[1]
  //       //     .split('?')[0];
  //       //   if (prevImage) {
  //       //     try {
  //       //       await deleteFile(`profile/${currentUser?.uid}/${prevImage}`);
  //       //     } catch (error) {
  //       //       console.log(error);
  //       //     }
  //       //   }
  //       // }

  //       // userObj = { ...userObj, photoURL: url };
  //       // imagesObj = { ...imagesObj, uPhoto: url };
  //     }

  //     // await updateProfile(currentUser, userObj);
  //     // await updateUserRecords('gallery', currentUser?.uid, imagesObj);

  //     // setAlert({
  //     //   isAlert: true,
  //     //   severity: 'success',
  //     //   message: 'Your profile has been updated',
  //     //   timeout: 3000,
  //     //   location: 'modal',
  //     // });
  //   } catch (error) {
  //     // setAlert({
  //     //   isAlert: true,
  //     //   severity: 'error',
  //     //   message: error.message,
  //     //   timeout: 5000,
  //     //   location: 'modal',
  //     // });
  //     console.log(error);
  //   }

  //   // setLoading(false);
  // };

  useEffect(() => {
    if (openCrop) {
      // setModal({ ...modal, title: 'Crop Upload Photo' });
    } else {
      // setModal({ ...modal, title: 'Update Upload' });
    }
  }, [openCrop]);

  return (
    <div>

      {loading ? (<Spinner />) : (
        !recieveResponse ? (< Widget publicKey="demopublickey"
          id='file'
          sx={{
            cursor: 'pointer',
            fullWidth: 'true',
            padding: '200px',
            '&:hover': { opacity: 1 }
          }
          }
          name='file'
          imagesOnly="true"
          previewStep="true"
          tabs="all"
          effects="crop, flip, enhance, rotate, blur, grayscale, mirror, sharp, invert"
          crop="1:1,free,2:3,3:4,4:3"
          customTabs={{ preview: Effects }}
          onFileSelect={(file) => {
            console.log('File changed: ', file)


            if (!file) {
              console.log("File removed from widget");
              return;
            }
            file.progress(info => {
              console.log('File progress: ', info.progress)
              setLoading(true)
            })


            file.done((fileInfo) => {
              console.log("File uploaded: ", fileInfo);
              setFile(fileInfo.cdnUrl);
              handleChange(fileInfo.sourceInfo.file, fileInfo.cdnUrl)
            });
          }}
        //   onChange={handleChange}
        />) :
          (<Box>
            <Box sx={{
              cursor: 'pointer',
              margin: '2px',
              '&:hover': { opacity: 1 }
            }}>
              <ImagesList documents={data} />
            </Box>
            <Box sx={{
              margin: '32px 0px',
              padding: '4px'
            }}>
              <Button variant="outlined" color="warning" size="large" fullWidth="true" onClick={reset}> <h5>Retry</h5></Button>
            </Box>
          </Box>
          )
      )}
    </div>)
};

export default Upload;
