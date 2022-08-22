import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./Modal2.css";
import ReactDom from "react-dom";
import { doc, collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase";

const Modal2 = ({ openModal, onClose, name, lastname }) => {
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(false);
  /**Create staff member and storing it to firebase */
  const createStaff = async () => {
    setLoading(true);
    const docRef = doc(db, "offices", `${id}`);
    const colRef = collection(docRef, "staff");

    await addDoc(colRef, {
      lastname,
      name,
      selectedAvatar,
    })
      .then(() => {
        console.log("CREATED");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error creating document", err);
        setLoading(false);
      });
  };

  //Fetching all the avatars from firebase
  const [avatars, setAvatars] = useState([]);
  const fetchAllAvatars = () => {
    let list = [];
    const listRef = ref(storage, "avatars");
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((downloadURL) => {
            list.push(downloadURL);
            setAvatars(list);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllAvatars();
  }, []);

  //Selecting the avatar here
  const [selectedAvatar, setSelectedAvatar] = useState();
  const handleClickAvatar = (avatar) => {
    setSelectedAvatar(() => {
      return avatar;
    });
  };
  //This show be at the end
  if (!openModal) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="inner-wrapper">
            <div className="heading-wrapper">
              <h3>New Staff Member</h3>
              <AiOutlineCloseCircle color="#0D4477" onClick={onClose} />
            </div>
            <div className="avatar-wrapper">
              <h3>Avatar</h3>
              <div className="avatars">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    onClick={() => handleClickAvatar(avatar)}
                    style={{
                      border: `${
                        avatar === selectedAvatar ? `4px solid #475569` : `none`
                      }`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="dots">
              <BsDot color="#489DDA" />
              <BsDot color="#489DDA" />
            </div>
            <div className="button-wrapper">
              <button className="button" onClick={createStaff}>
                {!loading ? "Add Staff Member" : "Loading.."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal2;
