import { Image } from "./image";
import Iframe from 'react-iframe'
export const Gallery = (props) => {
  return (
    // <div id='portfolio' className='text-center'>
    //   <div className='container'>
    //     <div className='section-title'>
    //      



    //     </div>
    <div id='portfolio' className='text-center'>
      <h2>Highlight</h2>
      {/* <div className='portfolio-items'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
             
          </div> */}
     
        <Iframe
          url="https://www.youtube.com/embed/XUDLRw6MP28"
          width="65%"
          height="90%"
          display="initial"
          position="relative"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
     
      {/* </div>
      </div> */}
    </div>
  )
}
