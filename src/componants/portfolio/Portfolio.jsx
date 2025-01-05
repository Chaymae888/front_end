import React, { useState, useEffect } from 'react';
import Model from 'react-modal';
import './portfolio.css';
import Work1 from "../../assets/work-1.svg"

const Portfolio = () => {
  const [items, setItems] = useState([]); 
  const [visible, setVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedItems,setLoadedItems]=useState([]);

  

  useEffect(() => {
    fetch('http://portfolio-backend.com/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        
      })
      .then((data) => {setItems(data);
        setLoadedItems(data);
        setLoading(false);
        
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const  filterItem=(categoryItem)=>{
    
    const updatedItems=loadedItems.filter((curElem)=>{
      return curElem.category === categoryItem;
    });

    setItems(updatedItems);

      if (updatedItems.length > 0) {
          setSelectedItemIndex(0); // Select the first item
      } else {
          setSelectedItemIndex(null); // No items, reset the selected index
      }
  }
  

  const handleLike = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            numberLikes: item.isLiked
              ? (item.numberLikes || 0) - 1
              : (item.numberLikes || 0) + 1,
            isLiked: !item.isLiked,
          }
        : item
    );
  
    setItems(updatedItems);
  
    
    const updatedItem = updatedItems.find((item) => item.id === id);
  
    
    fetch(`http://portfolio-backend.com/projects/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numberLikes: updatedItem.numberLikes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Likes updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating likes:', error);
      });
  };
  

  const handleArrowClick = (direction) => {
    setSelectedItemIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = items.length - 1;
      if (newIndex >= items.length) newIndex = 0;
      return newIndex;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="work container section" id="portfolio">
      <h2 className="section_title">Projects</h2>

      <div className="work_filters">
        <span className="work_item" onClick={() => setItems(loadedItems)}>Everything</span>
        <span className="work_item" onClick={()=>filterItem("Creative")}>Web Application</span>
        <span className="work_item" onClick={()=>filterItem("Art")}>Desktop Application</span>
        <span className="work_item" onClick={()=>filterItem("Design")}>Mobile Application</span>
        <span className="work_item" onClick={()=>filterItem("Branding")}>For Fun</span>
      </div>

      <div className="work_container grid">
        {items.map((element, index) => {
          const { id, image, title, numberLikes, isLiked, lienGithub, description, category } = element;
          return (
            <div className="work_card" key={id}>
              <div className="work_thumbnail">
                <img src={Work1} alt={title} className="work_img" />
                <div className="work_mask">
                  <div className="like_container">
                    <p className="numberoflikes">{numberLikes ? numberLikes : 0}</p>
                    <a href="#\" className="work_button likes">
                      <i
                        className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart iconn heart`}
                        onClick={() => handleLike(id)}
                      ></i>
                    </a>
                  </div>
                  <a href="#\" className="work_button space">
                    <i
                      className="icon-size-fullscreen iconn"
                      onClick={() => {
                        setVisible(true);
                        setSelectedItemIndex(index);
                      }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <Model
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          },
          content: {
            width: '60%',
            height: '80%',
            position: 'relative',
            inset: 'auto',
          },
        }}
      >
        {selectedItemIndex !== null && (
          <div className={`item-container ${visible ? 'show' : ''}`}>
            <img
              src={Work1}
              alt={items[selectedItemIndex].title}
              className="item-image"
            />
            <div className="item-details-container">
              <h2 className="item-title">{items[selectedItemIndex].title}</h2>
              <p className="item-description">Description:</p>
              <p className="description">{items[selectedItemIndex].description}</p>
              <div className="category_container">
                <p className="item-category">Category:</p>
                <p className="category">{items[selectedItemIndex].category}</p>
              </div>
              <p className="item-liengithub">Lien lienGithub:</p>
              <p className="liengithub">{items[selectedItemIndex].lienGithub}</p>
              <div className="like_container_model">
                <p className="numberoflikes_model">
                  {items[selectedItemIndex].numberLikes ? items[selectedItemIndex].numberLikes : 0}
                </p>
                <a href="#\" className="like_model">
                  <i
                    className={`${items[selectedItemIndex].isLiked ? 'fa-solid' : 'fa-regular'} fa-heart iconn`}
                    onClick={() => handleLike(items[selectedItemIndex].id)}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        )}
      </Model>

      {visible && (
        <div className="modal-arrows">
          <button className="arrow-left" onClick={() => handleArrowClick(-1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="arrow-right" onClick={() => handleArrowClick(1)}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
