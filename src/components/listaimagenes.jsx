import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


  
   function Listaimagenes() {

    // Funcion para gestionar el collage de imagenes
    function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
      }

      // Vector con las imagenes del collage
      const itemData = [
        {
          img: 'https://lirp.cdn-website.com/c710b317/dms3rep/multi/opt/logo-seguridad-superior-1920w.png',
          title: 'Breakfast',
          rows: 2,
          cols: 2,
        },
        {
          img: 'https://www.chaussuresdesalpes.fr/images/com_hikashop/upload/cityguard.jpg',
          title: 'Burger',
        },
        {
          img: 'https://r3d.mx/wp-content/uploads/Israel_Police_Pegasus-28012022-1080x675.jpg',
          title: 'Camera',
        },
        {
          img: 'https://seeklogo.com/images/A/Ayuda_en_accion-logo-E79F23A8EE-seeklogo.com.png',
          title: 'Coffee',
          cols: 2,
        },
        {
          img: 'https://previews.123rf.com/images/fffranz/fffranz1501/fffranz150100083/35940880-s%C3%ADmbolo-abstracto-para-un-grupo-de-vigilancia-vecinal.jpg',
          title: 'Hats',
          cols: 2,
        },
        {
          img: 'https://www.shutterstock.com/image-illustration/3d-illustration-fire-safety-officer-260nw-1749549314.jpg',
          title: 'Honey',
          author: '@arwinneil',
          rows: 2,
          cols: 2,
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU3_8CLD4LaylEFH6tGVCxEDTtYB9AvXEYDA&usqp=CAU',
          title: 'Basketball',
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bS9qCHrRZYyOFjJfnXnF8BxrN_4h5JgY2Q&usqp=CAU',
          title: 'Fern',
        },
        
      ];

    return (
      <ImageList
        sx={{ width: 900, height: 400 }}
        variant="quilted"
        cols={4}
        rowHeight={95}
      >
        {/* Se muestra cada una de la imagenes gestionadas con el srcset */}
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

export default Listaimagenes;